import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Keyboard, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import PropTypes from 'prop-types';

import {
  Container,
  Form,
  Input,
  SubmitButton,
  List,
  Avatar,
  User,
  Name,
  Bio,
  ProfileButton,
  ProfileButtonText,
} from './styles';

import api from '../../services/api';

Icon.loadFont();

const KEY_ASYNC_STORAGE = '@intro-rn:users:key';

export default class Main extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  state = {
    newUser: '',
    users: [],
    loading: false,
  };

  async componentDidMount() {
    // console.tron.log(this.props); // verificar as propriedades de navegacao
    const users = await AsyncStorage.getItem(KEY_ASYNC_STORAGE);
    if (users) {
      this.setState({ users: JSON.parse(users) });
    }
  }

  componentDidUpdate(_, prevState) {
    const { users } = this.state;
    if (prevState.users !== users) {
      AsyncStorage.setItem(KEY_ASYNC_STORAGE, JSON.stringify(users));
    }
  }

  handleAddUser = async () => {
    // console.tron.log(this.state.newUser);
    const { users, newUser } = this.state; // users para poder adicionar na lista
    this.setState({ loading: true }); // define como carregando e somente depois do retorno do await o status vai mudar
    const response = await api.get(`/users/${newUser}`);
    const data = {
      name: response.data.name, // nom do usuario
      login: response.data.login, // login do usuario
      bio: response.data.bio, // biografia
      avatar: response.data.avatar_url, // imagem
    };

    this.setState({ users: [...users, data], newUser: '', loading: false }); // atualiza o array e zera o newUser

    Keyboard.dismiss();
  };

  handleNavigate = user => {
    const { navigation } = this.props;
    navigation.navigate('User', { user }); // nome da tela que será direcionado
  };

  static navigationOptions = {
    title: 'Usuários',
  };

  render() {
    const { users, newUser, loading } = this.state;

    return (
      <Container>
        <Form>
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Adicionar usuário"
            value={newUser}
            onChangeText={text => this.setState({ newUser: text })}
            returnKeyType="send"
            onSubmitEditing={this.handleAddUser}
          />
          <SubmitButton onPress={this.handleAddUser}>
            {loading ? (
              <ActivityIndicator loading={loading} color="#FFF" />
            ) : (
              <Icon name="add" size={20} color="#FFF" />
            )}
          </SubmitButton>
        </Form>

        <List
          data={users}
          renderItem={({ item }) => (
            <User>
              <Avatar source={{ uri: item.avatar }} />
              <Name>{item.name}</Name>
              <Bio>{item.bio}</Bio>
              <ProfileButton onPress={() => this.handleNavigate(item)}>
                <ProfileButtonText>Ver perfil</ProfileButtonText>
              </ProfileButton>
            </User>
          )}
          keyExtractor={item => item.login}
        />
      </Container>
    );
  }
}
