//Monday
const mondayStartHours = document.querySelector('#m-s-hours');
const mondayStartMinutes = document.querySelector('#m-s-minutes');
const mondayEndHours = document.querySelector('#m-e-hours');
const mondayEndMinutes = document.querySelector('#m-e-minutes');
const mondayBreakHours = document.querySelector('#m-b-hours');
const mondayBreakMinutes = document.querySelector('#m-b-minutes');
const mondayTotalHours = document.querySelector('#m-total-hours');
// Tuesday
const tuesdayStartHours = document.querySelector('#t-s-hours');
const tuesdayStartMinutes = document.querySelector('#t-s-minutes');
const tuesdayEndHours = document.querySelector('#t-e-hours');
const tuesdayEndMinutes = document.querySelector('#t-e-minutes');
const tuesdayBreakHours = document.querySelector('#t-b-hours');
const tuesdayBreakMinutes = document.querySelector('#t-b-minutes');
const tuesdayTotalHours = document.querySelector('#t-total-hours');

// Wednesday
const wednesdayStartHours = document.querySelector('#w-s-hours');
const wednesdayStartMinutes = document.querySelector('#w-s-minutes');
const wednesdayEndHours = document.querySelector('#w-e-hours');
const wednesdayEndMinutes = document.querySelector('#w-e-minutes');
const wednesdayBreakHours = document.querySelector('#w-b-hours');
const wednesdayBreakMinutes = document.querySelector('#w-b-minutes');
const wednesdayTotalHours = document.querySelector('#w-total-hours');

// Thursday
const thursdayStartHours = document.querySelector('#tr-s-hours');
const thursdayStartMinutes = document.querySelector('#tr-s-minutes');
const thursdayEndHours = document.querySelector('#tr-e-hours');
const thursdayEndMinutes = document.querySelector('#tr-e-minutes');
const thursdayBreakHours = document.querySelector('#tr-b-hours');
const thursdayBreakMinutes = document.querySelector('#tr-b-minutes');
const thursdayTotalHours = document.querySelector('#tr-total-hours');

// Friday
const fridayStartHours = document.querySelector('#f-s-hours');
const fridayStartMinutes = document.querySelector('#f-s-minutes');
const fridayEndHours = document.querySelector('#f-e-hours');
const fridayEndMinutes = document.querySelector('#f-e-minutes');
const fridayBreakHours = document.querySelector('#f-b-hours');
const fridayBreakMinutes = document.querySelector('#f-b-minutes');
const fridayTotalHours = document.querySelector('#f-total-hours');

// Saturday
const saturdayStartHours = document.querySelector('#sa-s-hours');
const saturdayStartMinutes = document.querySelector('#sa-s-minutes');
const saturdayEndHours = document.querySelector('#sa-e-hours');
const saturdayEndMinutes = document.querySelector('#sa-e-minutes');
const saturdayBreakHours = document.querySelector('#sa-b-hours');
const saturdayBreakMinutes = document.querySelector('#sa-b-minutes');
const saturdayTotalHours = document.querySelector('#sa-total-hours');

// Sunday
const sundayStartHours = document.querySelector('#su-s-hours');
const sundayStartMinutes = document.querySelector('#su-s-minutes');
const sundayEndHours = document.querySelector('#su-e-hours');
const sundayEndMinutes = document.querySelector('#su-e-minutes');
const sundayBreakHours = document.querySelector('#su-b-hours');
const sundayBreakMinutes = document.querySelector('#su-b-minutes');
const sundayTotalHours = document.querySelector('#su-total-hours');

const weekTotalHoursDOMel = document.querySelector('#week-total-hours');
// each day will append value to a specific index of array according to its inner weekArrayPosition property
const weekTotalHoursArray = [];



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



const Monday = new Day( mondayStartHours, mondayStartMinutes, mondayEndHours, mondayEndMinutes, mondayBreakHours, mondayBreakMinutes, mondayTotalHours)
const Tuesday = new Day( tuesdayStartHours, tuesdayStartMinutes, tuesdayEndHours, tuesdayEndMinutes, tuesdayBreakHours, tuesdayBreakMinutes, tuesdayTotalHours )
const Wednesday = new Day( wednesdayStartHours, wednesdayStartMinutes, wednesdayEndHours, wednesdayEndMinutes, wednesdayBreakHours, wednesdayBreakMinutes, wednesdayTotalHours )
const Thursday = new Day( thursdayStartHours, thursdayStartMinutes, thursdayEndHours, thursdayEndMinutes, thursdayBreakHours, thursdayBreakMinutes, thursdayTotalHours )
const Friday = new Day( fridayStartHours, fridayStartMinutes, fridayEndHours, fridayEndMinutes, fridayBreakHours, fridayBreakMinutes, fridayTotalHours )
const Saturday = new Day( saturdayStartHours, saturdayStartMinutes, saturdayEndHours, saturdayEndMinutes, saturdayBreakHours, saturdayBreakMinutes, saturdayTotalHours )
const Sunday = new Day( sundayStartHours, sundayStartMinutes, sundayEndHours, sundayEndMinutes, sundayBreakHours, sundayBreakMinutes, sundayTotalHours )


