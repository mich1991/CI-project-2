const daysOfTheWeekObjects = [
    {name: 'Monday', prefix: 'm'},
    {name: 'Tuesday', prefix: 't'},
    {name: 'Wednesday', prefix: 'w'},
    {name: 'Thursday', prefix: 'tr'},
    {name: 'Friday', prefix: 'f'},
    {name: 'Saturday', prefix: 'sa'},
    {name: 'Sunday', prefix: 'su'},
];
const domInputElementsSufix = ['-s-hours','-s-minutes','-e-hours','-e-minutes','-b-hours','-b-minutes','-total-hours'];
const daysOftheWeek = [];

daysOfTheWeekObjects.forEach(day => {
    let domElements = [];
    domInputElementsSufix.forEach(sufix => {
       domElements.push(document.querySelector(`#${day.prefix}${sufix}`))
    })
    daysOftheWeek[day.name] = domElements
})



const hoursCalculatorForm = document.querySelector('#hours-calculator')

const employeeName = document.querySelector('#employee')
const weekTotalHoursDOMel = document.querySelector('#week-total-hours');
// each day will append value to a specific index of array according to its inner weekArrayPosition property
let weekTotalHoursArray = [];
let employeeID = 0
let employeesArray = []
let employeeDisplayDOMel = document.querySelector('#employee-display')


//Day Class START =====
class Day {
    workHourStart;
    workMinuteStart;
    workHourEnd;
    workMinuteEnd;
    workHourBreak = 0
    workMinuteBreak = 0
    totalWorkTime;
    weekArrayPosition = 0
    static id = 0

    constructor(hourStart, minuteStart, hourEnd, minuteEnd, hourBreak, minuteBreak, total) {
        this.workHourStart = hourStart;
        this.workMinuteStart = minuteStart;
        this.workHourEnd = hourEnd;
        this.workMinuteEnd = minuteEnd;
        this.workHourBreak = hourBreak;
        this.workMinuteBreak = minuteBreak;
        this.totalWorkTime = total;
        this.weekArrayPosition = Day.id
        //Increment array position on each instance of class
        Day.id++
    }

    countDayShift(){
        let shiftDuration = 0;
        let startMinutes = (+this.workHourStart.value * 60) + +this.workMinuteStart.value;
        let endMinutes =  (+this.workHourEnd.value * 60) + +this.workMinuteEnd.value;
        let breakMinutes = (+this.workHourBreak.value * 60) + +this.workMinuteBreak.value;
        if (this.workHourStart.value !== '' && this.workHourEnd.value !== '' ){
            if (startMinutes > endMinutes) {
                let dayMaxMinutes = 24 * 60;
                shiftDuration = ((dayMaxMinutes - startMinutes + endMinutes - breakMinutes) / 60).toFixed(2)
            } else {
                shiftDuration = ((endMinutes - startMinutes - breakMinutes) / 60).toFixed(2);
            }
            this.totalWorkTime.innerText = shiftDuration;
            weekTotalHoursArray[this.weekArrayPosition] = +shiftDuration;
        } else {
            this.clearTotalHours()
            weekTotalHoursArray[this.weekArrayPosition] = 0;
        }
    }
    clearTotalHours(){
        this.totalWorkTime.innerText ='';
    }
    clearInputs(){
        this.workHourStart.value = '';
        this.workMinuteStart.value = '00';
        this.workHourEnd.value = '';
        this.workMinuteEnd.value = '00';
        this.workHourBreak.value = ''
        this.workMinuteBreak.value = '00';
        this.totalWorkTime.innerText = ''
    }
}
//Day Class START =====

const countWholeWeek = () => {
   weekTotalHoursDOMel.textContent = weekTotalHoursArray.reduce((a,c) => a + c, 0).toFixed(2)
}

function validateInput (input, maxValue, day) {
    // Stackoverflow solution
    // https://stackoverflow.com/questions/33299639/allow-only-2-numbers-on-input-type-number
    input.value = input.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');
    if(input.value > maxValue){
        input.classList.add('error')
        day.clearTotalHours();
    } else {
        input.classList.remove('error')
        day.countDayShift()
    }
    countWholeWeek()
}

function handleSubmit(e) {
    e.preventDefault();
    let name = employeeName.value
    let totalHours = weekTotalHoursArray.reduce((a,c) => a + c, 0)
    employeesArray.push({ id : employeeID, name, totalHours})
    employeeID++
    clearParentElement(employeeDisplayDOMel);
    employeesArray.forEach(employee => appendDivToDOM(employeeDisplayDOMel, employee));

}

hoursCalculatorForm.addEventListener('submit', handleSubmit)

function clearCalculator(){
    let hoursCalculator = [Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday];
    hoursCalculator.forEach(day => day.clearInputs());
    employeeName.value = '';
    weekTotalHoursArray = []
    weekTotalHoursDOMel.innerHTML = ''
}

const appendDivToDOM = (parentElement, content) => {
    let div = document.createElement('div');
    div.innerHTML = `<p>${content.name} - <strong>${content.totalHours} h </strong></p>  <a class="button" onclick="removeEmployee(${content.id})">delete</a>`;
    parentElement.append(div);
}

const clearParentElement = (parentElement) => {
    parentElement.innerHTML = ''
}
const removeEmployee = (id) => {
    clearParentElement(employeeDisplayDOMel)
    employeesArray = employeesArray.filter(employee => employee.id !== id);
    employeesArray.forEach(employee => appendDivToDOM(employeeDisplayDOMel, employee));
}

const Monday = new Day(...daysOftheWeek['Monday']);
const Tuesday = new Day(...daysOftheWeek['Tuesday']);
const Wednesday = new Day(...daysOftheWeek['Wednesday']);
const Thursday = new Day(...daysOftheWeek['Thursday']);
const Friday = new Day(...daysOftheWeek['Friday']);
const Saturday = new Day(...daysOftheWeek['Saturday']);
const Sunday = new Day(...daysOftheWeek['Sunday']);

