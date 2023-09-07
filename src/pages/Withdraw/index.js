import {StyleSheet, Text, View, Alert} from 'react-native';
import React, {useCallback, useState} from 'react';
import {colors, showSuccess} from '../../utils';
import {useDispatch, useSelector} from 'react-redux';
import {setBalance} from '../../redux/balance-slice';
import {Button, Gap, Input} from '../../components';
import {useStripe} from '@stripe/stripe-react-native';
import Config from 'react-native-config';

const Withdraw = ({navigation}) => {
  const [amount, setAmount] = useState(0);
  const [accNumber, setAccNumber] = useState(0);
  const {createToken} = useStripe();
  const [routingNumber, setRoutingNumber] = useState(0);
  const [pin, setPin] = useState(0);
  const dispatch = useDispatch();
  const balance = useSelector(state => state.balance.value);
  const processWithdraw = () => {
    const email = 'pr.virakarin.acc@gmail.com';
    const response = fetch(
      `http://${Config.NODEJS_URL}:${Config.NODEJS_PORT}/payments/create-account`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email}),
      },
    )
      .then(res => {
        if (res.status === 200) {
          return res.json(nopx);
        } else {
          throw new Error('Error create payout request. Please try again.');
        }
      })
      .then(async data => {
        const tokenResponse = await createToken({
          type: 'bankAccount',
          bankAccount: {
            country: 'SG',
            currency: 'sgd',
            accountHolderType: 'individual',
            routingNumber: routingNumber,
            accountNumber: accNumber,
          },
        });
        if (tokenResponse.error) {
          throw tokenResponse.error;
        } else {
          return {tokenResponse: tokenResponse, data: data};
        }
      })
      .then(result => {
        console.log('data: ', result);
        console.log('data is here');
        const payoutResponse = fetch(
          `http://${Config.NODEJS_URL}:${Config.NODEJS_PORT}/payments/send-payout`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              accountId: result.data.accountId,
              bankToken: result.tokenResponse.token.id,
              amount: amount,
            }),
          },
        )
          .then(resp => {
            showSuccess('Withdraw S$' + amount + ' from your account');
            dispatch(setBalance(balance - amount));
            navigation.navigate('Home');
          })
          .catch(error => {
            throw error;
          });
      })
      .catch(error => {
        Alert.alert('Error', error.message);
      });
  };
  const handleWithdraw = useCallback(() => {
    if (amount == 0) {
      Alert.alert('Error', 'Invalid amount');
      return;
    }
    if (amount > balance) {
      Alert.alert('Error', 'Insufficient balance');
      return;
    }
    processWithdraw();
  }, [amount]);
  const handleNumber = useCallback(
    handler => value => {
      handler(Number(value));
    },
    [],
  );
  return (
    <View style={styles.page}>
      <View style={styles.circle1} />
      <View style={styles.circle2} />
      <View style={styles.circle3} />
      <View style={styles.header}>
        <Text style={styles.balance}>Current Balance</Text>
        <Text style={styles.amount}>S${balance}</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.head}>Withdraw</Text>
        <Gap height={20} />
        <View style={{width: '100%'}}>
          <Input
            fullWidth={true}
            onNumber
            onChangeText={handleNumber(setAmount)}
            label="Amount"
          />
        </View>
        <Gap height={20} />
        <View style={{width: '100%'}}>
          <Input
            secureTextEntry={true}
            fullWidth={true}
            onNumber={handleNumber(setPin)}
            label="Pin Number"
          />
        </View>
        <Gap height={20} />
        <View style={{width: '100%'}}>
          <Input
            fullWidth={true}
            onNumber={handleNumber(setRoutingNumber)}
            label="Routing Number"
          />
        </View>
        <Gap height={20} />
        <View style={{width: '100%'}}>
          <Input
            fullWidth={true}
            onNumber={handleNumber(setAccNumber)}
            label="Bank Account Number"
          />
        </View>
        <Gap height={30} />
        <Button
          textColor={colors.black}
          color={colors.secondary}
          onPress={handleWithdraw}
          text="Withdraw"></Button>
        <Gap height={20} />
        <Button
          textColor={colors.black}
          color={colors.secondary}
          onPress={() => navigation.goBack()}
          text="Back"></Button>
      </View>
    </View>
  );
};

export default Withdraw;

const styles = StyleSheet.create({
  page: {
    paddingTop: 30,
    backgroundColor: 'white',
    overflow: 'hidden',
    flexDirection: 'column',
    height: '100%',
    alignItems: 'center',
    display: 'flex',
  },
  head: {
    color: colors.white,
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
  },
  container: {
    backgroundColor: colors.primary,
    paddingVertical: 30,
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    paddingHorizontal: 30,
    width: '100%',
    flex: 4.5,
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
  },
  amount: {
    fontWeight: '700',
    color: colors.black,
    fontSize: 40,
  },
  balance: {
    fontWeight: '500',
    color: colors.black,
    fontSize: 20,
  },
  tag: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    flex: 1,
  },
  cvv: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  circle1: {
    backgroundColor: colors.circle2,
    height: 80,
    width: 80,
    borderRadius: 150,
    position: 'absolute',
    zIndex: -2,
    top: 30,
    right: 120,
  },
  circle2: {
    backgroundColor: colors.circle2,
    height: 90,
    width: 90,
    borderRadius: 100,
    position: 'absolute',
    zIndex: -2,
    top: 60,
    left: 270,
  },
  circle3: {
    backgroundColor: colors.circle2,
    height: 400,
    width: 400,
    borderRadius: 200,
    position: 'absolute',
    zIndex: -2,
    top: 40,
    right: 200,
  },
});
