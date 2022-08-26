import { useState } from "react";
import {
  ImageBackground,
  ScrollView,
  Text,
  View,
  StatusBar,
  Image,
  TouchableHighlight,
} from "react-native";
import { TextInput } from "react-native-paper";
import Alert from "../../../Alert/Alert";
import styles from "./styles";
import { theme } from "../../../../globalStyles/theme";
import globalStyles from "../../../../globalStyles/globalStyles";

const Register = ({ navigation }) => {
  const [user, setUser] = useState("");
  const [email, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({});

  const [show, setShow] = useState(false);

  const URL = "https://quickly-a.herokuapp.com/api/client";
  const data = {
    user,
    email,
    password,
  };

  const handleRegisterUser = () => {
    if (user.length <= 2) {
      setAlert({
        msg: "El nombre es obligatorio!",
        error: true,
      });
      return;
    }

    setShow(true);
    setAlert({});
  };

  const handleRegisterEmailAndPw = async () => {
    // Validations
    if (password.length < 6) {
      setAlert({
        msg: "La contraseña es muy corta, agrega al menos 6 caracteres!",
        error: true,
      });
      return;
    }

    if (email.length < 6) {
      setAlert({
        msg: "El email es incorrecto!",
        error: true,
      });
      return;
    }

    // Request API
    try {
      let response = await fetch(URL, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.text());
    } catch (error) {
      console.log(error);
    }

    // navigation.navigate("RegisterSuccessful");
  };

  const { msg } = alert;

  return (
    <ImageBackground
      source={require("../../../../../assets/templates/TemplateRegister.png")}
      resizeMode="cover"
      style={styles.imageBackground}
    >
      <ScrollView>
        <StatusBar
          barStyle="light-content"
          backgroundColor={theme.colors.secondary}
        />
        {show ? (
          <View>
            <View style={styles.directionTextLogo}>
              <View>
                <Text style={styles.textHello}>¡Hola</Text>
                <Text style={styles.textName}>{user}!</Text>
              </View>
              <Image
                source={require("../../../../../assets/ClockRegister.png")}
                resizeMode="contain"
                style={styles.logoPostRegister}
              />
            </View>
            <View style={styles.mainText}>
              <Text style={styles.textMainPost}>
                Por favor llena la información
              </Text>
              <Text style={styles.textMainPost}>
                para completar el registro...
              </Text>
            </View>
            {msg && <Alert alert={alert} />}
            <View style={styles.marginButtonPost}>
              <Text style={styles.textNameInput}>Email</Text>
              <TextInput
                style={styles.inputName}
                mode="outlined"
                placeholder="Ingresa tu Email"
                value={email}
                onChangeText={(email) => setMail(email)}
              ></TextInput>
              <Text style={styles.textPasswordInput}>Contraseña</Text>
              <TextInput
                style={styles.inputName}
                mode="outlined"
                placeholder="Ingresa tu Contraseña"
                value={password}
                onChangeText={(pw) => setPassword(pw)}
              ></TextInput>
            </View>
            <View
              style={[styles.marginButtonRegister, globalStyles.normalButton]}
            >
              <TouchableHighlight
                onPress={handleRegisterEmailAndPw}
                style={globalStyles.button}
              >
                <Text style={styles.textButton}>Registrar</Text>
              </TouchableHighlight>
            </View>
          </View>
        ) : (
          <View>
            <Image
              source={require("../../../../../assets/ClockRegister.png")}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.textMain}>Nos encanta tenerte acá</Text>
            <View style={styles.block}>
              <Text style={styles.textSize}>Somos Quickly,</Text>
              <Text style={styles.textSize}>
                ¿Cómo quieres que te llamemos?
              </Text>
            </View>
            {msg && <Alert alert={alert} />}
            <View style={styles.marginInput}>
              <TextInput
                style={styles.inputName}
                mode="outlined"
                placeholder="Ingresa tu nombre"
                value={user}
                onChangeText={(user) => setUser(user)}
              />
            </View>
            <View style={[styles.marginButton, globalStyles.normalButton]}>
              <TouchableHighlight
                onPress={handleRegisterUser}
                style={globalStyles.button}
              >
                <Text style={styles.textButton}>Registrar</Text>
              </TouchableHighlight>
            </View>
          </View>
        )}
        <View style={[styles.marginDirection, styles.direction]}>
          <Text style={styles.textQuestionAccount}>¿Ya tienes cuenta?</Text>
          <TouchableHighlight onPress={() => navigation.navigate("Login")}>
            <Text style={styles.textLogIn}>¡Inicia Sesión!</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default Register;
