let todos;

const savedTodos = JSON.parse(localStorage.getItem('todos'));
if (Array.isArray(savedTodos)) {
  todos = savedTodos;
} 
else {
  todos = [{
    title: 'Submit Assignment',
    dueDate: '2024-06-05',
    dueTime: '09:30',
    id: 'id1'
  }, {
    title: 'Wash Clothes',
    dueDate: '2024-06-01',
    dueTime: '15:00',
    id: 'id2'
  }, {
    title: 'Make dinner',
    dueDate: '2024-05-30',
    dueTime: '20:00',
    id: 'id3'
  }];
}


const createTodo = (title, dueDate, dueTime) => {
  const id = "" + new Date().getTime();

  todos.push({
    title: title,
    dueDate: dueDate,
    dueTime: dueTime,
    id: id,
  });

  saveTodos();
};

const removeTodo = (idToDelete) => {
  todos = todos.filter((todo) => {
    if (todo.id === idToDelete) {
      return false;
    } else {
      return true;
    }
  });

  saveTodos();
};

const saveTodos = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const addTodo = () => {
  const textbox = document.getElementById("todo-title");
  const title = textbox.value;

  const datePicker = document.getElementById("date-picker");
  const dueDate = datePicker.value;

  const timePicker = document.getElementById("time-picker");
  const dueTime = timePicker.value;

  createTodo(title, dueDate, dueTime);
  render();
};

const deleteTodo = (event) => {
  const deleteButton = event.target;
  const idToDelete = deleteButton.id;

  removeTodo(idToDelete);
  render();
};

const render = () => {
  document.getElementById('todo-list').innerHTML = '';

  todos.forEach(todo => {
    const element = document.createElement('div');
    const innerElement = document.createElement('div')
    innerElement.innerText = todo.title + ' ' + todo.dueDate + ' ' + todo.dueTime;
    innerElement.classList.add('task-info')
    element.appendChild(innerElement);
    element.classList.add('list-container');

    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.classList.add('delete-btn')
    deleteButton.onclick = deleteTodo;
    deleteButton.id = todo.id;
    element.appendChild(deleteButton);

    const todoList = document.getElementById('todo-list');
    todoList.appendChild(element);
  });
}

render();