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

function addTodo() {
    var todoInput = document.getElementById("todo-input");
    var todoText = todoInput.value.trim();
  
    if (todoText !== "") {
      var todoList = document.getElementById("todo-list");
  
      var todoItem = document.createElement("div");
      todoItem.classList.add("todo-item");
  
      var checkbox = document.createElement("input");
      checkbox.type = "checkbox";
  
      var label = document.createElement("label");
      label.textContent = todoText;
  
      var removeButton = document.createElement("button");
      removeButton.textContent = "Remove";
      removeButton.onclick = function() {
        todoList.removeChild(todoItem);
      };
  
      todoItem.appendChild(checkbox);
      todoItem.appendChild(label);
      todoItem.appendChild(removeButton);
      todoList.appendChild(todoItem);
  
      todoInput.value = "";
    }
  }
  
  