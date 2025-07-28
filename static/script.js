async function sendMessage() {
            let inputField = document.getElementById("user-input");
            let chatBox = document.getElementById("chat-box");

            let userMessage = inputField.value.trim();
            if (userMessage === "") {
                return; // Don't send empty messages
            }

            // Add user message to chat box
            chatBox.innerHTML += `<div class="message-bubble user-message"><span class="message-sender">You:</span> ${userMessage}</div>`;
            inputField.value = ""; // Clear input field
            chatBox.scrollTop = chatBox.scrollHeight; // Scroll to bottom

            try {
                // Fetch AI response
                // Make sure your backend server is running and accessible at /chat
                let response = await fetch(`/chat?prompt=${encodeURIComponent(userMessage)}`, {
                    method: "POST"
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                let data = await response.json();
                chatBox.innerHTML += `<div class="message-bubble ai-message"><span class="message-sender">AI:</span> ${data.response}</div>`;
            } catch (error) {
                console.error("Error fetching AI response:", error);
                chatBox.innerHTML += `<div class="message-bubble ai-message"><span class="message-sender">AI:</span> Error: Failed to get a response. Please try again.</div>`;
            } finally {
                chatBox.scrollTop = chatBox.scrollHeight; // Scroll to bottom again after AI response
            }
        }

        // Allow sending message with Enter key
        document.getElementById("user-input").addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                sendMessage();
            }
        });