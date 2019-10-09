import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Keyboard, ActivityIndicator } from 'react-native';
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

export default class Main extends Component {
  state = {
    newUser: '',
    users: [],
    loading: false,
  };

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
              <ProfileButton onPress={() => {}}>
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

Main.navigationOptions = {
  title: 'Usuários',
};
