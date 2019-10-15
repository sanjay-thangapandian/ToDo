const list = document.getElementById("list");
const input = document.getElementById("task");
const subinput = document.getElementById("subinput");
const subtask = document.getElementById("sub-task");
const substep = document.getElementById("step-add");
const substepinput = document.getElementById("step-list");
let TASKS=[];
let id = 0;
let subid = 0;
let stepId = 0;
let check = false;

/**
 * method to toggle and add steps to the sub task
 * @param {subtask Id to match the subtask and add the steps} subId - 
 */
function toggleaddstep(subId){
    let size = document.getElementById("add-step").style.width; 
    
    if(size == "0px"){
        document.getElementById("add-step").style.width ="358px";        
    } else {
        document.getElementById("add-step").style.width ="358px";
        for(let i = 0;i<TASKS.length;i++) {
            for(let j = 0;j < TASKS[i].subArray.length;j++){
                if(TASKS[i].subArray[j].id==subId){
                    document.getElementById("sub-task-list").value =  TASKS[i].subArray[j].name;
                    document.getElementById("subtask-title-id").textContent =  TASKS[i].subArray[j].id;
                    if(TASKS[i].subArray[j].check == true){
                        document.getElementById("sub-task-list").style.textDecoration ="line-through";  
                    } else{
                        document.getElementById("sub-task-list").style.textDecoration ="none";
                    }
                }
            }
        }
    }
}
/**
 * method to toggle navbar 
 * @param {id that is used to toggle the navigation bar} toogle 
 */
function toggleSidebar(toogle){
    let availability = document.getElementById(toogle); 
    if(availability.classList.contains("nav-open")){
        document.getElementById(toogle).className ="nav nav-close";
    } else {
        document.getElementById(toogle).className ="nav nav-open";
    }
}
/**
 * method to toggle navigation bar and add tasks 
 * @param {id that is used to toggle the navigation bar} toogle 
 */
function taskMenu(toogle){
    document.getElementById(toogle).className ="nav nav-open";
}
/**
 * Method to delete the first child and show the subtasks that matched the Id
 * @param {subtask Id used to match the subtask} id 
 */
function subTaskView(id){
    while (subtask.firstChild) {
        subtask.removeChild(subtask.firstChild);
    }
    getIndexForId(id)
    for(let i = 0;i < TASKS.length;i++){
        if(TASKS[i].id==id){
            document.getElementById("task-title").textContent =  TASKS[i].name;
            document.getElementById("task-title-id").textContent =  TASKS[i].id;
        }
    }
}
/**
 * method to match the task Id and display subtask of specific task
 * @param {task Id to match and retrieve subtasks} id 
 */
function getIndexForId(id) {
    for(let i= 0; i < TASKS.length; i++){
        if(TASKS[i].id==id) {
            let subTaskArray = TASKS[i].subArray;
            for(let subTask = 0; subTask < subTaskArray.length; subTask++) {
                addSubTask(subTaskArray[subTask].name, subTaskArray[subTask].id);
            }
        }
    }
}
/**
 * method used to display task name and task Id
 * @param {name of the task } text 
 * @param {Id of the task} id 
 */
function addTodo(text,id){
        
    const task = `<div class="task-menu" id=${id} onclick="subTaskView(id)">
    <i class="icon fontIcon ms-Icon ms-Icon--BulletedList2 iconSize-24" aria-hidden="true"></i>
    <span class="task-toggle">
     <li>
       <p>${text} </p>
    </li>  
    </span>
    </div>`
    const position = "beforeend";
    list.insertAdjacentHTML(position,task);
}
/**
 * method to add task in the array
 */
input.addEventListener("keyup",function(event){
    if(event.keyCode == 13){
        const toDo = input.value;
        let subArray=[];
        if(toDo){
            addTodo(toDo,id);
            TASKS.push(
                {
                name: toDo,
                id: id,
                subArray:subArray
                }
            )
            subTaskView(id);
        }
        id++;
        input.value = "";
    }
});
/**
 * method used to display subtask name and subtask Id
 * @param {name of the subtask} subTask 
 * @param {Id of the subtask} subid 
 */
