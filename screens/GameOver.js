import { Image, Text, View, StyleSheet } from 'react-native'
import { Colors } from './constants/colors'
import { PrimaryButton } from '../components/PrimaryButton'

function GameOver({roundsNumber, userNumber, onStartNewGame}) {
    return (
        <View style={styles.rootContainer}>
            <Text style={styles.title}>GAME OVER</Text>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={require('../assets/images/success.png')} />
            </View>

            <View>
                <Text style={styles.summaryText}>
                    Your phone needed <Text style={styles.highlighted}>{roundsNumber}</Text> rounds to guess <Text style={styles.highlighted}>{userNumber}</Text>.
                </Text>
            </View>

            <PrimaryButton onPress={onStartNewGame}>
                Start New Game
            </PrimaryButton>
        </View>
    )
}

export default GameOver

export const styles = StyleSheet.create({
    rootContainer: {
        padding: 24,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        borderWidth: 2,
        borderColor: 'white',
        padding: 12,
        fontFamily: 'open-sans-bold',
    },
    imageContainer: {
        width: 300,
        height: 300,
        borderRadius: 150,
        borderWidth: 3,
        borderColor: 'white',
        overflow: 'hidden',
        margin: 36
    },
    image: {
        width: '100%',
        height: '100%'
    },
    summaryText: {
        fontFamily: 'open-sans',
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 24
    },
    highlighted: {
        fontFamily: 'open-sans-bold',
        color: Colors.primary800
    }
})