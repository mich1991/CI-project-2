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

const daysOftheWeek = {};

daysOfTheWeekObjects.forEach(day => {
    let domElements = [];
    domElements.push(document.querySelector(`#${day.name}`))
    domInputElementsSufix.forEach(sufix => {
       domElements.push(document.querySelector(`#${day.prefix}${sufix}`))
    })
    daysOftheWeek[day.name] = domElements;
})
console.log(daysOftheWeek);
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
    static id = 0;

    constructor(dayContainer, hourStartEl, minuteStartEl, hourEndEl, minuteEndEl, hourBreakEl, minuteBreakEl, totalEl) {
        this.dayContainer = dayContainer;
        this.workHourStart = hourStartEl;
        this.workMinuteStart = minuteStartEl;
        this.workHourEnd = hourEndEl;
        this.workMinuteEnd = minuteEndEl;
        this.workHourBreak = hourBreakEl;
        this.workMinuteBreak = minuteBreakEl;
        this.totalWorkTime = totalEl;
        this.weekArrayPosition = Day.id
        //Increment array position on each instance of class
        Day.id++;
        this.dayContainer.addEventListener('input' , () => {
            const inputsArray = [this.workHourStart, this.workMinuteStart, this.workHourEnd, this.workMinuteEnd, this.workHourBreak, this.workMinuteBreak]
            inputsArray.forEach(input => this.validateInput(input))
        })
    }

    countDayShift(){
        let shiftDuration = 0;
        let startMinutes = (+this.workHourStart.value * 60) + +this.workMinuteStart.value;
        let endMinutes =  (+this.workHourEnd.value * 60) + +this.workMinuteEnd.value;
        let breakMinutes = (+this.workHourBreak.value * 60) + +this.workMinuteBreak.value;
        if (this.workHourStart.value !== '' && this.workHourEnd.value !== '' ){
            if (startMinutes > endMinutes) {
                let dayMaxMinutes = 24 * 60;
                shiftDuration = ((dayMaxMinutes - startMinutes + endMinutes - breakMinutes) / 60).toFixed(2);
            } else {
                shiftDuration = ((endMinutes - startMinutes - breakMinutes) / 60).toFixed(2);
            }
            if (shiftDuration < 0) shiftDuration = '0.00';
            this.totalWorkTime.innerText = shiftDuration;
            weekTotalHoursArray[this.weekArrayPosition] = +shiftDuration;
        } else {
            this.clearShiftHours();
            weekTotalHoursArray[this.weekArrayPosition] = 0;
        }
    }
    clearShiftHours(){
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
    validateInput (input) {
        const maxValue = +input.dataset.valid
        // Stackoverflow solution
        // https://stackoverflow.com/questions/33299639/allow-only-2-numbers-on-input-type-number
        input.value = input.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');
        if(input.value > maxValue){
            input.classList.add('error');
            this.clearShiftHours();
        } else {
            input.classList.remove('error');
            this.countDayShift();
        }
    }
}
//Day Class END =====
// HoursCalculator Class START =====
class HoursCalculator{


}
// HoursCalculator Class END ====

const countWholeWeek = () => {
   weekTotalHoursDOMel.textContent = weekTotalHoursArray.reduce((a,c) => a + c, 0).toFixed(2);
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
    clearParentElement(employeeDisplayDOMel);
    employeesArray = employeesArray.filter(employee => employee.id !== id);
    employeesArray.forEach(employee => appendDivToDOM(employeeDisplayDOMel, employee));
}
// const validateDay = (dayEl) => {
//     const allInputsEl = dayEl.querySelectorAll('input')
//     allInputsEl.forEach(input => console.log(input.dataset.valid))
// }

const Monday = new Day(...daysOftheWeek['Monday']);
const Tuesday = new Day(...daysOftheWeek['Tuesday']);
const Wednesday = new Day(...daysOftheWeek['Wednesday']);
const Thursday = new Day(...daysOftheWeek['Thursday']);
const Friday = new Day(...daysOftheWeek['Friday']);
const Saturday = new Day(...daysOftheWeek['Saturday']);
const Sunday = new Day(...daysOftheWeek['Sunday']);
