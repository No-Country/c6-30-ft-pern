import { View, } from "react-native";
import { useAuth } from "../../hooks/useAuth";
import { styles } from "./styles";
import { useCategories, useDate, useMode, useTime } from "./hooks";
import { showAlert } from "./helpers";
import DatePicker from "./DatePicker";
import CategoryPicker from "./CategoryPicker";
import ProviderPicker from "./ProviderPicker";
import TimePicker from "./TimePicker";
import SubmitButton from "./SubmitButton";

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

  const handleSubmit = () => showAlert({
    navigation,
    data: {
      client: authData.user,
      serviceId: provider.id,
      date: finalDate,
    }
  })

  const onChange = (e, selectedDate) => {
    setShow(Platform.OS === "ios");
    updateDate(selectedDate)
    updateSchedule(selectedDate);
  };

  return (
    <View style={styles.container}>
      <CategoryPicker
        category={pickedCategory}
        categories={categories}
        onChange={handleCategoryChange}
        styles={styles}
      />
      <ProviderPicker
        enabled={pickedCategory !== null}
        provider={provider}
        providers={providers}
        onChange={setProvider}
        styles={styles}
      />
      <DatePicker
        dateText={dateText}
        styles={styles}
        show={show}
        showMode={showMode}
        value={date}
        mode={mode}
        onChange={onChange}
      />
      <TimePicker
        styles={styles}
        time={pickedTime}
        enabled={provider !== null}
        onChange={handleTimeChange}
        schedule={schedule}
      />
      <SubmitButton
        onPress={handleSubmit}
        styles={styles}
      />
    </View>
  );
};

export default FilterBar;
