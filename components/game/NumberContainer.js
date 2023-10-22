import { Text, View, StyleSheet, Dimensions } from 'react-native'
import { Colors } from '../../screens/constants/colors'

function NumberContainer({children}) {
  return (
   <View style={styles.container}>
     <Text style={styles.numberText }>{children}</Text>
   </View>
  )
}

export default NumberContainer

const deviceWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
    container: {
        borderWidth: 4,
        borderColor: Colors.accent500,
        padding: 25,
        borderRadius: 8,
        margin: 24,
        alignItems: 'center',
        justifyContent: 'center'
    },
    numberText: {
        color: Colors.accent500,
        fontWeight: 'bold',
        fontSize: 22
    }
})