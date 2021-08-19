(function(){
    let features={
    
      onload: function(){
        if ("incompleteTasks" in localStorage)
       { 
         incompleteList=JSON.parse(localStorage.getItem("incompleteTasks"));
        }
          else{
            localStorage.setItem("incompleteTasks",JSON.stringify(incompleteList));
          }
          for (let i = 0; i < incompleteList.length; i++) {
      var listItem=createNewTaskElement(incompleteList[i]);
      incompleteTasksHolder.appendChild(listItem);
      bindTaskEvents(listItem,taskCompleted);
          }
      
          if ("completeTasks" in localStorage)
          { 
            completeList=JSON.parse(localStorage.getItem("completeTasks"));
           }
             else{
               localStorage.setItem("completeTasks",JSON.stringify(completeList));
             }
             for (let i = 0; i < completeList.length; i++) {
         var listItem=createNewTaskElement(completeList[i]);
         completedTasksHolder.appendChild(listItem);
         bindTaskEvents(listItem,taskIncomplete);
             }
         }
      }
    
      var taskInput = document.getElementById("new-task");
      var addButton = document.getElementsByTagName("button")[0];
      var incompleteTasksHolder = document.getElementById("incomplete-tasks");
      var completedTasksHolder = document.getElementById("completed-tasks");
      
      var completeList= ['See the Doctor'];
      var incompleteList= ['Pay Bills','Go Shopping'];
    
      
      let createNewTaskElement = function(taskString, arr) {
        var listItem = document.createElement("li");
        var checkBox = document.createElement("input");
        var label = document.createElement("label");
        var editInput = document.createElement("input");
        var editButton = document.createElement("button");
        var deleteButton = document.createElement("button");
      
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
    
    
      var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
        var checkBox = taskListItem.querySelectorAll("input[type=checkbox]")[0];
        var editButton = taskListItem.querySelectorAll("button.edit")[0];
        var deleteButton = taskListItem.querySelectorAll("button.delete")[0];
        editButton.onclick = editTask;
        deleteButton.onclick = deleteTask;
        checkBox.onchange = checkBoxEventHandler;  
        if (checkBoxEventHandler==taskIncomplete)
        checkBox.checked=true;
        else
        checkBox.checked=false;
    }
    
      var addTask = function () {
        var listItemName = taskInput.value ;
        if(listItemName.trim()!=""){
        incompleteList.push(listItemName);
        localStorage.setItem("incompleteTasks",JSON.stringify(incompleteList));  
          listItem = createNewTaskElement(listItemName);    
        incompleteTasksHolder.appendChild(listItem)
        bindTaskEvents(listItem, taskCompleted)
        taskInput.reset();
      
        }
      };
    
      var editTask = function () {
        var listItem = this.parentNode;
        var editInput = listItem.querySelectorAll("input[type=text")[0];
        var label = listItem.querySelector("label");
        var button = listItem.getElementsByTagName("button")[0];
        var containsClass = listItem.classList.contains("editMode");
        var index1=incompleteList.indexOf(label.innerText);
        var index2=completeList.indexOf(label.innerText);
    
        console.log(containsClass);

        if (containsClass) {
          var listItemName = editInput.value;
          if (listItemName.trim() == "") {
              editInput.classList.add("error");
              return;
          } 
      
        if(listItem.parentNode==incompleteTasksHolder){
        incompleteList.splice(index1,1);
        incompleteList.splice(index1,0,editInput.value);
        localStorage.setItem("incompleteTasks",JSON.stringify(incompleteList));
        }
        else{
          completeList.splice(index2,1);
          completeList.splice(index2,0,editInput.value);
          localStorage.setItem("completeTasks",JSON.stringify(completeList));
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
        var input_label=listItem.querySelector("label").innerText;
        if(ul==incompleteTasksHolder){
          var index_label1= incompleteList.indexOf(input_label);
          incompleteList.splice(index_label1,1);
          localStorage.setItem("incompleteTasks",JSON.stringify(incompleteList));
        }
          else{
          var index_label2= completeList.indexOf(input_label);
          completeList.splice(index_label2,1);
          console.log("inside delete func complete parent node",completeList)
          localStorage.setItem("completeTasks",JSON.stringify(completeList));
        }
        ul.removeChild(listItem);
      };
      
    
       var taskCompleted = function (el) {
        var listItem = this.parentNode;
        var label=listItem.querySelector("label").innerText;
    
        if(listItem.parentNode==incompleteTasksHolder){
          var idLabel= incompleteList.indexOf(label);
          incompleteList.splice(idLabel,1);
        }
        if(!(label in incompleteList) && listItem.parentNode==incompleteTasksHolder){
          completeList.push(label);
          completedTasksHolder.appendChild(listItem);
        }
        localStorage.setItem("completeTasks",JSON.stringify(completeList));
        localStorage.setItem("incompleteTasks",JSON.stringify(incompleteList));
        bindTaskEvents(listItem, taskIncomplete);
      };
      
      var taskIncomplete = function() {
      var listItem = this.parentNode;
        var label=listItem.querySelector("label").innerText;
        if(listItem.parentNode==completedTasksHolder){
          var idLabel= completeList.indexOf(label);
          completeList.splice(idLabel,1);
        }
        if(!(label in completeList) && listItem.parentNode==completedTasksHolder){
          incompleteList.push(label);
          incompleteTasksHolder.appendChild(listItem);
        }
    
        localStorage.setItem("completeTasks",JSON.stringify(completeList));
        localStorage.setItem("incompleteTasks",JSON.stringify(incompleteList));
        bindTaskEvents(listItem, taskCompleted);
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