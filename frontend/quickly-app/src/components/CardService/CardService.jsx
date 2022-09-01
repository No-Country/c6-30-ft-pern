import { Pressable, Text, TouchableWithoutFeedback, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
// Styles
import globalStyles from '../../globalStyles/globalStyles';
import { styles } from './styles';

export const CardService = ({data, handleDelete}) => {

  return (
    <View style={styles.container}>
        <View style={styles.dataContainer}>
            <Text style={[globalStyles.title, styles.title]}>{data?.name}</Text>
            <Text>Descripción: {data?.description}</Text>
            <Text>Precio:</Text>
            <Text style={styles.textSubtitle}>${data?.value}</Text>
            <View>
                <Text>Horarios:</Text>
                <View style={styles.textContainer}>
                    {
                        data?.Date?.monday?.map(time => (
                            <Text key={time} style={[styles.text, styles.textLabel]}>{time}</Text>
                        ))
                    }
                </View>
                <View>
                    <Text>Días disponibles:</Text>
                    <View style={styles.textContainer}>
                        {data?.Date.monday && (<Text style={[styles.text, styles.textLabel]}>Lunes</Text>)}
                        {data?.Date.tuesday && (<Text style={[styles.text, styles.textLabel]}>Martes</Text>)}
                        {data?.Date.wednesday && (<Text style={[styles.text, styles.textLabel]}>Miércoles</Text>)}
                        {data?.Date.thursday && (<Text style={[styles.text, styles.textLabel]}>Jueves</Text>)}
                        {data?.Date.friday && (<Text style={[styles.text, styles.textLabel]}>Viernes</Text>)}
                        {data?.Date.saturday && (<Text style={[styles.text, styles.textLabel]}>Sábado</Text>)}
                        {data?.Date.sunday && (<Text style={[styles.text, styles.textLabel]}>Domingo</Text>)}
                    </View>
                </View>
            </View>
        </View>
        <View>
            <Pressable onPress={() => handleDelete(data.id)}>
                <View style={[globalStyles.button, globalStyles.cancelButton, styles.button]}>
                    <Icon name="ios-trash" size={15} color="#FFF"/>
                </View>
            </Pressable>
        </View>
    </View>
  )
};