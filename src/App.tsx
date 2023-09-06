// import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Router from './router';
import FlashMessage from 'react-native-flash-message';
import { Provider, useSelector } from 'react-redux';
import store from './redux/store';
import { LogBox } from 'react-native';
import { StripeProvider } from '@stripe/stripe-react-native';
import Config from 'react-native-config';
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
  const key = `${Config.STRIPE_PUBLISHABLE_KEY}`
  return (
    <StripeProvider
      publishableKey={key}
      urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
      merchantIdentifier="merchant.com.{{YOUR_APP_NAME}}" // required for Apple Pay
    >
      <Provider store={store}>
        <MainApp />
      </Provider>
    </StripeProvider>
    
  );
}

export default App;