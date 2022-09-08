import DateTimePicker from "@react-native-community/datetimepicker";
import { View, Text } from "react-native";
export default function DatePicker({ styles, dateText, show, showMode, value, mode, onChange }) {
    return (
        <View>
            <Text style={styles.text}>Selecciona una fecha del calendario:</Text>
            <View style={styles.selectCalendar}>
                <Text style={styles.textCalendar} onPress={() => showMode("date")}>
                    {dateText}
                </Text>
            </View>
            {show && <DateTimePicker
                testID="dateTimePicker"
                mode={mode}
                is24Hour
                display="default"
                minimumDate={new Date()}
                value={value}
                onChange={onChange}
            />}
        </View>
    )
}