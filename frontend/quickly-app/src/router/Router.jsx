import { Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

// Hook
import { useAuth } from "../hooks/useAuth";

// Views
import Home from "../components/views/Home/Home";
import HomeUser from "../components/views/user/HomeUser/HomeUser.jsx";
import HomeSupplier from "../components/views/supplier/HomeSupplier.jsx";
import Login from "../components/views/auth/Login/Login.jsx";
import Register from "../components/views/auth/Register/Register.jsx";
import NewService from "../components/views/supplier/NewService/NewService";
import FilterBar from "../components/FilterBar/FilterBar";
import ForgetPassword from "../components/views/auth/ForgetPassword/ForgetPassword";
import RegisterSuccessful from "../components/views/auth/RegisterSuccessful/RegisterSuccessful";
import NewPasswordSuccessful from "../components/views/auth/NewPasswordSuccessful/NewPasswordSuccessful";
import ProviderOrClient from "../components/views/auth/ProviderOrClient/ProviderOrClient";

// Components
import Notifications from "../components/views/user/Notifications/Notifications.jsx";

import { theme } from "../globalStyles/theme";

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="Turns"
        component={FilterBar}
        options={{
          title: "Nuevo turno",
          headerStyle: {
            backgroundColor: theme.colors.secondary,
          },
          headerTintColor: theme.colors.background,
        }}
      />
      <Stack.Screen name="HomeUser" component={HomeUser} />
      <Stack.Screen
        name="HomeSupplier"
        component={HomeSupplier}
        options={{
          title: "Mi Servicio",
          headerStyle: {
            backgroundColor: theme.colors.secondary,
          },
          headerTintColor: theme.colors.background,
        }}
      />
      <Stack.Screen
        name="NewService"
        component={NewService}
        options={{
          title: "Nuevo Servicio",
          headerStyle: {
            backgroundColor: theme.colors.secondary,
          },
          headerTintColor: theme.colors.background,
        }}
      />
    </Stack.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          title: "Login",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ProviderOrClient"
        component={ProviderOrClient}
        options={{
          title: "¿Provedor o Cliente?",
          headerStyle: {
            backgroundColor: theme.colors.secondary,
          },
          headerTintColor: theme.colors.background,
        }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          title: "Registro",
          headerStyle: {
            backgroundColor: theme.colors.secondary,
          },
          headerTintColor: theme.colors.background,
        }}
      />
      <Stack.Screen
        name="ForgetPassword"
        component={ForgetPassword}
        options={{
          title: "Recuperar Contraseña",
          headerStyle: {
            backgroundColor: theme.colors.secondary,
          },
          headerTintColor: theme.colors.background,
        }}
      />
      <Stack.Screen
        name="RegisterSuccessful"
        component={RegisterSuccessful}
        options={{
          headerTintColor: theme.colors.background,
        }}
      />
      <Stack.Screen
        name="NewPasswordSuccessful"
        component={NewPasswordSuccessful}
        options={{
          headerTintColor: theme.colors.background,
        }}
      />
    </Stack.Navigator>
  );
};

export const Router = () => {
  const { authData, loading } = useAuth();

  if (loading) {
    return (
      <>
        <Text>Cargando...</Text>
      </>
    );
  }

  return (
    <NavigationContainer>
      {authData?.access ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
