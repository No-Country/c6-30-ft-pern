import { View, Text } from "react-native";
import styles from "./styles";

const Alert = ({ alert }) => {
  return (
    <View>
      <Text style={`${alert.error ? styles.msgError : styles.msgSuccessful}`}>
        {alert.msg}
      </Text>
    </View>
  );
};

export default Alert;
