import axios from "axios";
import { Alert } from 'react-native'
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

export const showAlert = ({ navigation, data }) => {
    Alert.alert(
        "¿Estás seguro que deseas guardar el turno?",
        undefined,
        [
            {
                text: "Aceptar",
                onPress: async () => {
                    try {
                        const res = await axios.post(`${url}/api/order`, data);
                        Alert.alert("¡Turno agendado!", undefined, [
                            {
                                text: "Aceptar",
                                onPress: () =>
                                    navigation.navigate("HomeUser", { newTurn: "created" }),
                            },
                        ]);
                    } catch (error) {
                        console.log(error.response.data)
                        Alert.alert("Este horario ya fue seleccionado", undefined, [
                            {
                                text: "Aceptar",
                            },
                        ]);
                    }
                },
            },

            {
                text: "Cancelar",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
            },
        ],
        {
            cancelable: true,
            onDismiss: () =>
                console.log(
                    "This alert was dismissed by tapping outside of the alert dialog."
                ),
        }
    )
};

