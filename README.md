# **AI Chat Assistant**

This is a simple AI Chat Assistant built with a FastAPI backend to interact with an Ollama language model, and a clean HTML, CSS, and JavaScript frontend for the user interface.

## **Features**

* **Interactive Chat Interface:** A responsive and visually appealing chat window.  
* **User and AI Message Bubbles:** Clearly distinguishes between user input and AI responses.  
* **Ollama Integration:** Connects to a local Ollama server to leverage various large language models (LLMs).  
* **Real-time Scrolling:** Automatically scrolls to the latest message.  
* **Enter Key Support:** Send messages by pressing the Enter key.  
* **Basic Error Handling:** Provides feedback if the AI response cannot be fetched.  
* **Multi-line Text Support:** Properly renders multi-line AI responses with line breaks.

## **Prerequisites**

Before you begin, ensure you have the following installed on your system:

* **Python 3.7+**: For the FastAPI backend.  
* **pip**: Python package installer (usually comes with Python).  
* **Ollama**: A platform for running large language models locally. Download it from [ollama.com](https://ollama.com/).  
* **An Ollama Model**: After installing Ollama, you'll need to download a model. For this project, mistral or llama3 are recommended.

## **Project Structure**

Create the following directory and file structure:

.  
├── main.py             \# FastAPI backend code  
├── static/  
│   └── index.html      \# Frontend HTML, CSS, and JavaScript  
└── README.md           \# This documentation file (optional, but good practice)

## **Installation and Setup**

Follow these steps to get the AI Chat Assistant up and running:

### **1\. Backend Setup (FastAPI)**

1. **Create main.py**: In your project root directory, create a file named main.py and paste the following Python code into it:  
   from fastapi import FastAPI, HTTPException, Query  
   from fastapi.staticfiles import StaticFiles  
   from fastapi.responses import FileResponse  
   import requests  
   import os  
   import json

   app \= FastAPI()

   \# Serve frontend files  
   \# Ensure the 'static' directory exists in the same location as main.py  
   app.mount("/static", StaticFiles(directory="static"), name="static")

   \# Ollama settings  
   OLLAMA\_URL \= "http://localhost:11434/api/generate"  
   MODEL\_NAME \= "mistral"  \# Change to "llama3" or any other model you have pulled

   @app.get("/")  
   def serve\_homepage():  
       """ Serve the index.html file when accessing the root URL """  
       \# Ensure 'static/index.html' exists  
       return FileResponse(os.path.join("static", "index.html"))

   @app.post("/chat")  
   def chat(prompt: str \= Query(..., description="User prompt for AI model")):  
       headers \= {"Content-Type": "application/json"}

       try:  
           \# Send request to Ollama  
           response \= requests.post(  
               OLLAMA\_URL,  
               json={"model": MODEL\_NAME, "prompt": prompt, "stream": False},  
               headers=headers  
           )

           \# Log the response for debugging  
           print("Ollama Response:", response.text)

           \# Ensure valid JSON response  
           response\_data \= response.text.strip()  
           try:  
               json\_response \= json.loads(response\_data)  
           except json.JSONDecodeError:  
               raise HTTPException(status\_code=500, detail=f"Invalid JSON response from Ollama: {response\_data}")

           \# Extract AI-generated response  
           ai\_response \= json\_response.get("response")  
           if not ai\_response:  
               raise HTTPException(status\_code=500, detail="No valid response received from Ollama")

           return {"response": ai\_response}

       except requests.exceptions.RequestException as e:  
           raise HTTPException(status\_code=500, detail=f"Request to Ollama failed: {str(e)}")

   \# Run the API server  
   if \_\_name\_\_ \== "\_\_main\_\_":  
       import uvicorn  
       uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)

2. **Install Python Dependencies**: Open your terminal or command prompt, navigate to your project root directory (where main.py is located), and run:  
   pip install fastapi uvicorn requests

### **2\. Frontend Setup (HTML, CSS, JS)**

