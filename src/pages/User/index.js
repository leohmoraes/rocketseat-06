import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import api from '../../services/api'; // repositorios favoritos / starred

// import { Container } from './styles';

// Conferir no Reactotron os valores das props. Pegar somente o navigation
// export default function User(props) {
//   console.tron.log(props);
//   return <View />;

/*
Transformar em classe para acessar as classes, estados, ciclo de vida.
*/
export default class User extends Component {
  // titulo da pagina

  /* isto abaixo nao vai funcionar, para obter as informacoes precisa transformar em uma funcao que retorna um objeto
  static navigationOptions = {
    title: this.props.navigation.getParam('user').name,
  };
  */

  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('user').name,
  });
  // ({ navigation }) {
  // console.tron.log(navigation.getParam('user'));

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
    }).isRequired,
  };

  state = {
    stars: [],
  };

  // Executa quando entrar na tela
  async componentDidMount() {
    const { navigation } = this.props;
    console.tron.log(navigation.getParam('user'));
    const user = navigation.getParam('user');

    const response = await api.get(`/users/${user.login}/starred`);
    this.setState({ stars: response.data });
  }

  render() {
    const { stars } = this.state;
    return <View />;
  }
}

// User.propTypes = {
//   navigation: PropTypes.shape({
//     getParam: PropTypes.func,
//   }).isRequired,
// };
