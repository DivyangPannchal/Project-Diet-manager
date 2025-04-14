document.addEventListener("DOMContentLoaded", function () {
  const conversationContainer = document.getElementById("conversation");
  const userInput = document.getElementById("user-input");

  window.askBot = async function () {
    const userMessage = userInput.value.trim();
    if (userMessage === "") return;

    displayMessage("You", userMessage);

    try {
      const response = await fetch(`ask-bot.php?message=${encodeURIComponent(userMessage)}`);
      const responseData = await response.json();

      displayMessage("Gemini", responseData.botResponse);
    } catch (error) {
      displayMessage("Gemini", "Sorry, something went wrong.");
      console.error("Error:", error);
    }

    userInput.value = "";
  };

  function displayMessage(sender, message) {
    const msg = document.createElement("div");
    msg.classList.add("message");
    msg.innerHTML = `<strong>${sender}:</strong> ${message}`;
    conversationContainer.appendChild(msg);
    conversationContainer.scrollTop = conversationContainer.scrollHeight;
  }
});
