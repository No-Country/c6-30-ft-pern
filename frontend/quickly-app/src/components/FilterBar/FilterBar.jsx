import { View, Text, TouchableWithoutFeedback, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";
import globalStyles from "../../globalStyles/globalStyles";
import { styles } from "./styles";
import { useCategories, useDate, useMode, useTime } from "./hooks";
import DatePicker from "./DatePicker";

const url = "https://quickly-a.herokuapp.com";

const FilterBar = ({ navigation }) => {
  const { categories, pickedCategory, updateCategory, provider, providers, setProvider } = useCategories()
  const { date, dateText, finalDate, updateDate } = useDate()
  const { schedule, pickedTime, setPickedTime, updateSchedule } = useTime(provider, date)
  const { mode, show, setShow, showMode } = useMode()
  const { authData } = useAuth();

  const handleCategoryChange = (selectedService) => {
    updateCategory(selectedService)
  }

  const handleTimeChange = (selectedTime) => {
    let [sHour, sMinutes] = selectedTime.split(":").map(k => Number(k))
    let final = new Date(date)
    final.setHours(sHour)
    final.setMinutes(sMinutes)
    final.setSeconds(0)
    updateDate(final)
    setPickedTime(selectedTime)

  }

  const onChange = (e, selectedDate) => {
    setShow(Platform.OS === "ios");
    updateDate(selectedDate)
    updateSchedule(selectedDate);
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


  return (
    <View style={styles.container}>
      <Text style={styles.text}>Selecciona una categoría:</Text>
      <View style={styles.viewSelect}>
        <Picker
          style={styles.select}
          selectedValue={pickedCategory}
          onValueChange={handleCategoryChange}
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
          enabled={pickedCategory !== null}
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
          {dateText}
        </Text>
      </View>
      <DatePicker
        show={show}
        value={date}
        mode={mode}
        onChange={onChange}
      />
      <Text style={styles.text}>Selecciona un horario:</Text>
      <View style={styles.viewSelect}>
        <Picker
          style={styles.select}
          selectedValue={pickedTime}
          enabled={provider !== null}
          onValueChange={(itemValue) => handleTimeChange(itemValue)}
        >
          <Picker.Item label={"Selecciona un horario"} value={null} />
          {schedule.map((hour, index) => (
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
