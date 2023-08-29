import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Router from './router';
import FlashMessage from 'react-native-flash-message';
import {Provider, useSelector} from 'react-redux';
import store from './redux/store';
import {LogBox} from 'react-native';
// import {StripeProvider} from '@stripe/stripe-react-native';
//import { Loading } from './components';
LogBox.ignoreLogs([
  'Warning: Async Storage has been extracted from react-native core',
]);

const MainApp = () => {
  const stateGlobal = useSelector(state => state);
  return (
    <>
      {/* <StripeProvider
        publishableKey={process.env.STRIPE_PUBLISHABLE_KEY ?? ''}
        merchantIdentifier="merchant.identifier" // required for Apple Pay
        urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
      > */}
      <NavigationContainer>
        <Router />
      </NavigationContainer>
      <FlashMessage position="top" />
      {/* {stateGlobal.loading && <Loading />} */}
      {/* </StripeProvider> */}
    </>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
};

export default App;
