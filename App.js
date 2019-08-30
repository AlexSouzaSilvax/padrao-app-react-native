import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation';

import Login from './src/screens/Login';
import Carros from './src/screens/Carros';
import Motos from './src/screens/Carros';

import colors from './src/styles/colors';

const AppNavigator = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      header: null
    }
  },
  Home: {
    screen: createBottomTabNavigator({
      Carros: {
        screen: Carros,
        navigationOptions: {
          title: 'Carros'
        }
      },
      Motos: {
        screen: Motos,
        navigationOptions: {
          title: 'Motos'
        }
      }
    }, {
        initialRouteName: 'Carros',
        tabBarOptions: {
          activeTintColor: colors.white,
          inactiveTintColor: colors.black,
          indicatorStyle: {
            backgroundColor: colors.primaryDarkColor
          },
          style: {
            backgroundColor: colors.primaryColor,
            elevation: 0,
            borderBottomWidth: 0,
            borderBottomColor: colors.primaryColor
          }
        }
      }),
    navigationOptions: ({ navigation }) => ({
      headerLeft: null,
      headerRight: null,
      headerTitle: 'driver now',
      headerTitleStyle: { textAlign: 'center', flex: 1 },
      headerStyle: {
        backgroundColor: '#16164E'
      },
      headerTintColor: '#FFFFFF'
    }),
  }
});

export default createAppContainer(AppNavigator);


