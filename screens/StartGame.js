import { TextInput, Text, View, StyleSheet, ScrollView, Dimensions, Alert, KeyboardAvoidingView } from 'react-native'
import { PrimaryButton } from '../components/PrimaryButton'
import { useState } from 'react'
import { Colors } from './constants/colors';
import { Card } from '../components/Card';
import { StatusBar } from 'expo-status-bar';

export const StartGame = ({ onPickedNumber }) => {
    const [input, setInput] = useState('');

    const handleChangeInput = (value) => {
        setInput(value.nativeEvent.text)
    }

    const handleCancelClicked = () => {
        setInput('')
    }

    function confirmInputHandler() {
        const chosenNumber = parseInt(input);

        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert(
                'Invalid number!',
                'Number has to be a number between 1 and 99.',
                [{ text: 'Okay', style: 'destructive', onPress: handleCancelClicked }]
            );
            return;
        }

        onPickedNumber(chosenNumber);
    }

    return (
        <ScrollView style={styles.screen}>
            <StatusBar hidden />
            <KeyboardAvoidingView style={styles.screen} behavior='position'>
                <View style={styles.rootContainer}>
                    <Text style={styles.title}>Guess My Number</Text>
                    <Card>
                        <Text style={styles.instructionText}>Enter a Number</Text>
                        <TextInput
                            maxLength={2}
                            style={styles.numberInput}
                            keyboardType='number-pad'
                            autoCorrect={false}
                            value={input}
                            onChange={handleChangeInput}
                        />
                        <View style={styles.buttonsContainer}>
                            <View style={styles.buttonContainer}>
                                <PrimaryButton onPress={handleCancelClicked}>
                                    Reset
                                </PrimaryButton>
                            </View>

                            <View style={styles.buttonContainer}>
                                <PrimaryButton onPress={confirmInputHandler}>
                                    Confirm
                                </PrimaryButton>
                            </View>
                        </View>
                    </Card>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

const dimensionsWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
    screen: {
        // flex: 1
    },
    rootContainer: {
        marginTop: dimensionsWidth > 380 ? 30 : 100,
        alignItems: 'center'
    },

    numberInput: {
        height: 50,
        width: 50,
        fontSize: 32,
        borderBottomColor: Colors.primary,
        borderBottomWidth: 2,
        color: Colors.primary,
        marginVertical: 8,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    buttonsContainer: {
        flexDirection: 'row',
        gap: 10,
    },
    buttonContainer: {
        flex: 1
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
    instructionText: {
        color: Colors.primary,
        fontSize: 24
    }
})