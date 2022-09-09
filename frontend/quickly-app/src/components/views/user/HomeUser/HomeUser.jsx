import { StatusBar, Text, TouchableHighlight, View } from "react-native";
// Styles
import globalStyles from "../../../../globalStyles/globalStyles";
import { theme } from "../../../../globalStyles/theme";
import { useCallback, useEffect, useState } from "react";
import useUserData from "../../../../hooks/useUserData";
import { useAuth } from "../../../../hooks/useAuth";
import styles from "./styles";


const HomeUser = ({ navigation }) => {
  const { authData } = useAuth();
  const { user, access } = authData;
  const { userData, loading } = useUserData(user, access);

  if (loading) return <View></View>;
  return (
    <View style={globalStyles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.secondary}
      />
      <Text>
        {" "}
        {userData?.Orders.length === 0 ? (
          <Text>Todavia no tienes turnos agendados!</Text>
        ) : (
          userData?.Orders.map((k, index) => (
            <View style={styles.container} key={`el${index}`}>
              <Text>Proveedor:{k.provider}</Text>
              <Text>Fecha:{new Date(k.date).toString()}</Text>
              <Text>Descripción:{k.description}</Text>
            </View>
          ))
        )}
      </Text>
    </View>
  );
};

export default HomeUser;
