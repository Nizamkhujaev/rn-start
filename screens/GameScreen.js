import { Text, View, StyleSheet, Alert, FlatList, StatusBar } from "react-native";
import { Colors } from "./constants/colors";
import { useState, useEffect } from "react";
import NumberContainer from "../components/game/NumberContainer";
import { PrimaryButton } from '../components/PrimaryButton'
import { Card } from "../components/Card";
import { Ionicons } from '@expo/vector-icons'
import { useFonts } from 'expo-font'
import AppLoading from "expo-app-loading";
import GuessLog from "../components/game/GuessLog";

function generateRandomBetween(min, max, exclude) {
    const rndNum = Math.floor(Math.random() * (max - min)) + min

    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude)
    } else {
        return rndNum
    }
}

let minBoundary = 1
let maxBoundary = 100

function GameScreen({ userNumber, gameOverHandler }) {
    const initialGuess = generateRandomBetween(1, 100, userNumber)
    const [currentGuess, setCurrentGuess] = useState(initialGuess)
    const [guessRounds, setGuessRounds] = useState([initialGuess])

    function nextGuessHandler(direction) {
        if ((direction === 'lower' && currentGuess < userNumber) || (direction === 'higher' && currentGuess > userNumber)) {
            Alert.alert('Don`t lie', 'You know that this is wrong..', [
                {
                    text: 'Sorry!',
                    style: 'cancel',
                }
            ])
            return
        }

        if (direction === 'lower') {
            maxBoundary = currentGuess
        } else {
            minBoundary = currentGuess + 1
        }

        const newRandomNumber = generateRandomBetween(minBoundary, maxBoundary, currentGuess)

        setCurrentGuess(newRandomNumber)
        setGuessRounds([newRandomNumber, ...guessRounds])
    }

    const [fontsLoaded] = useFonts({
        'open-sans': require('../assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('../assets/fonts/OpenSans-Bold.ttf')
    })

    useEffect(() => {
        if (currentGuess === userNumber) {
            gameOverHandler(guessRounds?.length)
        }
    }, [currentGuess, userNumber])

    useEffect(() => {
        minBoundary = 1
        maxBoundary = 100
    }, [])

    if (!fontsLoaded) {
        return <AppLoading />
    }


    return (
        <View style={styles.screen}>
            <StatusBar
                animated={true}
                backgroundColor="#000"
            />
            <Text style={styles.title}>
                Opponents Guess
            </Text>
            <NumberContainer>{currentGuess}</NumberContainer>

            {/* Guess */}

            <Card >
                <Text style={styles.instructionText}>
                    Higher or lower
                </Text>

                <View style={styles.buttonsContainer}>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={nextGuessHandler.bind(null, 'lower')}>
                            <Ionicons size={24} color="white" name="md-remove" />
                        </PrimaryButton>
                    </View>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={nextGuessHandler.bind(null, 'higher')}>
                            <Ionicons size={24} color="white" name="md-add" />
                        </PrimaryButton>
                    </View>
                </View>
            </Card>

            <View style={styles.listContainer}>
                <FlatList
                    data={guessRounds}
                    renderItem={(item) => <GuessLog roundNumber={guessRounds?.length - item?.index} guess={item.item} />}
                    keyExtractor={item => item}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        // flexGrow: 4,
        padding: 12,
        marginBottom: 40
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        borderWidth: 2,
        borderColor: 'white',
        padding: 12
    },
    buttonsContainer: {
        flexDirection: 'row',
        gap: 10,
    },
    buttonContainer: {
        flex: 1
    },
    instructionText: {
        color: Colors.primary,
        fontSize: 20,
    },
    listContainer: {
        // flex: 1,
        padding: 18,
        maxHeight: '57%'
    }
})

export default GameScreen 