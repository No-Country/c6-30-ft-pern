import { View, Text } from "react-native"
import { Picker } from "@react-native-picker/picker";
export default function ProviderPicker({enabled, styles, provider, onChange, providers}) {
    return (
        <View>
            <Text style={styles.text}>Selecciona un profesional:</Text>
            <View style={styles.viewSelect}>
                <Picker
                    style={styles.select}
                    selectedValue={provider}
                    enabled={enabled}
                    onValueChange={onChange}
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
        </View>
    )
}