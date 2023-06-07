// Selection
const todosList = document.querySelector(".todos-list");
const todos = document.querySelectorAll(".todo");
const ipTodo = document.querySelector(".ip-todo");
const slTime = document.querySelector("#sl-time");
const slStatus = document.querySelector("#sl-status");
const slSubject = document.querySelector("#sl-subject");
const ipContainer = document.querySelector(".ip-container");
const btnAdd = document.querySelector(".btn-add");
const btnDelete = document.querySelector(".btn-delete");
const ipSearch = document.querySelector(".ip-search");
const btnSave = document.querySelector(".btn-save");
const btnClear = document.querySelector(".btn-clear");

// Declarations
let i = todosList.children.length;
let curTodo = {};
let preStatus = "";

// Functionality
function addTodo(e) {
	e.preventDefault();
	const task = ipTodo.value.trim().toUpperCase();
	const opTime = slTime.value;
	const opStat = slStatus.value;
	const opSub = slSubject.value;
	if (task !== "" && opTime !== "" && opStat !== "" && opSub !== "") {
		i++;
		const html = `
         <ul class="todo">
            <li class="id">#${i}</li>
            <li class="name">${task}</li>
            <li name='name' class="time">${opTime}</li>
            <li class="subject">${opSub}</li>
            <li >
               <button class="btn btn-${opStat}">${opStat.toUpperCase()}</button>
            </li>
            <li >
					<button class="btn btn-edit">EDIT</button>
               <button class="btn btn-delete">DELETE</button>
            </li>
         </ul>`;
		todosList.innerHTML += html;
		ipContainer.reset();
		ipTodo.focus();
	}
}
function deleteTodo(e) {
	// console.log(e.target.classList.contains("btn-delete"));
	if (e.target.classList.contains("btn-delete")) {
		e.target.parentElement.closest(".todo").remove();
	}
}
function filtered(search) {
	// console.log(search);
	// console.log(todosList.children);
	// console.log(Array(todosList.children));
	Array.from(todosList.children)
		.filter(
			(todo) =>
				!todo.childNodes[3].textContent
					.trim()
					.toUpperCase()
					.includes(search)
		)
		.forEach((todo) => todo.classList.add("filtered"));

	Array.from(todosList.children)
		.filter((todo) =>
			todo.childNodes[3].textContent.trim().toUpperCase().includes(search)
		)
		.forEach((todo) => todo.classList.remove("filtered"));
}

// EDIT TODO
function editTodo(e) {
	// console.log(e.target.closest('.todo'))
	const curTask = e.target.closest(".todo").children;
	if (e.target.classList.contains("btn-edit")) {
		ipTodo.value = curTask[1].textContent;
		slTime.value = curTask[2].textContent;
		slSubject.value = curTask[3].textContent;
		slStatus.value = curTask[4].textContent.trim().toLowerCase();
		// console.log(curTask[4].textContent.toLowerCase().trim());
		btnSave.classList.add("show");
		preStatus = slStatus.value.toLocaleLowerCase();
		curTodo = e.target.closest(".todo").children;
	}
}
function saveTodo() {
	// console.log(curTodo[4].children[0].classList);
	if (
		ipTodo.value !== "" &&
		slTime.value !== "" &&
		slSubject.value !== "" &&
		slStatus.value !== ""
	) {
		curTodo[1].textContent = ipTodo.value;
		curTodo[2].textContent = slTime.value;
		curTodo[3].textContent = slSubject.value;
		curTodo[4].children[0].textContent = slStatus.value.toUpperCase();

		// Delete Previus status
		curTodo[4].children[0].classList.remove(`btn-${preStatus}`);

		// Add New current selected status
		curTodo[4].children[0].classList.add(
			`btn-${slStatus.value.toLocaleLowerCase()}`
		);
		ipContainer.reset();
		ipTodo.focus();
		btnSave.classList.remove("show");
	}
}

// Clear All todo
function clearTodo(e) {
	e.preventDefault();
	i = 0;
	btnSave.classList.remove("show");
	console.log(todosList.children);
	// todosList.children.forEach((todo) => todo.remove());
	Array.from(todosList.children).forEach(todo => todo.remove())
	console.log(todosList.children);
}

// Handlers
btnAdd.addEventListener("click", addTodo);

todosList.addEventListener("click", deleteTodo);

ipSearch.addEventListener("keyup", (e) => {
	const search = ipSearch.value.trim().toUpperCase();
	filtered(search);
});

todosList.addEventListener("click", editTodo);
btnSave.addEventListener("click", (e) => {
	e.preventDefault();
	saveTodo();
});

btnClear.addEventListener("click", clearTodo);
