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
} from "react-native";
import { TextInput } from "react-native-paper";

import { CheckBox } from "../../../CheckBox/CheckBox";
import { theme } from "../../../../globalStyles/theme";
import style from "./style";
import globalStyles from "../../../../globalStyles/globalStyles";

export const Login = ({ navigation }) => {
  let [user, setUser] = useState("");
  let [password, setPassword] = useState("Testing");

  const [passwordVisible, setPasswordVisible] = useState(true);

  const auth = useAuth();

  const handleLogin = () => {
    auth.signIn();
  };

  // const url = "https://quickly-a.herokuapp.com/api/auth/login";
  // const data = { user: "Provider", password: "123456" };

  // fetch(url, {
  //   method: "POST",
  //   body: JSON.stringify(data),
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // })
  //   .then((res) => res.json())
  //   .catch((error) => console.error("Error:", error))
  //   .then((response) => console.log("Success:", response));

  const handleRegister = () => {
    navigation.navigate("Register");
  };

  const handleForgetPassword = () => {
    navigation.navigate("ForgetPassword");
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
              right={<TextInput.Affix text="/100" />}
            />
          </View>
          <View style={style.marginX}>
            <Text style={style.inputContainer}>Ingresa tu contraseña</Text>
            <TextInput
              mode="outlined"
              placeholder="Ingresa tu contraseña"
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
            <CheckBox children={"Recordame"} />
            <TouchableHighlight onPress={handleForgetPassword}>
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
            <TouchableHighlight onPress={handleRegister}>
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

// export default function Login() {
//     let [response, setResponse] = useState(["Server response."]
//     const auth = useAuth();

//     async function login(user, password) {
//         let headers = new Headers()
//         headers.append("Content-Type", "application/json")
//         try {
//             let response = await fetch('https://quickly-b.herokuapp.com/login', {
//                 headers,
//                 method: "POST",
//                 body: JSON.stringify({
//                     user,
//                     password
//                 })
//             })
//             let data = await response.json()
//             let toText = Object.keys(data).map(k => `${k}: ${data[k]}`)
//             setResponse(toText)
//             auth.signIn();
//             navigate("/", {replace: true});
//         }
//         catch (error) {
//             console.log('error', error)
//         }

//     }
//     async function register(user, password) {
//         try {
//             let headers = new Headers()
//             headers.append("Content-Type", "application/json")
//             let response = await fetch('https://quickly-b.herokuapp.com/register', {
//                 headers,
//                 method: "POST",
//                 body: JSON.stringify({
//                     user,
//                     password
//                 })
//             })
//             let data = await response.json()
//             let toText = Object.keys(data).map(k => `${k}: ${data[k]}`)
//             setResponse(toText)
//         }
//         catch (error) {
//             console.log('error', error)
//         }
//     }
//     function handlePressLogin() {
//         login(user, password)
//     }
//     function handlePressRegister() {
//         register(user, password)
//     }

//     return (
//         <View style={style.container}>
//             <Text style={style.title}>Login/Register view</Text>
//             <TextInput value={user} onChange={e => setUser(e.target.value)} style={style.input} />
//             <TextInput value={password} onChange={e => setPassword(e.target.value)} style={style.input} />
//             <View style={style.buttonContainer}>
//                 <TouchableHighlight onPress={handlePressLogin} style={style.button}>
//                     <Text style={style.buttonText}>Login</Text>
//                 </TouchableHighlight>
//                 <TouchableHighlight onPress={handlePressRegister} style={style.button}>
//                     <Text style={style.buttonText}>Register</Text>
//                 </TouchableHighlight>
//             </View>
//             <View>
//                 {response.map((k, index) => <Text key={`serverResponse${index}`}>{k}</Text>)}
//             </View>
//             <View>
//                 <Text>¿Aún no tienes una cuenta?</Text>
//                 <Link to="/register">
//                     <Text>¡Súmate!</Text>
//                 </Link>
//             </View>
//         </View>
//     );
// }
