export const url = "https://quickly-a.herokuapp.com";
export const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
export const defaultText = "Selecciona una fecha"
export const buildDate = dateObject => {
    let day = (`0${dateObject.getDate()}`).slice(-2)
    let month = (`0${dateObject.getMonth() + 1}`).slice(-2)
    let year = dateObject.getFullYear()
    return `${day}-${month}-${year}`
}
export const availabilityFilter = (scheduleElement, selectedDate, datesArray) => {
    let [sHour, sMinutes] = scheduleElement.split(":").map(el => Number(el))
    let compare = new Date(selectedDate)
    compare.setHours(sHour)
    compare.setMinutes(sMinutes)
    compare.setSeconds(0)
    return !datesArray.includes(compare.toString())
}

export const filterSchedule = (schedule, selectedDate, datesArray) => {
    if (schedule instanceof Array) return schedule.filter(el => availabilityFilter(el, selectedDate, datesArray))
    else return []
   
}
