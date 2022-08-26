import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList, Alert } from "react-native";
/* import RNPickerSelect from "react-native-picker-select"; */
import Calendar from "../Calendar/Calendar";
import axios from "axios";
import globalStyles from "../../globalStyles/globalStyles";
import { Picker } from "@react-native-picker/picker";

const FilterBar = ({ navigation }) => {
  const [category, setCategories] = useState("");
  const [provider, setProvider] = useState("");
  const [usuarios, setUsuarios] = useState();
  const [data, setData] = useState();

  useEffect(() => {
    axios.get("https://quickly-a.herokuapp.com/api/service").then((res) => {
      setData(res.data.payload.map((el) => el.category));
    });
  }, []);

  useEffect(() => {
    axios.get("https://quickly-a.herokuapp.com/api/provider").then((res) => {
      setUsuarios(res.data.payload);
    });
    console.log(usuarios, "esto es usuarios");
  }, []);

  const categFiltered = data?.filter((item, index) => {
    return data.indexOf(item) === index;
  });

  const showAlert = () =>
    Alert.alert(
      "Estás seguro que deseas guardar el turno?",
      undefined,
      [
        {
          text: "Accept",
          onPress: () => Alert.alert("Turno agendado!"),
          style: "cancel",
        },
        {
          text: "Cancel",
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
    <View>
      <Picker
        selectedValue={category}
        onValueChange={(itemValue, itemIndex) => setCategories(itemValue)}
      >
        <Picker.Item label={"Selecciona una categoría"} value={null} />
        {categFiltered?.map((el, index) => (
          <Picker.Item label={el} value={el} key={index} />
        ))}
      </Picker>
      <Picker
        selectedValue={provider}
        onValueChange={(itemValue, itemIndex) => setProvider(itemValue)}
      >
        <Picker.Item label={"Selecciona un especialista"} value={undefined} />
        {!category ? (
          <Picker.Item label={""} value={null} />
        ) : (
          usuarios
            ?.filter((el) =>
              el.Services.map((a) => a.category).includes(category)
            )
            .map((el, index) => (
              <Picker.Item label={el.user} value={el.user} key={index} />
            ))
        )}
      </Picker>
      <Text>{provider}</Text>
      <Text>Selecciona la fecha:</Text>
      <Calendar />
      <View style={[globalStyles.button, globalStyles.normalButton]}>
        <Text onPress={showAlert} style={globalStyles.textButton}>
          + Guardar turno
        </Text>
      </View>
    </View>
  );
};

export default FilterBar;
