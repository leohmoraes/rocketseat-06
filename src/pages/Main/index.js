import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Keyboard } from 'react-native';
import { Container, Form, Input, SubmitButton } from './styles';
import api from '../../services/api';

Icon.loadFont();

export default class Main extends Component {
  state = {
    newUser: '',
    users: [],
  };

  handleAddUser = async () => {
    // console.tron.log(this.state.newUser);
    const { users, newUser } = this.state; // users para poder adicionar na lista
    const response = await api.get(`/users/${newUser}`);
    const data = {
      name: response.data.name, // nom do usuario
      login: response.data.login, // login do usuario
      bio: response.data.bio, // biografia
      avatar: response.data.avatar_url, // imagem
    };

    this.setState({ users: [...users, data], newUser: '' }); // atualiza o array e zera o newUser

    Keyboard.dismiss();
  };

  render() {
    const { users, newUser } = this.state;

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
            <Icon name="add" size={20} color="#FFF" />
          </SubmitButton>
        </Form>
      </Container>
    );
  }
}

Main.navigationOptions = {
  title: 'Usuários',
};
