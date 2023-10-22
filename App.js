import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import { StartGame } from './screens/StartGame';
import {LinearGradient} from 'expo-linear-gradient'
import { useEffect, useState } from 'react';
import GameScreen from './screens/GameScreen';
import { Colors } from './screens/constants/colors';
import GameOver from './screens/GameOver';
import {StatusBar} from 'expo-status-bar'

export default function App() {
  const [userNumber, setUserNumber] = useState(null)
  const [gameIsOver, setGameIsOver] = useState(true)
  const [rounds, setRounds] = useState(0)

  function handlePickUserNumber(number) {
    setUserNumber(number)
    setGameIsOver(false)
  }

  let screen = <StartGame onPickedNumber={handlePickUserNumber} />

  const gameOverHandler = (numberOfRounds) => {
    setGameIsOver(true)
    setRounds(numberOfRounds)
  }

  function startNewGame() {
    setUserNumber(null)
    setRounds(0)
  }

  if(userNumber) {
    screen = <GameScreen gameOverHandler={gameOverHandler} userNumber={userNumber} />
  }

  if(gameIsOver && userNumber) {
    screen = <GameOver roundsNumber={rounds} onStartNewGame={startNewGame} userNumber={userNumber} />
  }

  return (
      <LinearGradient
        style={styles.rootContainer}
        colors={['#4e0329', Colors.primary]}
      >
        <ImageBackground
          source={require('./assets/images/background.png')}
          resizeMode='cover'
          style={styles.rootContainer}
          imageStyle={styles.imageContainer}
        >
          <SafeAreaView>
            {screen}
          </SafeAreaView>
        </ImageBackground>
      </LinearGradient>
   );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1
  },
  imageContainer: {
    opacity: 0.15
  }
});
