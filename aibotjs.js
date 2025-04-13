let navbarDiv = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if(document.body.scrollTop > 40 || document.documentElement.scrollTop > 40){
        navbarDiv.classList.add('navbar-cng');
    } else {
        navbarDiv.classList.remove('navbar-cng');
    }
});


const navbarCollapseDiv = document.getElementById('navbar-collapse');
const navbarShowBtn = document.getElementById('navbar-show-btn');
const navbarCloseBtn = document.getElementById('navbar-close-btn');
// show navbar
navbarShowBtn.addEventListener('click', () => {
    navbarCollapseDiv.classList.add('navbar-collapse-rmw');
});

// hide side bar
navbarCloseBtn.addEventListener('click', () => {
    navbarCollapseDiv.classList.remove('navbar-collapse-rmw');
});

document.addEventListener('click', (e) => {
    if(e.target.id != "navbar-collapse" && e.target.id != "navbar-show-btn" && e.target.parentElement.id != "navbar-show-btn"){
        navbarCollapseDiv.classList.remove('navbar-collapse-rmw');
    }
});

// stop transition and animatino during window resizing
let resizeTimer;
window.addEventListener('resize', () => {
    document.body.classList.add("resize-animation-stopper");
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        document.body.classList.remove("resize-animation-stopper");
    }, 400);
});

document.addEventListener("DOMContentLoaded", function () {
  const conversationContainer = document.getElementById("conversation");
  const userInput = document.getElementById("user-input");

  // Function to ask the bot
  window.askBot = async function () {
    const userMessage = userInput.value.trim();
    if (userMessage === "") return;

    // Display user message in the conversation
    displayMessage("User", userMessage);

    try {
      // Make an API request to your server to interact with OpenAI API
      const response = await fetch(`/ask-bot?message=${encodeURIComponent(userMessage)}`);
      const responseData = await response.json();

      // Display bot's response in the conversation
      displayMessage("Bot", responseData.botResponse);
    } catch (error) {
      console.error("Error communicating with the server", error);
    }

    // Clear the input field
    userInput.value = "";
  };

  // Function to display a message in the conversation
  function displayMessage(sender, message) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message");
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    conversationContainer.appendChild(messageElement);

    // Scroll to the bottom of the conversation
    conversationContainer.scrollTop = conversationContainer.scrollHeight;
  }
});
