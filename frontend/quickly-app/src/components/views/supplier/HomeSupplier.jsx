import { useEffect, useState } from "react";
import { TouchableWithoutFeedback, ScrollView, Text, View, Image, Alert, StatusBar } from "react-native";
// Components
import { CardService } from "../../CardService/CardService";
// Hooks
import { useAuth } from "../../../hooks/useAuth";
// Styles
import globalStyles from "../../../globalStyles/globalStyles";
import { styles } from "./styles";
import { theme } from "../../../globalStyles/theme";

export default function HomeSupplier({ navigation, route }) {

  const { authData } = useAuth();
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getServices("");
  }, [route]);

  const getServices = async (path) => {
    setIsLoading(true);
    await fetch(`https://quickly-a.herokuapp.com/api/provider?user=${authData?.user}${path}`)
      .then(res => res.json())
      .then(data => {
        listServices(data.payload[0].Services);
      })
      .catch(error => console.log(error));
  }

  const listServices = (data) => {
    setServices(data);
    setIsLoading(false);
  }

  const handleAddService = () => {
    navigation.navigate('NewService');
  }

  const handleDeleteService = (id) => {
    Alert.alert('¿Estas seguro de eliminar el servicio?',
    undefined,
    [
      {
        text: "Aceptar",
        onPress: () => {
            fetch("https://quickly-a.herokuapp.com/api/service", {
                method: "DELETE",
                body: JSON.stringify({
                  id: id,
                }),
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + authData.tokens.accessToken,
                }
            })
            .then(res => res.json())
            .then(data => {
              getServices("")
              setIsLoading(false);
            })
            .catch(err=>console.log(err))
            Alert.alert("Servicio eliminado!")
        },
        style: "cancel",
      },
      {
        text: "Cancelar",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
    ],
    {
      cancelable: true,
      onDismiss: () =>
        console.log(
          "This alert was dismissed by tapping outside of the alert dialog."
        ),
    });
  }

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.secondary}/>
      <View style={[globalStyles.container, styles.container]}>
        <View style={styles.imgContainer}>
          <Image source={require('../../../../assets/logo-quickly.png')} style={styles.imgLogo}/>
        </View>
        <View style={[globalStyles.cardOutlineContainer, styles.cardContainer]}>
          <Text style={[globalStyles.title, styles.title]}>{services?.length > 1 ? "Mis servicios" : "Mi servicio"}</Text>
          {
            services?.length !== 0 ? (isLoading ? <><Text>Cargando...</Text></> : (
              <>
                {
                  services.map(service => <CardService key={service.id} data={service} handleDelete={handleDeleteService} />)
                }
              </>
            )) : (
              <>
                <Text>Aún no tienes creado ningún servicio</Text>
              </>
            )
          }
          
        </View>
        <TouchableWithoutFeedback onPress={handleAddService}>
          <View style={[globalStyles.button, globalStyles.normalButton, styles.button]}>
            <Text style={globalStyles.textButton}>+ Crear servicio</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </ScrollView>
  );
}
