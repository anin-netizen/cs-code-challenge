(function () {
  let features = {
    onload: function () {
      if ("incompleteTasks" in localStorage) {
        incompleteTasksList = JSON.parse(
          localStorage.getItem("incompleteTasks")
        );
      } else {
        localStorage.setItem(
          "incompleteTasks",
          JSON.stringify(incompleteTasksList)
        );
      }
      for (let i = 0; i < incompleteTasksList.length; i++) {
        var listItem = createNewTaskElement(incompleteTasksList[i]);
        incompleteTasksHolder.appendChild(listItem);
        bindTaskEvents(listItem, taskCompleted);
      }
      if ("completeTasks" in localStorage) {
        completeTasksList = JSON.parse(localStorage.getItem("completeTasks"));
      } else {
        console.log(completeTasksList);
        localStorage.setItem(
          "completeTasks",
          JSON.stringify(completeTasksList)
        );
      }
      for (let i = 0; i < completeTasksList.length; i++) {
        var listItem = createNewTaskElement(completeTasksList[i]);
        completedTasksHolder.appendChild(listItem);
        bindTaskEvents(listItem, taskIncomplete);
      }
    },
  };

  var taskInput = document.getElementById("new-task");
  var addButton = document.getElementsByTagName("button")[0];
  var incompleteTasksHolder = document.getElementById("incomplete-tasks");
  var completedTasksHolder = document.getElementById("completed-tasks");
  var incompleteTasksList = ["Pay Bills", "Go Shopping"];
  var completeTasksList = ["See the doctor"];

  let createNewTaskElement = function (taskString, arr) {
    let listItem = document.createElement("li");
    let checkBox = document.createElement("input");
    let label = document.createElement("label");
    let editInput = document.createElement("input");
    let editButton = document.createElement("button");
    let deleteButton = document.createElement("button");

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

  var addTask = function () {
    var listItemName = taskInput.value;
    if (taskInput.value != "") {
      listItem = createNewTaskElement(listItemName);
      incompleteTasksList.push(listItemName);
      localStorage.setItem(
        "incompleteTasks",
        JSON.stringify(incompleteTasksList)
      );
      incompleteTasksHolder.appendChild(listItem);
      bindTaskEvents(listItem, taskCompleted);
      taskInput.reset();
      //var items = localStorage.getItem("incompleteTasks");
      // console.log(items);
    }
  };
  var editTask = function () {
    var listItem = this.parentNode;
    var editInput = listItem.querySelectorAll("input[type=text]")[0];
    var label = listItem.querySelector("label");
    var button = listItem.getElementsByTagName("button")[0];
    var containsClass = listItem.classList.contains("editMode");
    var idx1 = incompleteTasksList.indexOf(label.innerText);
    var idx2 = completeTasksList.indexOf(label.innerText);

    if (containsClass) {
      var listItemName = editInput.value;
      if (listItemName.trim() == "") {
        editInput.classList.add("error");
        return;
      }

      if (listItem.parentNode == incompleteTasksHolder) {
        incompleteTasksList.splice(idx1, 1);
        incompleteTasksList.splice(idx1, 0, editInput.value);
        localStorage.setItem(
          "incompleteTasks",
          JSON.stringify(incompleteTasksList)
        );
      } else {
        completeTasksList.splice(idx2, 1);
        completeTasksList.splice(idx2, 0, editInput.value);
        localStorage.setItem(
          "completeTasks",
          JSON.stringify(completeTasksList)
        );
      }
      label.innerText = editInput.value;
      button.innerText = "Edit";
    } else {
      editInput.value = label.innerText;
      button.innerText = "Save";
    }
    listItem.classList.toggle("editMode");
  };

  var deleteTask = function (el) {
    var listItem = this.parentNode;
    var ul = listItem.parentNode;
    var label = listItem.querySelector("label").innerText;
    if (ul == incompleteTasksHolder) {
      var idx = incompleteTasksList.indexOf(label);
      //console.log(idx);
      incompleteTasksList.splice(idx, 1);
      localStorage.setItem(
        "incompleteTasks",
        JSON.stringify(incompleteTasksList)
      );
    } else {
      var idx = completeTasksList.indexOf(label);
      //console.log(idx);
      completeTasksList.splice(idx, 1);
      localStorage.setItem("completeTasks", JSON.stringify(completeTasksList));
    }
    ul.removeChild(listItem);
  };

  var taskCompleted = function () {
    var listItem = this.parentNode;
    var label = listItem.querySelector("label").innerText;
    // console.log(completeTasksList);
    if (listItem.parentNode == incompleteTasksHolder) {
      var idx = incompleteTasksList.indexOf(label);
      // incompleteTasksList.splice(idx,1);
      incompleteTasksList.splice(idx, 1);
    }
    if (
      !(label in incompleteTasksList) &&
      listItem.parentNode == incompleteTasksHolder
    ) {
      completeTasksList.push(label);
      completedTasksHolder.appendChild(listItem);
    }
    // console.log("Complete :"+completeTasksList+"\n Incomplete: "+incompleteTasksList);
    localStorage.setItem("completeTasks", JSON.stringify(completeTasksList));
    localStorage.setItem(
      "incompleteTasks",
      JSON.stringify(incompleteTasksList)
    );
    bindTaskEvents(listItem, taskIncomplete);
  };

  var taskIncomplete = function () {
    var listItem = this.parentNode;
    var label = listItem.querySelector("label").innerText;
    if (listItem.parentNode == completedTasksHolder) {
      var idx = completeTasksList.indexOf(label);
      // console.log(completeTasksList);
      completeTasksList.splice(idx, 1);
      // console.log(completeTasksList);
    }
    // console.log("Complete :"+completeTasksList+"\n Incomplete: "+incompleteTasksList);
    if (
      !(label in completeTasksList) &&
      listItem.parentNode == completedTasksHolder
    ) {
      incompleteTasksList.push(label);
      incompleteTasksHolder.appendChild(listItem);
    }
    localStorage.setItem("completeTasks", JSON.stringify(completeTasksList));
    localStorage.setItem(
      "incompleteTasks",
      JSON.stringify(incompleteTasksList)
    );
    bindTaskEvents(listItem, taskCompleted);
  };

  var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
    var checkBox = taskListItem.querySelectorAll("input[type=checkbox]")[0];
    var editButton = taskListItem.querySelectorAll("button.edit")[0];
    var deleteButton = taskListItem.querySelectorAll("button.delete")[0];
    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
    checkBox.onchange = checkBoxEventHandler;
    if (checkBoxEventHandler == taskIncomplete) 
    checkBox.checked = true;
    else checkBox.checked = false;
  };

  addButton.addEventListener("click", addTask);

  for (var i = 0; i < incompleteTasksHolder.children.length; i++) {
    bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
  }
  for (var i = 0; i < completedTasksHolder.children.length; i++) {
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
  }

  features.onload();
})();
