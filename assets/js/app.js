//Monday
const mondayHoursStart = document.querySelector('#m-s-hours');
const mondayMinutesStart = document.querySelector('#m-s-minutes');
const mondayHoursEnd = document.querySelector('#m-e-hours');
const mondayMinutesEnd = document.querySelector('#m-e-minutes');
const mondayHoursBreak = document.querySelector('#m-b-hours');
const mondayMinutesBreak = document.querySelector('#m-b-minutes');
const mondayTotalHours = document.querySelector('#m-total-hours');
// Tuesday
const tuesdayHoursStart = document.querySelector('#t-s-hours');
const tuesdayMinutesStart = document.querySelector('#t-s-minutes');
const tuesdayHoursEnd = document.querySelector('#t-e-hours');
const tuesdayMinutesEnd = document.querySelector('#t-e-minutes');
const tuesdayHoursBreak = document.querySelector('#t-b-hours');
const tuesdayMinutesBreak = document.querySelector('#t-b-minutes');
const tuesdayTotalHours = document.querySelector('#t-total-hours');

// Wednesday
const wednesdayHoursStart = document.querySelector('#w-s-hours');
const wednesdayMinutesStart = document.querySelector('#w-s-minutes');
const wednesdayHoursEnd = document.querySelector('#w-e-hours');
const wednesdayMinutesEnd = document.querySelector('#w-e-minutes');
const wednesdayHoursBreak = document.querySelector('#w-b-hours');
const wednesdayMinutesBreak = document.querySelector('#w-b-minutes');
const wednesdayTotalHours = document.querySelector('#w-total-hours');

// Thursday
const thursdayHoursStart = document.querySelector('#tr-s-hours');
const thursdayMinutesStart = document.querySelector('#tr-s-minutes');
const thursdayHoursEnd = document.querySelector('#tr-e-hours');
const thursdayMinutesEnd = document.querySelector('#tr-e-minutes');
const thursdayHoursBreak = document.querySelector('#tr-b-hours');
const thursdayMinutesBreak = document.querySelector('#tr-b-minutes');
const thursdayTotalHours = document.querySelector('#tr-total-hours');

// Friday
const fridayHoursStart = document.querySelector('#f-s-hours');
const fridayMinutesStart = document.querySelector('#f-s-minutes');
const fridayHoursEnd = document.querySelector('#f-e-hours');
const fridayMinutesEnd = document.querySelector('#f-e-minutes');
const fridayHoursBreak = document.querySelector('#f-b-hours');
const fridayMinutesBreak = document.querySelector('#f-b-minutes');
const fridayTotalHours = document.querySelector('#f-total-hours');

// Saturday
const saturdayHoursStart = document.querySelector('#sa-s-hours');
const saturdayMinutesStart = document.querySelector('#sa-s-minutes');
const saturdayHoursEnd = document.querySelector('#sa-e-hours');
const saturdayMinutesEnd = document.querySelector('#sa-e-minutes');
const saturdayHoursBreak = document.querySelector('#sa-b-hours');
const saturdayMinutesBreak = document.querySelector('#sa-b-minutes');
const saturdayTotalHours = document.querySelector('#sa-total-hours');

// Sunday
const sundayHoursStart = document.querySelector('#su-s-hours');
const sundayMinutesStart = document.querySelector('#su-s-minutes');
const sundayHoursEnd = document.querySelector('#su-e-hours');
const sundayMinutesEnd = document.querySelector('#su-e-minutes');
const sundayHoursBreak = document.querySelector('#su-b-hours');
const sundayMinutesBreak = document.querySelector('#su-b-minutes');
const sundayTotalHours = document.querySelector('#su-total-hours');


class Day {
    workHourStart;
    workMinuteStart;
    workHourEnd;
    workMinuteEnd;
    workHourBreak = 0
    workMinuteBreak = 0
    totalWorkTime;

    constructor(name, hourStart, minuteStart, hourEnd, minuteEnd, hourBreak, minuteBreak, total) {
        this.name = name;
        this.workHourStart = hourStart;
        this.workMinuteStart = minuteStart;
        this.workHourEnd = hourEnd;
        this.workMinuteEnd = minuteEnd;
        this.workHourBreak = hourBreak;
        this.workMinuteBreak = minuteBreak;
        this.totalWorkTime = total;
    }

    countDayShift(){
        let result = 0;
        let startMinutes = (+this.workHourStart.value * 60) + +this.workMinuteStart.value;
        let endMinutes = (+this.workHourEnd.value * 60) + +this.workMinuteEnd.value;
        let breakMinutes = (+this.workHourBreak.value * 60) + +this.workMinuteBreak.value;
        if (startMinutes > 0 && endMinutes > 0){
            if (startMinutes > endMinutes) {
                let dayMaxMinutes = 24 * 60;
                result = ((dayMaxMinutes - startMinutes + endMinutes - breakMinutes) / 60).toFixed(2)
            } else {
                result = ((endMinutes - startMinutes - breakMinutes) / 60).toFixed(2);
            }
            this.totalWorkTime.innerText = result;
            return result
        }

    }

}

const Monday = new Day('monday', mondayHoursStart, mondayMinutesStart, mondayHoursEnd, mondayMinutesEnd, mondayHoursBreak, mondayMinutesBreak, mondayTotalHours)
const Tuesday = new Day()


function validateInput (input, maxValue, day) {
    // Stackoverflow solution
    // https://stackoverflow.com/questions/33299639/allow-only-2-numbers-on-input-type-number
    // this.value = this.value.replace(/[^\d]/, '')
    input.value = input.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');
    if(input.value > maxValue){
        input.classList.add('error')
    } else {
        input.classList.remove('error')
        day.countDayShift()
    }

    console.log(input)
}

