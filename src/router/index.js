import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import { Opening, Login,  Home, AddFood, Messages, ForgotPassword, Register,  Calendar,  Chatting,  ChooseMentor, ImageIdentifier, RemainingBites } from '../pages';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigator } from '../components';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainApp = () => {
  return (
    <Tab.Navigator  screenOptions={{
      headerShown: false
    }} tabBar={props => <BottomNavigator {...props} />}>
      <Tab.Screen name="Home" component={Home}/>
    </Tab.Navigator>
  )
}

const Router = () => {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen
        name="Opening"
        component={Opening}
        options={{headerShown: false}}
      /> */}
       <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
       <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />  
      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{headerShown: false}}
      /> */}
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{headerShown: false}}
      /> */}
    </Stack.Navigator>
  );
};

export default Router;