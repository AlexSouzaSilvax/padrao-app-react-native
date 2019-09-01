import React, { Component } from 'react';
import { Image } from 'react-native';
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation';

import Login from './src/screens/Login';
import Carros from './src/screens/Carros';
import Motos from './src/screens/Motos';
import Caminhao from './src/screens/Caminhao';
import DetalheVeiculo from './src/screens/DetalheVeiculo';

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
          title: 'Carros',
          tabBarIcon: <Image source={require('./assets/carVer.png')} style={{ width: 40, height: 40 }} />
        }
      },
      Motos: {
        screen: Motos,
        navigationOptions: {
          title: 'Motos',
          tabBarIcon: <Image source={require('./assets/motoVerBran.png')} style={{ width: 40, height: 40 }} />
        }
      },
      Caminhao: {
        screen: Caminhao,
        navigationOptions: {
          title: 'Caminhões',
          tabBarIcon: <Image source={require('./assets/truckVerBran.png')} style={{ width: 38, height: 38 }} />
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
  },
  DetalheVeiculo: {
    screen: DetalheVeiculo
  }
});

export default createAppContainer(AppNavigator);


