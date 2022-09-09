import { View, Text } from "react-native"
import { Picker } from "@react-native-picker/picker";
export default function CategoryPicker({ category, categories, styles, onChange }) {
    return (
        <View>
            <Text style={styles.text}>Selecciona una categoría:</Text>
            <View style={styles.viewSelect}>
                <Picker
                    style={styles.select}
                    selectedValue={category}
                    onValueChange={onChange}
                >
                    <Picker.Item label={"Selecciona una categoría"} value={null} />
                    {categories.map((el, index) => (
                        <Picker.Item label={el} value={el} key={`category${index}`} />
                    ))}
                </Picker>
            </View>
        </View>
    )
}
