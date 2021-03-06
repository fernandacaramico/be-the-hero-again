import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
// NavigationContainer <está para> mobile <assim como>
// BrowserContainer <está para> web
// tem que SEMPRE ir por volta das rotas!!

import { createStackNavigator } from '@react-navigation/stack';

const AppStack = createStackNavigator();

import Incidents from './pages/Incidents';
import Detail from './pages/Detail';

export default function Routes() {
  return(
    <NavigationContainer> 

      <AppStack.Navigator screenOptions={{ headerShown: false }} >

        <AppStack.Screen name="Incidents" component={Incidents}/>
        <AppStack.Screen name="Detail" component={Detail}/>

      </AppStack.Navigator>

    </NavigationContainer>
  );
}