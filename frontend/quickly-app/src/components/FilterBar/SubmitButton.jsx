import { View, TouchableWithoutFeedback, Text } from "react-native"
import globalStyles from "../../globalStyles/globalStyles"
export default function SubmitButton({ onPress, styles }) {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
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

    )
}