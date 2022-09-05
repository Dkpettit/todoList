//CONSTANTS
const addTasks = document.querySelector(".add-task");
const tasksList = document.querySelector(".tasks");
const date_picker_element = document.querySelector('.date-picker');
const selected_date_element = document.querySelector('.date-picker .selected-date');
const dates_element = document.querySelector('.date-picker .dates');
const mth_element = document.querySelector('.date-picker .dates .month .mth');
const next_mth_element = document.querySelector('.date-picker .dates .month .next-mth');
const prev_mth_element = document.querySelector('.date-picker .dates .month .prev-mth');
const days_element = document.querySelector('.date-picker .dates .days');
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let date = new Date();
let day = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();

let selectedDate = date;
let selectedDay = day;
let selectedMonth = month;
let selectedYear = year;

mth_element.textContent = months[month] + ' ' + year;
selected_date_element.textContent = formatDate(date);

populateDates();

//FUNCTIONS

this.onload = function ()
{
    if (navigator && navigator.serviceWorker)
    {
        navigator.serviceWorker.register('sw.js');
    }
}

//DATE PICKER

function populateDates(e){
    let amount_days = 0;

    switch(month){
        case 0:
            amount_days = 31;
            break;
        case 1:
            year % 4 == 0 ? amount_days = 29 : amount_days = 28;
            break;
        case 2:
            amount_days = 31;
            break;
        case 3:
            amount_days = 30;
            break;
        case 4:
            amount_days = 31;
            break;
        case 5:
            amount_days = 30;
            break;
        case 6:
            amount_days = 31;
            break;
        case 7:
            amount_days = 31;
            break;
        case 8:
            amount_days = 30;
            break;
        case 9:
            amount_days = 31;
            break;
        case 10:
            amount_days = 30;
            break;
        case 11:
            amount_days = 31;
            break;
        default:
            amount_days = 31;
            break;
    }
    days_element.innerHTML = '';
    for(let i = 0; i < amount_days; i++){        
        const day_element = document.createElement('div');
        day_element.classList.add('day');
        day_element.textContent = i + 1;

        if (selectedDay == (i + 1) && selectedYear == year && selectedMonth == month ){
            day_element.classList.add('selected');
        }

        day_element.addEventListener('click', function (){
            selectedDate = new Date(year + '-' + (month + 1) + '-' + (i+1));
            selectedDay = i + 1;
            selectedMonth = month;
            selectedYear = year;
            selected_date_element.textContent = formatDate(selectedDate);
            selected_date_element.dataset.value = selectedDate;
            populateDates();
        } )

        days_element.appendChild(day_element);
    }
}

function formatDate(d) {
    let day = d.getDate();
    if(day < 10){
        day = '0' + day;
    }
    let month = d.getMonth() + 1;
    if(month < 10){
        month = '0' + month;
    }
    let year = d.getFullYear();

    return day +'/' + month +'/' + year;
}

function toggleDatePicker (e) {
    if(!checkEventPathForClass(e.path, 'dates')){
        dates_element.classList.toggle('active');
    }
    
}

function goToNextMonth(e) {
    month++;
    if (month > 11){
        month = 0;
        year++;
    }
    mth_element.textContent = months[month] + ' ' + year;

    populateDates();
}

function goToPrevMonth(e) {
    month--;
    if (month < 0){
        month = 11;
        year--;
    }
    mth_element.textContent = months[month] + ' ' + year;

    populateDates();
}



// add a task
function addTask(e)
{
    e.preventDefault();
    const text = this.querySelector("[name=task]").value;
    
    const task =
    {
        date: selected_date_element.textContent,
        text: text,
    };               
    tasks.push(task);
    listtasks(tasks, tasksList);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    this.reset();
}

// list tasks
function listtasks(tasks = [], tasksList)
{
    tasksList.innerHTML = tasks.map((task, i) =>
    {
        return `
        <li>
<<<<<<< HEAD
=======
      <input type="checkbox" data-index=${i} id="task${i}" ${
          task.completed ? "checked" : ""
        } />
>>>>>>> 050768f75e6d5abac89fe797a9ffd72f74ad0e01
      <label for="task${i}"><span>{${task.date}
        }</span>&nbsp${task.text}</label>
        <button class="delete" data-index=${i} id="delete${i}"><i class="far fa-trash-alt"></i></button>
    </li>
       `; 
    }).join('');
}

// delete task
function deletetask(e)
{
    if (!e.target.matches("i")) return;
    const el = e.target;
    const index = el.dataset.index;
    console.log(index);
    tasks.splice(index, 1);
    listtasks(tasks, tasksList);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

//HELPER FUNCTIONS

function checkEventPathForClass(path, selector){
    for (let i = 0; i < path.length; i++){
        if(path[i].classList && path[i].classList.contains(selector)){
            return true;
        }
    }
    return false;
}

//EVENT LISTENERS
date_picker_element.addEventListener('click', toggleDatePicker);
next_mth_element.addEventListener('click', goToNextMonth);
prev_mth_element.addEventListener('click', goToPrevMonth);
addTasks.addEventListener('submit', addTask);
tasksList.addEventListener('click', deletetask);
listtasks(tasks, tasksList);
