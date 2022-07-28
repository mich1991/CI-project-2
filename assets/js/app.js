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

//Day Class START =====
class Day {
    constructor(dayContainer, hourStartEl, minuteStartEl, hourEndEl, minuteEndEl, hourBreakEl, minuteBreakEl, totalEl) {
        this.dayContainer = dayContainer;
        this.workHourStart = hourStartEl;
        this.workMinuteStart = minuteStartEl;
        this.workHourEnd = hourEndEl;
        this.workMinuteEnd = minuteEndEl;
        this.workHourBreak = hourBreakEl;
        this.workMinuteBreak = minuteBreakEl;
        this.totalWorkTime = totalEl;
        //Increment array position on each instance of class
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
            return +shiftDuration;
        } else {
            this.clearShiftHours();
            return 0;
        }
    }
    clearShiftHours(){
        console.log('clean')
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
    hoursCalculatorForm = document.querySelector('#hours-calculator')
    weekTotalHoursDOMel = document.querySelector('#week-total-hours');
    employeeID = 0
    employeesArray = []
    employeeDisplayDOMel = document.querySelector('#employee-display')
    employeeName = document.querySelector('#employee')


    constructor(monday,tuesday,wednesday,thursday,friday,saturday,sunday) {
        this.Monday=monday
        this.Tuesday=tuesday
        this.Wednesday=wednesday
        this.Thursday=thursday
        this.Friday=friday
        this.Saturday=saturday
        this.Sunday=sunday
        this.daysArray = [this.Monday, this.Tuesday, this.Wednesday, this.Thursday, this.Friday, this.Saturday, this.Sunday];

        this.hoursCalculatorForm.addEventListener('submit', this.handleSubmit.bind(this))
        this.hoursCalculatorForm.addEventListener('input', () => this.weekTotalHoursDOMel.textContent = this.countWholeWeek())
    }

    countWholeWeek = () => {
        return this.daysArray.map(day => day.countDayShift()).reduce((a,c) => a + c, 0).toFixed(2);
    }


    handleSubmit(e) {
        e.preventDefault();
        let name = this.employeeName.value
        let totalHours = this.countWholeWeek()
        this.employeesArray.push({ id : this.employeeID, name, totalHours})
        this.employeeID++
        this.clearParentElement(this.employeeDisplayDOMel);
        this.employeesArray.forEach(employee => this.appendDivToDOM(this.employeeDisplayDOMel, employee));
    }


    clearCalculator(){
        let days = [this.Monday, this.Tuesday, this.Wednesday, this.Thursday, this.Friday, this.Saturday, this.Sunday];
        days.forEach(day => day.clearInputs());
        this.employeeName.value = '';
        this.weekTotalHoursDOMel.innerHTML = ''
    }

    appendDivToDOM = (parentElement, content) => {
        let div = document.createElement('div');
        div.innerHTML = `<p>${content.name} - <strong>${content.totalHours} h </strong></p>  <a class="button" onclick="hoursCalculator.removeEmployee(${content.id})">delete</a>`;
        parentElement.append(div);
    }

    clearParentElement = (parentElement) => {
        parentElement.innerHTML = ''
    }
    removeEmployee = (id) => {
        this.clearParentElement(this.employeeDisplayDOMel);
        this.employeesArray = this.employeesArray.filter(employee => employee.id !== id);
        this.employeesArray.forEach(employee => this.appendDivToDOM(this.employeeDisplayDOMel, employee));
    }
}
// HoursCalculator Class END ====

const Monday = new Day(...daysOftheWeek['Monday']);
const Tuesday = new Day(...daysOftheWeek['Tuesday']);
const Wednesday = new Day(...daysOftheWeek['Wednesday']);
const Thursday = new Day(...daysOftheWeek['Thursday']);
const Friday = new Day(...daysOftheWeek['Friday']);
const Saturday = new Day(...daysOftheWeek['Saturday']);
const Sunday = new Day(...daysOftheWeek['Sunday']);
const hoursCalculator = new HoursCalculator(Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday)
