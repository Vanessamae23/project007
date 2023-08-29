import {StyleSheet, ScrollView, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getData} from '../../utils/localStorage';
import {Card, Header, Button} from '../../components';
import {useStripe} from '@stripe/stripe-react-native';
import {useHttpsCallable} from '../../utils/useHttpsCallable';

export default function Home() {
  const [username, setUsername] = useState('');

  const createPaymentIntent = useHttpsCallable('createPaymentIntent');
  // console.log('createPaymentIntent: ', createPaymentIntent);

  const {initPaymentSheet, presentPaymentSheet} = useStripe();

  useEffect(() => {
    getData('user').then(res => {
      const data = res;
      setUsername(data.fullName);
    });
  }, []);

  const createTenant = async () => {
    // add up the product totals TBC
    const amount = 20;

    // if (amount > 0) {
    // call the cloud function to create a new
    // Payment Intent with the calculated total
    // const paymentIntent = await createPaymentIntent.call({
    //   amount: amount * 100,
    // });
    //storeData('paymentIntent', paymentIntent);
    // }

    const response = await fetch(
      'http://localhost:5001/tiktok/us-central1/createPaymentIntent',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            amount: 999,
          },
        }),
      },
    );

    // console.log('Response: ', response._bodyBlob._data.blobId);

    // const paymentIntent = response._bodyBlob._data.blobId;
    console.log('paymentIntent: ', paymentIntent); 

    const paymentIntent = "pi_3Nk4hxDNoOorWK5q1xwFjliW_secret_MpKzL03bt6wOZcgqrKsQL62OJ";

    const initResponse = await initPaymentSheet({
      merchantDisplayName: 'notJust.dev',
      paymentIntentClientSecret: paymentIntent,
    });
    if (initResponse.error) {
      console.log(initResponse.error);
      // Alert.alert('Something went wrong');
      return;
    }

    const paymentResponse = await presentPaymentSheet();

    if (paymentResponse.error) {
      // Alert.alert(
      //   `Error code: ${paymentResponse.error.code}`,
      //   paymentResponse.error.message,
      // );
      return;
    }
    return;
  };

  return (
    <ScrollView style={styles.page}>
      <Header title="Good day," subtitle={username} />
      <Card name={username} />
      <Text style={styles.welcome}>Actions</Text>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}>
        <Button text="createTenant" onPress={createTenant} />
        <Button text="Transfer" onPress={createTenant} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  welcome: {
    fontSize: 22,
    marginTop: 30,
    marginBottom: 15,
    maxWidth: 300,
    fontWeight: '600',
    color: 'black',
    fontWeight: '600',
  },
  page: {
    paddingTop: 30,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    flex: 1,
  },
});
