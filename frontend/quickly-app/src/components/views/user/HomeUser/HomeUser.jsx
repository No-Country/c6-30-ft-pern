import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
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
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imgContainer}>
        <Image
          source={require("../../../../../assets/logo-quickly.png")}
          style={styles.imgLogo}
        />
      </View>
      <View style={[globalStyles.container, styles.container]}>
        <View style={styles.cardContainer}>
          <Text style={styles.text}>Mis turnos:</Text>
          {userData?.Orders.length === 0 ? (
            <Text>Todavia no tienes turnos agendados!</Text>
          ) : (
            userData?.Orders.map((k, index) => (
              <View style={styles.appointment} key={`el${index}`}>
                <Text>Proveedor:{k.provider}</Text>
                <Text>Fecha:{new Date(k.date).toString()}</Text>
                <Text>Descripción:{k.description}</Text>
                <Text>Descripción:{k.Service?.category}</Text>
              </View>
            ))
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeUser;
