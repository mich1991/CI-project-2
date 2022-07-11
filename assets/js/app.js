let mondayHoursStart = document.querySelector('#m-s-hours');
this.value = this.value.replace(/[^\d]/, '')
console.log(mondayHoursStart)
mondayHoursStart.addEventListener('change', () => {
    mondayHoursStart.value = mondayHoursStart.value.replace(/[^\d]/, '')
    console.log(mondayHoursStart.value)
})
function validateInput (input, maxValue) {
    input.value = input.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');
    if(input.value > maxValue){
        input.classList.add('error')
    } else {
        input.classList.remove('error')
    }
    console.log(input)
}

