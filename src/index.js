import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import './config/ReactotronConfig';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  welcomeRed: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'red',
  },
});


console.tron.log("Hello World");


export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Bem Vindo ao React Native</Text>
      <Text style={styles.welcomeRed}>Aula 5</Text>
    </View>
  );
}
