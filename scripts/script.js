// alert("hello!");

let todos = [];

const saveTodosToLocalStorage = () => {
  window.localStorage.setItem('todos', JSON.stringify(todos))
};

const fetchTodosFromLocalStorage = () => {
  let todosJSON = window.localStorage.getItem('todos')

  if (todosJSON) {
    todos = JSON.parse(todosJSON)
  } else {
    todos = []
  }
}

const createTodo = (text) => {
  todos.push({
    title: text,
    completed: false,
  });
  saveTodosToLocalStorage()
};
console.log("hi I'am here");


const generateTodoDOM = (todoObj) => {
  const todoEl = document.createElement("label");
  const containerEl = document.createElement("div");
  const todoText = document.createElement("span");
  const removeButton = document.createElement("button");

  const checkbox = document.createElement("input");
  checkbox.setAttribute('type', 'checkbox');
  checkbox.checked = todoObj.completed;
  containerEl.appendChild(checkbox);
  checkbox.addEventListener("change", () => {
    toggleTodo(todoObj.title)
    renderTodos(todos)
  })


  removeButton.classList.add("button--text", "button");
  todoText.textContent = todoObj.title;
  containerEl.appendChild(todoText)

  todoEl.classList.add('list-item')
  containerEl.classList.add('list-item__container')
  todoEl.appendChild(containerEl)



  removeButton.textContent = "remove";




  containerEl.appendChild(todoText);

  todoEl.classList.add("list-item");
  containerEl.classList.add("list-item__container");
  todoEl.appendChild(containerEl);

  todoEl.appendChild(removeButton);





  removeButton.addEventListener('click', () => {
    removeTodo(todoObj.title)
    renderTodos(todos)
  })
  return todoEl
}


const toggleTodo = (title) => {
  const todo = todos.find((todo) => todo.title.toLowerCase() === title.toLowerCase());
  if (todo) {
    todo.completed = !todo.completed
    saveTodosToLocalStorage();
  }
}

const filters = {
  searchTitle: "",
  showFinished: false,
  showUnfinished: false,
};

const renderTodos = (todos) => {

  let filteredTodos = todos.filter((todo) => {
    return todo.title.includes(filters.searchTitle)

  });

  if (filters.showFinished && filters.showUnfinished) {

  } else if (filters.showFinished) {
    filteredTodos = filteredTodos.filter((todo) => todo.completed);

  } else if (filters.showUnfinished) {
    filteredTodos = filteredTodos.filter((todo) => !todo.completed);
  }

  const todoList = document.querySelector("#todos");
  todoList.innerHTML = "";
  if (filteredTodos.length > 0) {
    filteredTodos.forEach((todo) => {
      const newTodo = generateTodoDOM(todo);
      todoList.appendChild(newTodo);
    });
  } else {
    const messageEl = document.createElement("p");
    messageEl.classList.add("empty-message");
    messageEl.textContent = "There are no todos to show";
    todoList.appendChild(messageEl);
  }
};


const removeTodo = title => {
  const todoIndex = todos.findIndex((todo) => {
    return todo.title.toLowerCase() === title.toLowerCase();
  });
  if (todoIndex > -1) {
    todos.splice(todoIndex, 1);
    saveTodosToLocalStorage();
  }
};


document.querySelector("#new-todo").addEventListener("submit", (e) => {
  e.preventDefault();
  const text = e.target.elements.text.value.trim();
  console.log(e);
  if (text.length > 0) {
    createTodo(text);
    e.target.elements.text.value = "";
  }
  renderTodos(todos);
});
fetchTodosFromLocalStorage();
renderTodos(todos);

// eje 14 ---------------------------------



// eje 15 ----------------------------------

const setFilters = (updates) => {
  if (typeof updates.searchTitle === "string") {
    filters.searchTitle = updates.searchTitle
  }
  if (typeof updates.showFinished === "boolean") {
    filters.showFinished = updates.showFinished
  }
  if (typeof updates.showUnfinished === "boolean") {
    filters.showUnfinished = updates.showUnfinished
  }
};

// eje 16 -----------------------------------

document.querySelector("#search-text").addEventListener("input", (e) => {
  setFilters({
    searchTitle: e.target.value
  })
  renderTodos(todos)
})
document.querySelector("#show-finished").addEventListener("change", (e) => {
  setFilters({
    showFinished: e.target.checked
  })
  renderTodos(todos)
})
document.querySelector("#show-unfinished").addEventListener("change", (e) => {
  setFilters({
    showUnfinished: e.target.checked
  })
  renderTodos(todos)
});

window.addEventListener("storage", (e) => {
  console.log(e)
  if (e.key === 'todos') {
    renderTodos(todos)
    fetchTodosFromLocalStorage()
  }
});

renderTodos(todos);
fetchTodosFromLocalStorage()

