const taskForm = document.getElementById("task-form");
const formDiv = document.querySelector(".form-container");
let taskArea = document.getElementById("show-textarea");
const removeButton = document.getElementById("remove-button");
const showFormButton = document.getElementById("show-form");

showFormButton.addEventListener("click", () => {
	if (formDiv.style.display === "none") {
		formDiv.style.display = "block";
	} else {
		formDiv.style.display = "none";
	}
});

removeButton.addEventListener("click", DeleteTask);

taskForm.addEventListener("submit", (e) => {
	e.preventDefault();
	const task = document.getElementById("add-text").value;
	const importance = parseInt(
		document.getElementById("importance-slider").value
	);

	if (task === "") {
		alert("You need to enter a task!");
		return;
	}

	const formData = {
		task: task,
		importance: importance,
	};

	document.getElementById("add-text").value = "";
	document.getElementById("importance-slider").value = 0;

	AddTask(formData);
	formDiv.style.display = "none";
});

function AddTask(formData) {
	GetData("add", formData);
}

function DeleteTask() {
	let taskToDelete = CheckActiveRows();

	if (taskToDelete.length === 0) {
		alert("no deleted task selected");
		return;
	}
	GetData("remove", taskToDelete);
}

function CheckActiveRows() {
	let checkList = [];
	let checkboxes = document.querySelectorAll("input[type='checkbox']");
	for (let i = 0; i < checkboxes.length; i++) {
		if (checkboxes[i].checked) {
			checkList.push(i);
		}
	}
	return checkList;
}

function Table(data) {
	taskArea.innerHTML = "";
	console.log(data.message);
	let rows = "";
	data.tasks.forEach((task, i) => {
		rows += `<tr>
			<td>${task.task}</td>
			<td>${task.importance}</td>
			<td><input type="checkbox" class="checkbox-wrapper-1" id="checked-${i}"></td>
			</tr>`;
	});
	taskArea.innerHTML = rows;
}

function GetData(actionKey, data) {
	fetch("ToDo.php", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ [actionKey]: data }),
	})
		.then((response) => response.json())
		.then((data) => {
			Table(data);
		})
		.catch((error) => {
			console.log("There was a problem with the post fetch", error);
		});
}