function addSubTask(subTask,subid){
    const subTaskText  = `<li>
    <div>
    <input type="checkbox"  id=${subid} onclick="taskDone(id)"/>
    <div id=${subid} onclick="toggleaddstep(id)">
    <p id =${subid} name = "status" onclick="stepChild(id)">${subTask} </p>
    </div>
    </div>
    </li>`
    const position = "beforeend";
    subtask.insertAdjacentHTML(position,subTaskText);
}
/**
 * method to add task in the array
 */
subinput.addEventListener("keyup",function(event){
    if(event.keyCode == 13) {
        const subTask = subinput.value;
        let stepArray = []; 
        let taskId = document.getElementById("task-title-id").textContent;
        for(let i=0;i<TASKS.length;i++) {
            if(TASKS[i].id==taskId) {
                if(subTask){
                    TASKS[i].subArray.push(
                        {
                        name: subTask,
                        id: subid,
                        taskId: TASKS[i].id,
                        check:check,
                        stepArray : stepArray
                        }
                    );
                    addSubTask(subTask,subid,TASKS[i].id);
                    subid++;

                }
            }
        }
        subinput.value = "";
    }
});
/**
 * Method to delete the first child and show the steps that matched the subtaskId
 * @param {subtask Id used to match the subtask} id 
 */
function stepChild(subId){
    while (substepinput.firstChild) {
        substepinput.removeChild(substepinput.firstChild);
    }
    getIndexForStepId(subId);
}
/**
 * method to match the subtask Id and display steps of specific subtask
 * @param {subtask Id to match and retrieve steps} id 
 */
function getIndexForStepId(subId){
    for(let j = 0;j<TASKS.length;j++) {
        for(let i = 0;i < TASKS[j].subArray.length;i++){
            if(TASKS[j].subArray[i].id==subId){
                console.log(subId)
                for(let k = 0; k < TASKS[j].subArray[i].stepArray.length; k++) {
                    addSteps(TASKS[j].subArray[i].stepArray[k].name, TASKS[j].subArray[i].stepArray[k].id);
                }
            }
        }
   }

}
/**
 * method used to display step name and stepId of the subtask 
 * @param {name of the step} step 
 * @param {Id of the step} stepId 
 */
function addSteps (step,stepId,subTaskId){
    const stepText  = `<li>
                          <p>${step}</p>
                        </li>`
    const position = "beforeend";
    substepinput.insertAdjacentHTML(position,stepText);
}
/**
 * method to add steps in the array of subtask
 */
substep.addEventListener("keyup",function(event){
    if(event.keyCode == 13) {
        const step = substep.value;
        let subTaskId = document.getElementById("subtask-title-id").textContent;
        for(let i = 0;i < TASKS.length;i++){
            for(let j = 0;j < TASKS[i].subArray.length;j++) {
            if(TASKS[i].subArray[j].id == subTaskId){
                if(step){
                    TASKS[i].subArray[j].stepArray.push(
                    {
                    name: step,
                    id: stepId,
                    subTaskId: subTaskId
                    }
                    );
            addSteps(step,stepId,subTaskId);
            stepId++;
        }

    }   
        substep.value = "";
    }
    }    
    }
})
function taskDone(subId) {
    for(let i = 0;i<TASKS.length;i++){
        for(let j = 0;j<TASKS[i].subArray.length;j++){
            if(TASKS[i].subArray[j].id == subId){
                if(TASKS[i].subArray[j].check == false){
                    TASKS[i].subArray[j].check = true;
                    document.getElementsByName("status")[j].style.textDecoration ="line-through";
                    lineThrough(subId);
                }else {
                    TASKS[i].subArray[j].check  = false;
                    document.getElementsByName("status")[j].style.textDecoration ="none";
                    lineThrough(subId);
                }
            }
        }
    } 
 }
 function lineThrough(subId){
    for(let j = 0;j<TASKS.length;j++) {
        for(let i = 0;i < TASKS[j].subArray.length;i++){
            if(TASKS[j].subArray[i].id == subId){
                if(TASKS[j].subArray[i].check == true){
                    document.getElementById("sub-task-list").style.textDecoration ="line-through";  
                } else{
                    document.getElementById("sub-task-list").style.textDecoration ="none";
                }
            }
        }
   }
}