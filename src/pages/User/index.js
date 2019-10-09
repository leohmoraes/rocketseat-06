import React from 'react';
import { View } from 'react-native';

// import { Container } from './styles';

// Conferir no Reactotron os valores das props. Pegar somente o navigation
// export default function User(props) {
//   console.tron.log(props);
//   return <View />;

export default function User({ navigation }) {
  console.tron.log(navigation.getParam('user'));
  return <View />;
}
