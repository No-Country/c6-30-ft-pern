import { useState } from "react";
import {
  ScrollView,
  Text,
  View,
  StatusBar,
  Image,
  TouchableHighlight,
  Alert,
  ImageBackground,
} from "react-native";
import { TextInput } from "react-native-paper";
import styles from "./styles";
import { theme } from "../../../../globalStyles/theme";
import globalStyles from "../../../../globalStyles/globalStyles";
import { useAuth } from "../../../../hooks/useAuth";

const Register = ({ navigation }) => {
  const [user, setUser] = useState("");
  const [email, setMail] = useState("");
  const [password, setPassword] = useState("");

  const [show, setShow] = useState(false);

  const { rol } = useAuth();

  const handleRegisterUser = () => {
    if (user.length <= 2) {
      Alert.alert(
        "Nombre incorrecto",
        "El nombre ingresado tiene los caracteres insuficientes",
        [
          {
            text: "Entiendo",
          },
        ]
      );
      return;
    }

    setShow(true);
  };

  const handleRegisterEmailAndPw = async () => {
    if (password.length < 6 && email.length < 8) {
      Alert.alert(
        "Datos incorrectos",
        "La contraseña y el email son invalidos",
        [
          {
            text: "Entiendo",
          },
        ]
      );
      return;
    } else if (password.length < 6) {
      Alert.alert(
        "Contraseña incorrecta",
        "La contraseña ingresada tiene pocos caracteres",
        [
          {
            text: "Entiendo",
          },
        ]
      );
      return;
    } else if (email.length < 8) {
      Alert.alert("Mail incorrecto", "El email ingresado es invalido", [
        {
          text: "Entiendo",
        },
      ]);
      return;
    }

    if (rol === "user") {
      try {
        await fetch("https://quickly-a.herokuapp.com/api/client", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user,
            email,
            password,
          }),
        })
          .then((response) => response.json())
          .then((data) => console.log(data.payload));

        setUser("");
        setMail("");
        setPassword("");
      } catch (error) {
        console.log(error.message);
        throw error;
      }
    } else if (rol === "provider") {
      try {
        await fetch("https://quickly-a.herokuapp.com/api/provider", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user,
            email,
            password,
          }),
        })
          .then((response) => response.json())
          .then((data) => console.log(data.payload));

        setUser("");
        setMail("");
        setPassword("");
      } catch (error) {
        console.log(error.message);
      }
    }
    navigation.navigate("RegisterSuccessful");
  };

  return (
    <ImageBackground
      source={require("../../../../../assets/templates/TemplateRegisterSmall.png")}
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
                <Text style={styles.textName}>¡{user}!</Text>
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
            <View style={styles.marginInput}>
              <TextInput
                style={styles.inputName}
                mode="outlined"
                placeholder="Ingresa tu nombre de usuario"
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
