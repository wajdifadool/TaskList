console.log('hello');

//Constans
const taskInput = document.querySelector('#task');
const form = document.querySelector('#task-form');
const textFilter = document.querySelector('#filter');
const btnClear = document.querySelector('.clear-tasks');
const taskList = document.querySelector('.collection');

//Load all Event listeners
loadAllEventListeners();
function loadAllEventListeners(){
  //load Dom Lisenere
  document.addEventListener('DOMContentLoaded', updateTasksToUL);
  //load form Submit listeners
  form.addEventListener('submit' , addTask) ;
  taskList.addEventListener('click' , removeTask) ;
  btnClear.addEventListener('click' , removeAllTasks) ;
  textFilter.addEventListener('keyup' ,filterTasks) ;

};

//Add task
function addTask(e){
  e.preventDefault() ;
  if (taskInput.value === ''){
    alert('add task');
  }
  //Create Li item
  const li = document.createElement('li');
  li.className = 'collection-item';
  li.appendChild(document.createTextNode(taskInput.value)) ;

  //create delete icon
  const delete_ic = document.createElement('a');
  delete_ic.className='delete-item secondary-content';
  delete_ic.innerHTML = '<i class="fa fa-remove"  </i>';
  li.appendChild(delete_ic);
  //append the li to ul
  taskList.appendChild(li);

  //add task to local Stoarge
  storeTaslToLocalStorage(taskInput.value);
  //clear input
  taskInput.value = '';

};

//add task to local Stoarge
function storeTaslToLocalStorage(task){
  let tasks  ;
  if (localStorage.getItem('tasks') === null)
  {
    tasks = [] ;
  }
  else{
    tasks  = JSON.parse(localStorage.getItem('tasks')) ;
  }
  tasks.push(task)
  localStorage.setItem('tasks' , JSON.stringify(tasks));
}




function removeTaskFromLocalStorage(taskItem) {
  if (localStorage.getItem('tasks') === null)
  {
    tasks = [] ;
  }
  else{
    tasks  = JSON.parse(localStorage.getItem('tasks')) ;
  }
  // remove from the array
  tasks.forEach(function(taskFormLoop , index) {
    if (taskItem.textContent === taskFormLoop) {
    tasks.splice(index, 1)
    }
  });
  //update local Storage
  localStorage.setItem('tasks' , JSON.stringify(tasks));
}




function removeTask(e){
  //delegation
  const li_item = e.target.parentElement.parentElement ;
  if (e.target.parentElement.classList.contains('delete-item')) {
    li_item.remove();
    const taskItem = e.target.parentElement.parentElement;
    removeTaskFromLocalStorage(taskItem);
  }


}// end of remove tasks


function removeAllTasks(e){
  e.preventDefault();
  while(taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  localStorage.clear();
};

//filterTasks
function filterTasks(e){
  //the value of typing
  const text =  e.target.value.toLowerCase() ;
  //get All tasks
  document.querySelectorAll('.collection-item').forEach(function(item){
    task = item.firstChild.textContent;
    //console.log(`the task vale = ${item} , text_to_filter = ${text_to_filter}`);
    if (task.toLocaleLowerCase().indexOf(text) != -1){
    //found
      item.style.display = 'block' ;
    }else{
      item.style.display = 'none' ;
    }
  });
}


//update the ul
function updateTasksToUL() {
  let tasks ;
  if (localStorage.getItem('tasks') === null)
  {
    //init empty Array
    tasks = [] ;
  }
  else
  {
    //fill the Array
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  //get Each Task By Looping the Tasks array
  tasks.forEach(function(taskItem){
    //Create Elements
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(taskItem));
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>'
    li.appendChild(link);
    taskList.appendChild(li);
  });

}
