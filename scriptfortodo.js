

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let completedtasks = JSON.parse(localStorage.getItem("completedtasks")) || [];
/* function to add a task to the list */
function addTask() {
  let taskInput = document.getElementById("TaskInput");
  let task = taskInput.value.trim();

  if (task) {
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    showTasks();
    taskInput.value = "";
  }
}

/* function to show the list of tasks */
function showTasks() {
  let taskslist = document.getElementById("taskList");
  taskslist.innerHTML = ""; // Clear the list before repopulating

  for (let i = 0; i < tasks.length; i++) {
    let li = document.createElement("li");
    li.textContent = tasks[i];
    li.classList.add("task-item");

    // Create a delete button
    let dtlbtn = document.createElement("button");
    dtlbtn.textContent = "🗑️";
    dtlbtn.classList.add("Delete");
    //creating a completed button to differentiate
    let combtn = document.createElement("button");
    combtn.textContent = "✔️";
    combtn.classList.add("Complete");
    // Attach a click event listener that calls deleteTask with the index 'i'
    dtlbtn.onclick = () => deleteTask(i);
    combtn.onclick = () => moveTask(i)
    // Append the button to the list item
    li.appendChild(combtn);
    li.appendChild(dtlbtn);


    // Append the complete list item to the task list
    taskslist.appendChild(li);
  }
}

/* function to delete a task by its index */
function deleteTask(index) {
  const taskslist = document.getElementById("taskList");
  const itemToDelete = taskslist.children[index]; 

  if (itemToDelete) {
    // 1. Start the CSS fade-out animation
    itemToDelete.classList.add('deleting');

    // 2. Delay the actual data removal and screen refresh
    setTimeout(() => {
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      showTasks(); // Refresh the pending list
    }, 400); // Wait 400ms (0.4s) for the animation defined in CSS
  }
}

function moveTask(index){
  const taskslist = document.getElementById("taskList");
  const taskToMove = tasks[index];

  if(taskToMove){
    const itemToAnimate = taskslist.children[index]; 
    itemToAnimate.classList.add('deleting'); // Start animation
    
    setTimeout(() => {
      
        completedtasks.push(taskToMove);
        localStorage.setItem("completedtasks", JSON.stringify(completedtasks));
        
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        
        showTasks(); // Refresh the pending list
    }, 400);
  }
}
function showCompleted(){
  let taskslist = document.getElementById("taskList");
  taskslist.innerHTML = "";
  for (let i = 0; i < completedtasks.length; i++) {
    let li = document.createElement("li");
    li.textContent = completedtasks[i];
    li.classList.add("task-item");

    // Create a delete button
    let dtlbtn = document.createElement("button");
    dtlbtn.textContent = "🗑️";
    dtlbtn.classList.add("Delete");
    // Attach a click event listener that calls deleteTask with the index 'i'
    dtlbtn.onclick = () => deletecompletedTask(i);
    // Append the button to the list item
    li.appendChild(dtlbtn);


    // Append the complete list item to the task list
    taskslist.appendChild(li);
  }
}
function deletecompletedTask(index) {
  // 1. Get the reference to the UL element currently showing the list
  const taskslist = document.getElementById("taskList");
  
  // 2. Access the <li> element to be deleted using its index in the DOM
  const itemToDelete = taskslist.children[index]; 

  if (itemToDelete) {
      // 3. Start the CSS fade-out animation (set in the HTML <style> or CSS file)
      itemToDelete.classList.add("deleting"); 

      // 4. Delay the array modification and UI refresh until the animation is done
      setTimeout(() => {
          // A. Remove item from the JavaScript array
          completedtasks.splice(index, 1);
          
          // B. Update localStorage
          localStorage.setItem("completedtasks", JSON.stringify(completedtasks));
          
          // C. Refresh the list to remove the item permanently
          showCompleted(); 
      }, 400); 
  }
}
//changing colors dynamically 
function changeBackground(el){
  const newColor = el.getAttribute('data-color');
  
  document.body.style.background = newColor; 
  
  localStorage.setItem('pageBackgroundColor', newColor);
}

function loadSavedBackground() {
    const savedColor = localStorage.getItem('pageBackgroundColor');
    if (savedColor) {
        document.body.style.background = savedColor; // FIX HERE TOO
    }
}
document.addEventListener('DOMContentLoaded', showTasks);
// Call showTasks initially to display any tasks from local storage
/* what does json do : JSON is useful for storing the data into local storage like when you reload the tab it dosent fade away
and that localstorage.setItem() plays a crucial role */