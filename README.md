````markdown
# 🔬 Research Assistant – AI-Powered Chrome Extension

**Research Assistant** is a Chrome extension that brings the power of **Google Gemini** directly into your browser. Simply select any text on a webpage and, with a single click, generate a **summary**, **detailed notes**, or an **interactive quiz**.

The extension communicates with a **Spring Boot** backend, which processes prompts using the **Google Gemini Agent API** and returns AI-generated results in real time.

---

## 🚀 Features

- 📄 **Summarize**
  - Convert long paragraphs into concise, easy-to-read summaries.

- 📝 **Generate Notes**
  - Extract key concepts, important points, and suggestions for further reading.

- ❓ **Quiz Generator**
  - Generate 5 multiple-choice questions based on the selected content.
  - Answer questions directly within the extension.
  - View your score instantly after submission.

- ✏️ **Editable Input**
  - Modify the selected text before sending it to the AI.

- 📋 **Copy to Clipboard**
  - Copy summaries and notes with a single click.

- 🎨 **Modern Popup UI**
  - Clean, responsive, and user-friendly interface.

---

# 🧱 Tech Stack

| Layer | Technology |
|--------|------------|
| **Backend** | Java 17+, Spring Boot, Spring WebFlux (WebClient), Maven |
| **AI API** | Google Gemini Agent (`antigravity-preview`) |
| **Frontend** | React 18, Vite |
| **Chrome Extension** | Manifest V3, Chrome APIs (`activeTab`, `scripting`, `storage`) |

---

# 📂 Project Structure

```text
Research-Assistant/
│
├── backend/                 # Spring Boot backend
│   ├── src/
│   ├── pom.xml
│   └── ...
│
├── extension/               # React + Vite Chrome extension
│   ├── src/
│   ├── public/
│   └── ...
│
└── README.md
```

---

# ⚙️ Setup & Installation

## Prerequisites

Make sure the following are installed:

- Java 17 or later
- Maven (or Maven Wrapper)
- Node.js v16+ and npm
- Google Gemini API Key
- Google Chrome

---

## 1️⃣ Configure the Backend

Navigate to the backend directory.

```bash
cd backend
```

Create (or update):

```text
src/main/resources/application.properties
```

Add the following configuration:

```properties
gemini.api.url=https://your-gemini-endpoint/v1/agents/
gemini.api.key=YOUR_API_KEY
gemini.agent.name=antigravity-preview-05-2026

server.port=8080
```

---

## 2️⃣ Run the Backend

Using the Maven Wrapper:

```bash
./mvnw spring-boot:run
```

Or using Maven:

```bash
mvn spring-boot:run
```

The backend will start at:

```text
http://localhost:8080
```

---

## 3️⃣ Build the Chrome Extension

Navigate to the extension folder:

```bash
cd extension
```

Install dependencies:

```bash
npm install
```

Build the extension:

```bash
npm run build
```

A production-ready `dist/` folder will be generated.

---

## 4️⃣ Load the Extension in Chrome

1. Open:

   ```text
   chrome://extensions/
   ```

2. Enable **Developer Mode**.

3. Click **Load unpacked**.

4. Select the:

   ```text
   extension/dist
   ```

   folder.

5. The **Research Assistant** icon will appear in the Chrome toolbar.

---

# 🔧 Usage

1. Open any webpage.

2. Select the text you want to process.

3. Click the **Research Assistant** extension icon.

4. The selected text will automatically appear inside the popup.

5. (Optional) Edit the text if required.

6. Choose one of the available operations:

   - 📄 Summarize
   - 📝 Generate Notes
   - ❓ Quiz

7. Click **Process**.

8. View the generated result.

### Summary & Notes

- AI-generated content is displayed instantly.
- Use the **Copy** button to copy the output.

### Quiz

- Five multiple-choice questions are generated.
- Select your answers.
- Click **Submit**.
- Your score is displayed immediately.

---

# 📝 API Reference

## Endpoint

```http
POST /api/research/process
```

---

## Request Body

```json
{
  "content": "The text to process...",
  "operation": "summarize | suggest | quiz"
}
```

---

## Response

Depending on the requested operation:

- **Summarize** → Plain text
- **Generate Notes** → Plain text
- **Quiz** → JSON string containing questions, options, and answers

---

# 🤝 Contributing

Contributions are welcome!

If you'd like to improve this project:

1. Fork the repository.
2. Create a new feature branch.
3. Commit your changes.
4. Push the branch.
5. Open a Pull Request.

Bug reports, feature requests, and suggestions are always appreciated.

---

# 📄 License

This project is intended for educational and learning purposes.

Feel free to modify and extend it for your own use.
````
