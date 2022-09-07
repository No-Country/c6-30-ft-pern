import DateTimePicker from "@react-native-community/datetimepicker";
import { View } from "react-native";
export default function DatePicker({ show, value, mode, onChange }) {
    if (!show) return <View></View>
    else return (
        <DateTimePicker
            testID="dateTimePicker"
            mode={mode}
            is24Hour
            display="default"
            minimumDate={new Date()}
            value={value}
            onChange={onChange}
        />
    )
}