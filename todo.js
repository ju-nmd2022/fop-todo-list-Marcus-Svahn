const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


// Help from ChatGPT

// Render the tasklist
function render() {

    // Clears the input text
	taskList.innerHTML = "";

	for (let i = 0; i < tasks.length; i++) {
		const taskItem = document.createElement("li");
		taskItem.classList.add("taskItem");
		taskItem.innerHTML = `
			<span>${tasks[i].text}</span>
			<div>
				<button class="doneButton" data-id="${i}">Done</button>
				<button class="deleteButton" data-id="${i}">Delete</button>
			</div>
		`;

        // Adds "".done" to the CSS
		if (tasks[i].done) {
			taskItem.classList.add("done");
		}

        // Adds the li element to the task list
		taskList.appendChild(taskItem);
	}

    // Saves the current task list to the local storage
	localStorage.setItem("tasks", JSON.stringify(tasks));
}


addButton.addEventListener("click", function() {
    // Gets the input valute and removes white space 
	const text = taskInput.value.trim();

    // checks for text 
	if (text) {
		tasks.push({
			text: text,
			done: false
		});
        // Clears the input field after
		taskInput.value = "";
		render();
	}
});

    // Listerner for the Done & Delete button clicks
taskList.addEventListener("click", function(event) {

        // Will add done the finnished task and update
	if (event.target.classList.contains("doneButton")) {
		const id = event.target.dataset.id;
		tasks[id].done = true;
		render();
    
        // Will remove the task from the array and update
	} else if (event.target.classList.contains("deleteButton")) {
		const id = event.target.dataset.id;
		tasks.splice(id, 1);
		render();
	}
});

render();
