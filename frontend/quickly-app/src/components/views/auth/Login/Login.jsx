import { useState } from "react";
import { useAuth } from "../../../../hooks/useAuth";
import {
  TouchableHighlight,
  View,
  Text,
  ImageBackground,
  Image,
  StatusBar,
  ScrollView,
  Alert,
} from "react-native";
import { TextInput } from "react-native-paper";

import { CheckBox } from "../../../CheckBox/CheckBox";
import { theme } from "../../../../globalStyles/theme";
import style from "./style";
import globalStyles from "../../../../globalStyles/globalStyles";

export const Login = ({ navigation }) => {
  let [user, setUser] = useState("");
  let [password, setPassword] = useState("");

  const [check, setCheck] = useState(false);

  const [passwordVisible, setPasswordVisible] = useState(true);

  const auth = useAuth();

  const handleCheckBox = () => {
    setCheck(!check);
  };

  const handleLogin = async () => {
    if ([user, password].includes("")) {
      Alert.alert(
        "Datos incorrectos",
        "Proba ingresando las credenciales correctas",
        [
          {
            text: "Entiendo",
          },
        ]
      );
      return;
    }

    auth.signIn(user, password);
    setUser("");
    setPassword("");
  };

  return (
    <ImageBackground
      source={require("../../../../../assets/templates/TemplateLogin.png")}
      resizeMode="cover"
      style={style.image}
    >
      <ScrollView>
        <StatusBar
          barStyle="light-content"
          backgroundColor={theme.colors.secondary}
        />
        <View style={style.container}>
          <Image
            source={require("../../../../../assets/logo-quickly.png")}
            style={style.logo}
            resizeMode="center"
          />
          <View style={style.marginX}>
            <Text style={style.inputContainer}>Ingresa tu usuario</Text>
            <TextInput
              mode="outlined"
              placeholder="Ingresa tu usuario"
              onChangeText={(user) => setUser(user)}
              value={user}
              right={<TextInput.Affix text="/100" />}
            />
          </View>
          <View style={style.marginX}>
            <Text style={style.inputContainer}>Ingresa tu contraseña</Text>
            <TextInput
              mode="outlined"
              placeholder="Ingresa tu contraseña"
              onChangeText={(pw) => setPassword(pw)}
              value={password}
              secureTextEntry={passwordVisible}
              right={
                <TextInput.Icon
                  onPress={() => setPasswordVisible(!passwordVisible)}
                  name={passwordVisible ? "eye" : "eye-off"}
                />
              }
            />
          </View>
          <View style={[style.marginY, style.direction]}>
            <CheckBox
              children={"Recordame"}
              value={check}
              handleChange={handleCheckBox}
            />
            <TouchableHighlight
              onPress={() => navigation.navigate("ForgetPassword")}
            >
              <Text style={style.textRecuperatePassword}>
                ¿Olvidaste tu contraseña?
              </Text>
            </TouchableHighlight>
          </View>
          <View style={[style.marginX, globalStyles.normalButton]}>
            <TouchableHighlight
              onPress={handleLogin}
              style={globalStyles.button}
            >
              <Text style={globalStyles.textButton}>Ingresar</Text>
            </TouchableHighlight>
          </View>
          <View style={[style.marginX, style.line]}>
            <View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
            <View>
              <Text style={{ width: 30, textAlign: "center" }}>O</Text>
            </View>
            <View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
          </View>
          <View style={style.direction}>
            <Text>¿Aún no tienes cuenta?</Text>
            <TouchableHighlight
              onPress={() => navigation.navigate("ProviderOrClient")}
            >
              <Text style={style.textRegister}>Súmate!</Text>
            </TouchableHighlight>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default Login;

/* <Text>
            <AntDesign name="star" style={{ color: "green", fontSize: 20 }} />
    </Text> */
