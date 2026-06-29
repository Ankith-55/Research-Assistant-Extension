package com.research.researchAssistant;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class ResearchService {

    private static final Logger log = LoggerFactory.getLogger(ResearchService.class);

    @Value("${gemini.api.url}")
    private String geminiApiUrl;

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    @Value("${gemini.agent.name:antigravity-preview-05-2026}")
    private String agentName;

    private final WebClient webClient;

    public ResearchService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.build();
    }

    public Mono<String> processContent(ResearchRequest request) {
        String prompt = buildPrompt(request);

        Map<String, Object> requestBody = Map.of(
                "agent", agentName,
                "input", new Object[] {
                        Map.of("type", "text", "text", prompt)
                },
                "environment", Map.of("type", "remote")
        );

        String url = geminiApiUrl + geminiApiKey;

        return webClient.post()
                .uri(url)
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .doOnNext(raw -> log.info("RAW RESPONSE: {}", raw))   // <-- LOG THE FULL RESPONSE
                .map(this::extractTextFromResponse);
    }


    private String extractTextFromResponse(String json) {
        // The Gemini agent always puts the final answer in the LAST "text" field of the whole JSON.
        // We simply grab that value. No need to search for model_output.
        Pattern textPattern = Pattern.compile("\"text\"\\s*:\\s*\"((?:[^\"\\\\]|\\\\.)*)\"");
        Matcher matcher = textPattern.matcher(json);
        String lastText = null;
        while (matcher.find()) {
            lastText = matcher.group(1);
        }

        if (lastText != null) {
            return unescapeJson(lastText);
        }

        return "No text field found";
    }

    private String unescapeJson(String s) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (c == '\\' && i + 1 < s.length()) {
                char next = s.charAt(i + 1);
                switch (next) {
                    case 'n':  sb.append('\n'); i++; break;
                    case 't':  sb.append('\t'); i++; break;
                    case 'r':  sb.append('\r'); i++; break;
                    case '"':  sb.append('"');  i++; break;
                    case '\\': sb.append('\\'); i++; break;
                    default:   sb.append(c);
                }
            } else {
                sb.append(c);
            }
        }
        return sb.toString();
    }

    private String buildPrompt(ResearchRequest request) {
        StringBuilder prompt = new StringBuilder();
        switch (request.getOperation()) {
            case "summarize":
                prompt.append("Provide a clear and concise summary of the following text in a few sentences:\n\n");
                break;
            case "suggest":
                prompt.append("Based on the following content, suggest related topics and further reading. " +
                        "Present the result as a simple bullet‑point list with clear headings. " +
                        "Use only plain text (no markdown formatting).\n\n");
                break;

                //V2
            case "quiz":
                prompt.append("Based on the following content, generate exactly 5 multiple‑choice questions. " +
                        "Output ONLY a valid JSON array of objects. Each object must have:\n" +
                        "- \"question\": (string) the question text\n" +
                        "- \"options\": (array of 4 strings) the answer choices\n" +
                        "- \"correctIndex\": (integer 0-3) the index of the correct option\n\n" +
                        "Do not include any other text, explanations, or markdown. Output raw JSON only.\n\n");
                break;
            default:
                throw new IllegalArgumentException("Unknown Operation: " + request.getOperation());
        }
        prompt.append(request.getContent());
        return prompt.toString();
    }
}


