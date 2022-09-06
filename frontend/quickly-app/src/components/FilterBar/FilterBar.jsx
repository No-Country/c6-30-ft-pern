import React, { useEffect, useState } from "react";
import { View, Text, TouchableWithoutFeedback, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";
import globalStyles from "../../globalStyles/globalStyles";
import { styles } from "./styles";

const url = "https://quickly-a.herokuapp.com";
const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
const FilterBar = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(null);
  const [provider, setProvider] = useState(null);
  const [providers, setProviders] = useState([])
  const [hours, setHours] = useState([])
  const [data, setData] = useState();
  const [time, setTime] = useState();
  const [date, setDate] = useState(new Date());
  const [text, setText] = useState("Selecciona una fecha");
  const [finalDate, setFinalDate] = useState(null)
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const { authData } = useAuth();

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };
  const handleCategoryChange = (selectedService) => {
    let filteredData = data.filter(k => k.category === selectedService)
    setCategory(selectedService)
    setProviders(filteredData)
  }

  const handleTimeChange = (selectedTime) => {
    let [sHour, sMinutes] = selectedTime.split(":").map(k => Number(k))
    let final = new Date(date)
    final.setHours(sHour)
    final.setMinutes(sMinutes)
    final.setSeconds(0)
    setFinalDate(final)
    setTime(selectedTime)
  }

  const onChange = (e, selectedDate) => {
    setShow(Platform.OS === "ios");
    let dayOfTheWeek = days[selectedDate.getDay()]
    let schedule = provider.Date[dayOfTheWeek]
    let ordersDates = provider.Orders.map(k => new Date(k.date).toString())
    let filteredSchedule = schedule.filter(k => {
      let [sHour, sMinutes] = k.split(":").map(k => Number(k))
      let compare = new Date(selectedDate)
      compare.setHours(sHour)
      compare.setMinutes(sMinutes)
      compare.setSeconds(0)
      return !ordersDates.includes(compare.toString())
    })

    let day = (`0${selectedDate.getDate()}`).slice(-2)
    let month = (`0${selectedDate.getMonth() + 1 }`).slice(-2)
    let year = selectedDate.getFullYear()
    setDate(selectedDate);
    setText(`${day}-${month}-${year}`)
    setHours(filteredSchedule);
  };

  const showAlert = () =>
    Alert.alert(
      "¿Estás seguro que deseas guardar el turno?",
      undefined,
      [
        {
          text: "Aceptar",
          onPress: async () => {
            try {
              const res = await axios.post(`${url}/api/order`, {
                client: authData.user,
                serviceId: provider.id,
                date: finalDate,
              });
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
    );

  useEffect(() => {
    axios.get(`${url}/api/service`).then((res) => {
      let uniqueList = new Set(res.data.payload.map(k => k.category))
      let categories = Array.from(uniqueList)
      setData(res.data.payload)
      setCategories(categories)
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Selecciona una categoría:</Text>
      <View style={styles.viewSelect}>
        <Picker
          style={styles.select}
          selectedValue={category}
          onValueChange={(itemValue, itemIndex) => handleCategoryChange(itemValue)}
        >
          <Picker.Item label={"Selecciona una categoría"} value={null} />
          {categories.map((el, index) => (
            <Picker.Item label={el} value={el} key={index} />
          ))}
        </Picker>
      </View>
      <Text style={styles.text}>Selecciona un profesional:</Text>
      <View style={styles.viewSelect}>
        <Picker
          style={styles.select}
          selectedValue={provider}
          enabled={category !== null}
          onValueChange={(itemValue, itemIndex, label) =>
            setProvider(itemValue)
          }
        >
          <Picker.Item
            style={styles.viewSelect}
            label={"Selecciona un especialista"}
            value={undefined}
          />
          {providers.map((el, index) => (
            <Picker.Item
              label={el.name}
              key={`provider${index}`}
              value={el}
            />
          ))}
        </Picker>
      </View>
      <Text style={styles.text}>Selecciona una fecha del calendario:</Text>
      <View style={styles.selectCalendar}>
        <Text style={styles.textCalendar} onPress={() => showMode("date")}>
          {text}
        </Text>
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          mode={mode}
          is24Hour
          display="default"
          minimumDate={new Date()}
          value={date}
          onChange={onChange}
        />
      )}
      <Text style={styles.text}>Selecciona un horario:</Text>
      <View style={styles.viewSelect}>
        <Picker
          style={styles.select}
          selectedValue={time}
          enabled={provider !== null}
          onValueChange={(itemValue) => handleTimeChange(itemValue)}
        >
          <Picker.Item label={"Selecciona un horario"} value={null} />
          {hours.map((hour, index) => (
            <Picker.Item value={hour} label={hour} key={`date${index}`} />
          ))}
        </Picker>
      </View>
      <TouchableWithoutFeedback onPress={showAlert}>
        <View
          style={[
            globalStyles.button,
            globalStyles.normalButton,
            styles.appointmentButtonView,
          ]}
        >
          <Text style={[globalStyles.textButton, styles.appointmentButton]}>
            + Nuevo turno
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default FilterBar;
