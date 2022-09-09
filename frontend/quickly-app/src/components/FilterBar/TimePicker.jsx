import { View, Text } from "react-native"
import { Picker } from "@react-native-picker/picker";

export default function TimePicker({styles, time, enabled, onChange, schedule}) {
    return (
        <View>
            <Text style={styles.text}>Selecciona un horario:</Text>
            <View style={styles.viewSelect}>
                <Picker
                    style={styles.select}
                    selectedValue={time}
                    enabled={enabled}
                    onValueChange={onChange}
                >
                    <Picker.Item label={"Selecciona un horario"} value={null} />
                    {schedule.map((hour, index) => (
                        <Picker.Item value={hour} label={hour} key={`date${index}`} />
                    ))}
                </Picker>
            </View>
        </View>
    )
}