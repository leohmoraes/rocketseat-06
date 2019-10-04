// import { createSwitchNavigator} from 'react-navigation';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './pages/Main';
import User from './pages/User';

// createAppContainer = parecido com browserRouter
const Routes = createAppContainer(
  createStackNavigator(
    {
      // createStackNavigator: cria um header, cria uma pilha de rotas, historico
      // createSwitchNavigator: Subsitui a rota anterior, uma rota por vez, necessario carregar novamente
      // createBottomTabNavigator: cria um footer
      // createMaterialTopTabNavigator: cria um header com fundo usando estilo do Material Design
      // createDrawerNavigator: navegacao com o dedo no lado esquerdo para o centro
      Main, // recebe as rotas
      User,
    },
    {
      headerLayoutPreset: 'center', // Android : padrao na esquerda
      headerBackTitleVisible: false, // Ocultar o voltar no iOS dentro do header
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: '#7159c1',
        },
        headerTintColor: '#FFF',
      },
    }
  )
);

export default Routes;
