import { useEffect, useState } from 'react'
import { ActivityIndicator, Image, ScrollView, Text, View } from 'react-native'
// Components
import { CardOrder } from '../../../CardOrder/CardOrder'
// Styles
import { theme } from '../../../../globalStyles/theme'
import globalStyles from '../../../../globalStyles/globalStyles'
import { styles } from './styles'

const OrdersList = ({route}) => {

  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://quickly-a.herokuapp.com/api/service/${route.params.id}`)
      .then(res=>res.json())
      .then(data => {
        setOrders(data.payload.Orders);
        setIsLoading(false);
      })
      .catch((error)=>console.log(error))
  }, [])
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={[globalStyles.container, styles.container]}>
          <View style={styles.imgContainer}>
            <Image source={require('../../../../../assets/logo-quickly.png')} style={styles.imgLogo}/>
          </View>
          <View style={styles.cardContainer}>
            <Text style={[globalStyles.title2, styles.title]}>{route.params.name}</Text>
            {
              orders?.length === 0 ? <Text>No hay turnos solicitados</Text> : isLoading ? <View style={{flex: 1, justifyContent: 'center'}}>
              <ActivityIndicator size="small" color={theme.colors.primary} />
            </View> : (<View>
                {
                  orders?.map (order => {
                    return(
                      <CardOrder key={order.id} data={order}/>
                    )
                  })
                }
              </View>)
            }
          </View>
      </View>
    </ScrollView>
  )
}

export default OrdersList;