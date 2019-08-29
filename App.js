import React from 'react';
import { createStackNavigator, createAppContainer, createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation';

import Carros from './src/screens/Carros';

const AppNavigator = createStackNavigator({
  Carros: {
    screen: Carros,
    navigationOptions: {
      header: null      
    }
  }
})

export default createAppContainer(AppNavigator);