import { Image, ScrollView, Text, View } from 'react-native'
// Components
import { ServiceForm } from '../../../Form/ServiceForm/ServiceForm'
// Styles
import globalStyles from '../../../../globalStyles/globalStyles'
import { styles } from './styles'

const CreateService = ({navigation}) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={[globalStyles.container, styles.container]}>
          <View style={styles.imgContainer}>
            <Image source={require('../../../../../assets/logo-quickly.png')} style={styles.imgLogo}/>
          </View>
          <View style={styles.formContainer}>
              <ServiceForm navigation={navigation}/>
          </View>
      </View>
    </ScrollView>
  )
}

export default CreateService;