1. **Create static Directory**: In your project root directory, create a new folder named static.  
2. **Create index.html**: Inside the static directory, create a file named index.html and paste the following HTML code into it:  
   \<\!DOCTYPE html\>  
   \<html lang="en"\>  
   \<head\>  
       \<meta charset="UTF-8"\>  
       \<meta name="viewport" content="width=device-width, initial-scale=1.0"\>  
       \<title\>AI Chat Assistant\</title\>  
       \<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700\&display=swap" rel="stylesheet"\>  
       \<style\>  
           :root {  
               \--primary-color: \#4CAF50; /\* A friendly green \*/  
               \--secondary-color: \#f0f2f5; /\* Light grey for background \*/  
               \--text-color: \#333;  
               \--border-color: \#ddd;  
               \--input-bg: \#fff;  
               \--chat-bubble-user: \#DCF8C6; /\* Light green for user messages \*/  
               \--chat-bubble-ai: \#FFFFFF; /\* White for AI messages \*/  
               \--shadow-light: 0 2px 4px rgba(0,0,0,0.1);  
           }

           body {  
               font-family: 'Roboto', sans-serif;  
               text-align: center;  
               margin: 0;  
               background-color: var(--secondary-color);  
               display: flex;  
               justify-content: center;  
               align-items: center;  
               min-height: 100vh;  
               color: var(--text-color);  
               padding: 20px; /\* Add some padding for smaller screens \*/  
               box-sizing: border-box; /\* Include padding in element's total width and height \*/  
           }

           .chat-container {  
               background-color: var(--input-bg);  
               border-radius: 10px;  
               box-shadow: var(--shadow-light);  
               width: 90%;  
               max-width: 600px;  
               display: flex;  
               flex-direction: column;  
               overflow: hidden;  
               height: 80vh; /\* Make container fill more of the viewport height \*/  
               min-height: 450px; /\* Minimum height for usability \*/  
           }

           h1 {  
               background-color: var(--primary-color);  
               color: white;  
               padding: 15px 0;  
               margin: 0;  
               font-size: 1.6em;  
               border-top-left-radius: 10px;  
               border-top-right-radius: 10px;  
               box-shadow: var(--shadow-light); /\* Shadow for header \*/  
               z-index: 1; /\* Ensure header shadow is above chat box \*/  
           }

           \#chat-box {  
               flex-grow: 1;  
               padding: 15px; /\* Reduced padding slightly for more message space \*/  
               overflow-y: auto;  
               border-bottom: 1px solid var(--border-color);  
               display: flex;  
               flex-direction: column;  
               gap: 10px; /\* Space between message bubbles \*/  
           }

           .message-bubble {  
               max-width: 75%; /\* Slightly smaller bubbles \*/  
               padding: 10px 15px;  
               border-radius: 18px;  
               line-height: 1.5;  
               word-wrap: break-word;  
               box-shadow: 0 1px 2px rgba(0,0,0,0.08); /\* Subtle shadow for bubbles \*/  
               text-align: left; /\* Ensure text aligns left within bubbles \*/  
           }

           .user-message {  
               background-color: var(--chat-bubble-user);  
               align-self: flex-end; /\* Align user messages to the right \*/  
               border-bottom-right-radius: 2px; /\* A slight corner for user message \*/  
           }

           .ai-message {  
               background-color: var(--chat-bubble-ai);  
               border: 1px solid var(--border-color); /\* Add a light border for AI messages \*/  
               align-self: flex-start; /\* Align AI messages to the left \*/  
               border-bottom-left-radius: 2px; /\* A slight corner for AI message \*/  
           }

           .message-sender {  
               display: block;  
               font-size: 0.8em;  
               color: \#666;  
               margin-bottom: 2px;  
               font-weight: bold;  
           }

           .input-area {  
               display: flex;  
               padding: 15px 20px;  
               border-top: 1px solid var(--border-color);  
               background-color: \#f9f9f9;  
               border-bottom-left-radius: 10px;  
               border-bottom-right-radius: 10px;  
               gap: 10px; /\* Space between input and button \*/  
           }

           \#user-input {  
               flex-grow: 1;  
               padding: 12px 15px;  
               border: 1px solid var(--border-color);  
               border-radius: 25px;  
               outline: none;  
               font-size: 1em;  
               transition: border-color 0.3s ease, box-shadow 0.3s ease;  
           }

           \#user-input:focus {  
               border-color: var(--primary-color);  
               box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.2);  
           }

           button {  
               padding: 12px 20px;  
               background-color: var(--primary-color);  
               color: white;  
               border: none;  
               border-radius: 25px;  
               cursor: pointer;  
               font-size: 1em;  
               font-weight: bold;  
               transition: background-color 0.3s ease, transform 0.2s ease;  
               white-space: nowrap; /\* Prevent button text from wrapping \*/  
           }

           button:hover {  
               background-color: \#45a049;  
               transform: translateY(-1px);  
           }

           button:active {  
               transform: translateY(0);  
               background-color: \#398e3d;  
           }

           /\* Scrollbar styles for WebKit browsers \*/  
           \#chat-box::-webkit-scrollbar {  
               width: 8px;  
           }

           \#chat-box::-webkit-scrollbar-track {  
               background: var(--secondary-color);  
               border-radius: 10px;  
           }

           \#chat-box::-webkit-scrollbar-thumb {  
               background: var(--primary-color);  
               border-radius: 10px;  
           }

           \#chat-box::-webkit-scrollbar-thumb:hover {  
               background: \#45a049;  
           }

           /\* Media queries for responsiveness \*/  
           @media (max-width: 768px) {  
               body {  
                   padding: 10px;  
               }  
               .chat-container {  
                   width: 95%;  
                   height: 90vh; /\* Adjust height for mobile \*/  
                   margin: 0;  
               }

               h1 {  
                   font-size: 1.4em;  
               }

               .input-area {  
                   flex-direction: column;  
                   padding: 10px;  
               }

               \#user-input {  
                   margin-right: 0;  
                   margin-bottom: 10px;  
                   width: 100%; /\* Full width on mobile \*/  
               }

               button {  
                   width: 100%;  
               }

               .message-bubble {  
                   max-width: 85%; /\* Allow bubbles to be a bit wider on small screens \*/  
               }  
           }  
       \</style\>  
   \</head\>  
   \<body\>

       \<div class="chat-container"\>  
           \<h1\>AI Chat Assistant\</h1\>  
           \<div id="chat-box"\>\</div\>  
           \<div class="input-area"\>  
               \<input type="text" id="user-input" placeholder="Type a message..." /\>  
               \<button onclick="sendMessage()"\>Send\</button\>  
           \</div\>  
       \</div\>

       \<script\>  
           async function sendMessage() {  
               let inputField \= document.getElementById("user-input");  
               let chatBox \= document.getElementById("chat-box");

               let userMessage \= inputField.value.trim();  
               if (userMessage \=== "") {  
                   return; // Don't send empty messages  
               }

               // Add user message to chat box  
               // Using innerHTML directly for simplicity, but for complex apps, consider DOM manipulation for security/performance  
               chatBox.innerHTML \+= \`\<div class="message-bubble user-message"\>\<span class="message-sender"\>You:\</span\> ${userMessage}\</div\>\`;  
               inputField.value \= ""; // Clear input field  
               chatBox.scrollTop \= chatBox.scrollHeight; // Scroll to bottom

               try {  
                   // Fetch AI response  
                   // Make sure your backend server is running and accessible at /chat  
                   let response \= await fetch(\`/chat?prompt=${encodeURIComponent(userMessage)}\`, {  
                       method: "POST"  
                   });

                   if (\!response.ok) {  
                       throw new Error(\`HTTP error\! status: ${response.status}\`);  
                   }

                   let data \= await response.json();  
                   let aiResponseText \= data.response;

                   // IMPORTANT: Replace newline characters with \<br\> tags for proper HTML rendering  
                   // This makes multi-line AI responses appear "rapi"  
                   let formattedAiResponse \= aiResponseText.replace(/\\n/g, '\<br\>');

                   chatBox.innerHTML \+= \`\<div class="message-bubble ai-message"\>\<span class="message-sender"\>AI:\</span\> ${formattedAiResponse}\</div\>\`;  
               } catch (error) {  
                   console.error("Error fetching AI response:", error);  
                   chatBox.innerHTML \+= \`\<div class="message-bubble ai-message"\>\<span class="message-sender"\>AI:\</span\> Error: Failed to get a response. Please try again.\</div\>\`;  
               } finally {  
                   chatBox.scrollTop \= chatBox.scrollHeight; // Scroll to bottom again after AI response  
               }  
           }

           // Allow sending message with Enter key  
           document.getElementById("user-input").addEventListener("keypress", function(event) {  
               if (event.key \=== "Enter") {  
                   sendMessage();  
               }  
           });  
       \</script\>

   \</body\>  
   \</html\>

### **3\. Ollama Setup**

1. **Download and Install Ollama**: If you haven't already, download and install Ollama from [ollama.com](https://ollama.com/).  
2. **Pull a Model**: Open your terminal or command prompt and pull a model. For example, to pull mistral:  
   ollama pull mistral

   Or, to pull llama3:  
   ollama pull llama3

   Ensure the MODEL\_NAME in your main.py matches the model you have pulled.  
3. **Run Ollama Server**: Ollama usually runs in the background automatically after installation. You can verify its status or start it if needed (check Ollama documentation for specific commands for your OS if it's not running).

## **Usage**

1. **Start the FastAPI Backend**: Open your terminal or command prompt, navigate to your project root directory (where main.py is located), and run:  
   uvicorn main:app \--reload

   This will start the FastAPI server, typically accessible at http://127.0.0.1:8000. The \--reload flag will automatically restart the server when you make changes to main.py.  
2. **Access the Chat Assistant**: Open your web browser and go to http://127.0.0.1:8000.

You should now see the AI Chat Assistant interface. Type your messages into the input field and press Enter or click "Send" to interact with your local Ollama model\!

## **Customization**

* **AI Model**: You can change the MODEL\_NAME variable in main.py to use a different Ollama model (e.g., "llama3", "gemma") that you have pulled.  
* **Styling**: Modify the CSS variables in the \<style\> block of index.html to change the primary color, background, chat bubble colors, and more.  
* **Layout**: Adjust the CSS properties within index.html to fine-tune the layout and responsiveness.

## **Troubleshooting**

* **"Error: Failed to get a response."**:  
  * Ensure your Ollama server is running.  
  * Verify that the OLLAMA\_URL in main.py is correct (http://localhost:11434/api/generate is the default).  
  * Check if the MODEL\_NAME in main.py exactly matches a model you have pulled using ollama pull \<model\_name\>.  
  * Check your browser's developer console (F12) for more specific network errors.  
* **"Invalid JSON response from Ollama"**: This might happen if Ollama returns an unexpected format. Double-check your Ollama installation and ensure the model is fully downloaded.  
* **Frontend not loading**: Ensure index.html is correctly placed inside the static directory and that app.mount in main.py points to the correct directory.

Feel free to copy and paste this content into a README.md file in your project's root directory.