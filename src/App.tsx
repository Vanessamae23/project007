// import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Router from './router';
import FlashMessage from 'react-native-flash-message';
import { Provider, useSelector } from 'react-redux';
import store from './redux/store';
import { LogBox } from 'react-native';
//import { Loading } from './components';
LogBox.ignoreLogs(['Warning: Async Storage has been extracted from react-native core']);
 
const MainApp = () => {
  const stateGlobal = useSelector(state => state)
  return (
    <>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
      <FlashMessage position="top" />
      {/* {stateGlobal.loading && <Loading />} */}
    </>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
}

export default App;