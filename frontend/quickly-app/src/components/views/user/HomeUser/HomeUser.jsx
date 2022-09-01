import { StatusBar, Text, TouchableHighlight, View, } from "react-native";
// Styles
import globalStyles from "../../../../globalStyles/globalStyles";
import { theme } from "../../../../globalStyles/theme";


const HomeUser = ({navigation}) => {
  return (
    <View style={globalStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.secondary}/>
      <Text>Foto de perfil</Text>
      <Text>Nombre y Apellido</Text>
      <TouchableHighlight onPress={() => navigation.navigate('Turns')}>
          <Text>Pedir turno</Text>
      </TouchableHighlight>
    </View>
  );
};

export default HomeUser;
