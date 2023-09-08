import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import { Opening, Login, Register, Home, TopUp, Transfer, TransferAmount, Withdraw, History, Profile, Email, ResetPassword, Guardian } from '../pages';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigator } from '../components';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { colors } from '../utils';
import { SideBar } from '../components';
import { useNavigation } from '@react-navigation/native';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// const MainApp = () => {
//   return (
//     <Tab.Navigator  screenOptions={{
//       headerShown: false
//     }} tabBar={props => <BottomNavigator {...props} />}>
//       <Tab.Screen name="Home" component={Home}/>
//       <Tab.Screen name="Profile" component={Home}/>
//     </Tab.Navigator>
//   )
// }

const MainAppStack = createStackNavigator();

const MainApp = () => {
  return (
    <MainAppStack.Navigator>
      <MainAppStack.Screen
        name="Opening"
        component={Opening}
        options={{ headerShown: false }}
      />
      <MainAppStack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <MainAppStack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />
      <MainAppStack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <MainAppStack.Screen
        name="TopUp"
        component={TopUp}
        options={{ headerShown: false }}
      />
      <MainAppStack.Screen
        name="Transfer"
        component={Transfer}
        options={{ headerShown: false }}
      />
      <MainAppStack.Screen
        name="TransferAmount"
        component={TransferAmount}
        options={{ headerShown: false }}
      />
      <MainAppStack.Screen
        name="Withdraw"
        component={Withdraw}
        options={{ headerShown: false }}
      />
      <MainAppStack.Screen
        name="History"
        component={History}
        options={{ headerShown: false }}
      />
      <MainAppStack.Screen
        name="Change email"
        component={Email}
        options={{ headerShown: false }}
      />
      <MainAppStack.Screen
        name="Change password"
        component={ResetPassword}
        options={{ headerShown: false }}
      />
    </MainAppStack.Navigator>
  );
};
const Router = () => {
  return (
    <Drawer.Navigator 
      drawerContent={props => <SideBar {...props} />} 
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: colors.primary,
        drawerActiveTintColor: 'white',
        drawerLabelStyle: {
          fontSize: 15,
        }
      }}>
      <Drawer.Screen name="Dashboard" component={MainApp} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Guardian" component={Guardian} />
    </Drawer.Navigator>
  )
}

export default Router;