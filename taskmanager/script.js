function  addTask() {
	const  input  =  document.getElementById("taskInput");
	const  taskText  =  input.value.trim();
	if (taskText  ===  "") return;

	const  li  =  document.createElement("li");

	const  span  =  document.createElement("span");
	span.textContent  =  taskText;
	span.onclick  =  ()  =>  li.classList.toggle("done");

	const  delBtn  =  document.createElement("button");
	delBtn.textContent  =  "❌";
	delBtn.onclick  =  ()  =>  li.remove();

	li.appendChild(span);
	li.appendChild(delBtn);

	document.getElementById("taskList").appendChild(li);
	input.value  =  "";
    saveTasks(); // Save tasks after adding a new one
}
// add tasks to the localstorage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll("#taskList li span").forEach(span => {
        tasks.push(span.textContent);
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
// Load tasks from localStorage on page load
window.onload  =  ()  =>  {
    const  tasks  =  JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(taskText  =>  {
        const  li  =  document.createElement("li");

        const  span  =  document.createElement("span");
        span.textContent  =  taskText;
        span.onclick  =  ()  =>  li.classList.toggle("done");

        const  delBtn  =  document.createElement("button");
        delBtn.textContent  =  "❌";
        delBtn.onclick  =  ()  =>  li.remove();

        li.appendChild(span);
        li.appendChild(delBtn);

        document.getElementById("taskList").appendChild(li);
    });
};