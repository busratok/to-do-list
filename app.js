const taskInput = document.getElementById("todo-input");
const addBtn = document.getElementById("add");
const tasksUl = document.getElementById("tasks-ul");

const audio = new Audio("./assets/audios/chalk.mp3");

let tasksList = JSON.parse(localStorage.getItem("tasksList")) || [];

window.addEventListener("load", () => {
  tasksList.forEach((task) => {
    createTask(task);
  });
});

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (taskInput.value.trim() === "") {
    alert("Please enter a new task");
    return;
  }
  const newTask = {
    id: new Date().getTime(),
    text: taskInput.value,
    status: false,
  };
  createTask(newTask);
  audio.play();
  //   const pause = setTimeout(() => {
  //     audio.pause();
  //   }, 3000);
  //   pause();
  tasksList.push(newTask);
  localStorage.setItem("tasksList", JSON.stringify(tasksList));
  e.target.closest("form").reset();
});

const createTask = (newTask) => {
  const { id, text, status } = newTask;

  const li = document.createElement("li");
  li.setAttribute("id", id);

  const checkBtn = document.createElement("button");
  checkBtn.innerText = "✓";
  checkBtn.setAttribute("class", "check");
  li.append(checkBtn);

  const p = document.createElement("p");
  p.innerText = text;
  li.append(p);

  const removeIcon = document.createElement("i");
  removeIcon.setAttribute("class", "fas fa-trash");
  li.append(removeIcon);

  tasksUl.prepend(li);

  status ? li.classList.add("checked") : "";
};

tasksUl.addEventListener("click", (e) => {
  const idAttr = e.target.closest("li").getAttribute("id");
  if (e.target.classList.contains("check")) {
    e.target.parentElement.classList.toggle("checked");
    tasksList.forEach((task) => {
      if (task.id == idAttr) {
        task.status = !task.status;
      }
      localStorage.setItem("tasksList", JSON.stringify(tasksList));
    });
  } else if (e.target.classList.contains("fa-trash")) {
    e.target.parentElement.remove();
    tasksList = tasksList.filter((x) => x.id != idAttr);
    localStorage.setItem("tasksList", JSON.stringify(tasksList));
  }
});
