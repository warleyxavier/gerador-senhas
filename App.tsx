import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, TouchableOpacity, View, ToastAndroid } from 'react-native';
import Slider from '@react-native-community/slider';
import Clipboard from 'expo-clipboard';

import logo from './assets/logo.png';

const CHARSETS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*()';

export default function App() {

  const [passwordCountCharacteres, setPasswordCountCharacteres] = useState<number>(10);
  const [password, setPassword] = useState<string>("");

  function generatePassword() {
    let temporaryPassword = '';

    for(let i = 0; i < passwordCountCharacteres; i++)
      temporaryPassword += CHARSETS.charAt(Math.floor(Math.random() * CHARSETS.length));

    setPassword(temporaryPassword);
  }

  function copyPassword() {
    Clipboard.setString(password);
    ToastAndroid.show("Senha copiada!", ToastAndroid.SHORT);
  }

  return (
    <View style={styles.container}>
      <Image source={logo} />
      <Text style={styles.descriptionText}>{passwordCountCharacteres} Caracteres</Text>
      <View style={styles.commonContainer}>
        <Slider
          style={{width: "90%"}}
          minimumValue={5}
          maximumValue={20}
          minimumTrackTintColor="#FFA200"
          maximumTrackTintColor="white"
          value={passwordCountCharacteres} 
          onValueChange = {(value) => setPasswordCountCharacteres(Number(value.toFixed(0)))}                 
        />
      </View>
      <TouchableOpacity style={styles.buttonContainer} onPress={generatePassword}>
        <Text style={styles.buttonText}>Gerar Senha</Text>
      </TouchableOpacity>

      {
        password != "" && (
          <View style={styles.commonContainer}>
            <Text style={styles.passwordText} onLongPress={copyPassword} >{password}</Text>
          </View>
        )
      }

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2B303A',
    alignItems: 'center',
    justifyContent: 'center'
  },
  descriptionText: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 30
  },
  commonContainer: {
    width: "90%",
    height: 60,
    borderRadius: 7,
    backgroundColor: "#363946",
    marginTop:30,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonContainer: {
    width: "90%",
    height: 60,
    marginTop: 30,
    backgroundColor: "#FFA200",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 7
  },
  buttonText: {
    color: "#2B303A",
    fontWeight: "bold",
    fontSize: 18
  },
  passwordText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20    
  }
});
