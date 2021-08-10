(function(){
  var taskInput = document.getElementById("new-task");
  var addButton = document.getElementsByTagName("button")[0];
  var incompleteTasksHolder = document.getElementById("incomplete-tasks");
  var completedTasksHolder = document.getElementById("completed-tasks");
  var incompleteTasksList = ['Pay Bills', 'Go Shopping'];
  var completeTasksList = ['See the doctor'];
  
  var createNewTaskElement = function(taskString, arr) {
    listItem = document.createElement("li");
    checkBox = document.createElement("input");
    label = document.createElement("label");
    editInput = document.createElement("input");
    editButton = document.createElement("button");
    deleteButton = document.createElement("button");
    
    checkBox.type = "checkbox";
    editInput.type = "text";
    editButton.innerText = "Edit";
    editButton.className = "edit";
    deleteButton.innerText = "Delete";
    deleteButton.className = "delete";

    label.innerText = taskString;

    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    
    return listItem;
  };
  
  window.onload = onloadHandler;
  
  
  function onloadHandler() {
    // localStorage.setItem("incompleteTasks",incompleteTasksList);
    if("incompleteTasks" in localStorage){
      incompleteTasksList = JSON.parse(localStorage.getItem('incompleteTasks'));
    } else {
      localStorage.setItem("incompleteTasks",JSON.stringify(incompleteTasksList));
    }
    for(let i=0; i<incompleteTasksList.length; i++){
      var listItem = createNewTaskElement(incompleteTasksList[i]);
      incompleteTasksHolder.appendChild(listItem);
      bindTaskEvents(listItem, taskCompleted);
      }
    if("completeTasks" in localStorage){
      completeTasksList = JSON.parse(localStorage.getItem('completeTasks'));
    } else {
      console.log(completeTasksList);
      localStorage.setItem("completeTasks",JSON.stringify(completeTasksList));
    }
    for(let i=0; i<completeTasksList.length; i++){
      var listItem = createNewTaskElement(completeTasksList[i]);
      completedTasksHolder.appendChild(listItem);
      bindTaskEvents(listItem, taskIncomplete);
      }
  }
  
  var addTask = function () {
    if(taskInput.value != ''){
      var listItemName = taskInput.value
      listItem = createNewTaskElement(listItemName)
      incompleteTasksList.push(listItemName);
      incompleteTasksHolder.appendChild(listItem)
      bindTaskEvents(listItem, taskCompleted)
      taskInput.value = "";
      localStorage.setItem("incompleteTasks",JSON.stringify(incompleteTasksList));
      var items = localStorage.getItem("incompleteTasks");
      // console.log(items);
    }
  };
  var editTask = function () {
    var listItem = this.parentNode;
    var editInput = listItem.querySelectorAll("input[type=text]")[0];
    var label = listItem.querySelector("label");
    var button = listItem.getElementsByTagName("button")[0];
    var idx = incompleteTasksList.indexOf(label.innerText);
    var containsClass = listItem.classList.contains("editMode");
    if (containsClass) {
      if(listItem.parentNode == incompleteTasksHolder){
        incompleteTasksList.splice(idx,1);
        incompleteTasksList.splice(idx,0,editInput.value);
        localStorage.setItem("incompleteTasks",JSON.stringify(incompleteTasksList));
      }
      else{
        completeTasksList.splice(idx,1);
        completeTasksList.splice(idx,0,editInput.value);
        localStorage.setItem("completeTasks",JSON.stringify(completeTasksList));
      }
        label.innerText = editInput.value
        button.innerText = "Edit";
    } else {
      editInput.value = label.innerText
      button.innerText = "Save";
    }
    listItem.classList.toggle("editMode");
  };
  
  var deleteTask = function (el) {
    var listItem = this.parentNode;
    var ul = listItem.parentNode;
    var label = listItem.querySelector("label").innerText;
    if(ul == incompleteTasksHolder){
      var idx = incompleteTasksList.indexOf(label);
      incompleteTasksList.splice(idx,1);
      localStorage.setItem("incompleteTasks",JSON.stringify(incompleteTasksList));
    }
    else{
      var idx = completeTasksList.indexOf(label);
      console.log(idx);
      completeTasksList.splice(idx,1);
      localStorage.setItem("completeTasks",JSON.stringify(completeTasksList));
    }
    ul.removeChild(listItem);
  };

 
  var taskCompleted = function () {
    var listItem = this.parentNode;
    var label = listItem.querySelector("label").innerText;
    // console.log(completeTasksList);
    if(listItem.parentNode==incompleteTasksHolder){
      var idx = incompleteTasksList.indexOf(label);
      // incompleteTasksList.splice(idx,1);
      incompleteTasksList.splice(idx,1);
    }
    if(!(label in incompleteTasksList) && listItem.parentNode==incompleteTasksHolder){
      completeTasksList.push(label);
      completedTasksHolder.appendChild(listItem);
    }
    // console.log("Complete :"+completeTasksList+"\n Incomplete: "+incompleteTasksList);
    localStorage.setItem("completeTasks",JSON.stringify(completeTasksList));
    localStorage.setItem("incompleteTasks",JSON.stringify(incompleteTasksList));
    bindTaskEvents(listItem, taskIncomplete);
  };
  
  var taskIncomplete = function() {
    var listItem = this.parentNode;
    var label = listItem.querySelector("label").innerText;
    if(listItem.parentNode==completedTasksHolder){
      var idx = completeTasksList.indexOf(label);
      // console.log(completeTasksList);
      completeTasksList.splice(idx,1);
      // console.log(completeTasksList);
    }
    // console.log("Complete :"+completeTasksList+"\n Incomplete: "+incompleteTasksList);
    if(!(label in completeTasksList) && listItem.parentNode==completedTasksHolder){
      incompleteTasksList.push(label);
      incompleteTasksHolder.appendChild(listItem);
    }
    localStorage.setItem("completeTasks",JSON.stringify(completeTasksList));
    localStorage.setItem("incompleteTasks",JSON.stringify(incompleteTasksList));
    bindTaskEvents(listItem, taskCompleted);
  };
  
  var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
    var checkBox = taskListItem.querySelectorAll("input[type=checkbox]")[0];
    var editButton = taskListItem.querySelectorAll("button.edit")[0];
    var deleteButton = taskListItem.querySelectorAll("button.delete")[0];
    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
    checkBox.onchange = checkBoxEventHandler;
   
  };
  
  addButton.addEventListener("click", addTask);
  
  for (var i = 0; i < incompleteTasksHolder.children.length; i++) {
    bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
  }
  for (var i = 0; i < completedTasksHolder.children.length; i++) {
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
  }
})();