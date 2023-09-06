import {StyleSheet, Text, View, Alert} from 'react-native';
import React, {useState, useCallback, useEffect} from 'react';
import {colors, showError, showSuccess, useForm} from '../../utils';
import {Button, Gap, Input} from '../../components';
import {useSelector} from 'react-redux';
import {setBalance} from '../../redux/balance-slice';
import {useDispatch} from 'react-redux';
import {CardField, useConfirmPayment, useStripe} from '@stripe/stripe-react-native';
import Config from 'react-native-config';
import { getData } from '../../utils/localStorage';

const TopUp = ({navigation}) => {
  const [otp, setOtp] = useState('');
  const [username, setUsername] = useState('');
  const [wallet, setWallet] = useState(0);

  const [showOtpInput, setShowOtpInput] = useState(false);
  const [referenceCode, setReferenceCode] = useState('');
  const [amount, setAmount] = useState(0);
  const [pin, setPin] = useState('');
  const { confirmPayment } = useConfirmPayment();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [form, setForm] = useForm({
    pin: ''
  });

  useEffect(() => {
    getData('user').then(res => {
      const data = res;
      setUsername(data.email);
      setWallet(data.walletId);
    });
  }, []);
  const balance = useSelector(state => state.balance.value);

  const handleHighTopUp = () => {
    setShowOtpInput(true);
    fetch(`http://${Config.NODEJS_URL}:${Config.NODEJS_PORT}/email/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error('Error sending OTP. Please try again.');
        }
      })
      .then(data => {
        setReferenceCode(data.message);
      })
      .catch(error => {
        Alert.alert('Error', error.message);
      });
  };


  const processPayment = () => {
    const billingDetails = {
      email: username,
    };
    fetch(
      `http://${Config.NODEJS_URL}:${Config.NODEJS_PORT}/payments/intents`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount * 100,
          pin: pin,
          billingDetails: billingDetails,
          payment_method_types: 'card',
        }),
      },
    )
      .then(async (res) => {
        const result = await res.json();
        console.log(result)
        const {paymentIntent, error} = await confirmPayment(result.client_secret, {
          paymentMethodType: 'Card',
          paymentMethodData: {
            billingDetails,
          },
        });
        if (error) {
          throw new Error('Payment confirmation error', error);
        } 
      })
      .then(res => {
        console.log(res)
        fetch(
          `http://${Config.NODEJS_URL}:${Config.NODEJS_PORT}/payments/topup`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              amount: amount,
            }),
          },
        ).then(resp => {
          let final = balance + amount;
          showSuccess('Added S$' + amount + ' to your account');
          dispatch(setBalance(final));
          navigation.navigate('Home1');
        });
      })
      .catch(err => {
        showError(err.message)
      });
  };



  const handleOtpSubmit = useCallback(() => {
    fetch(`http://${Config.NODEJS_URL}:${Config.NODEJS_PORT}/email/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        otp: otp,
      }),
    }).then(res => {
      if (res.status === 200) {
        setShowOtpInput(false);
        Alert.alert('Success', 'OTP verified successfully.');
        processPayment();
        return;
      } else {
        Alert.alert('Error', 'Incorrect OTP. Please try again.');
      }
    });
  }, [otp]);

  const handleSubmit = () => {
    fetch(`http://${Config.NODEJS_URL}:${Config.NODEJS_PORT}/payments/confirmPin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pin: pin,
      }),
    })
      .then(res => {
        if (res.status === 200) {
          handleTopup();
        } else {
          throw new Error('Error pin authentication.');
        }
      })
      .catch(error => {
        showError("Error authenticating")
      });
  }

  const handleTopup = useCallback(() => {
    if (amount == 0) {
      Alert.alert('Error', 'Invalid amount.');
      return;
    }
    if (amount > 1000000000) {
      handleHighTopUp();
      return;
    }
    processPayment();
  }, [amount]);
  const handleNumber = useCallback(
    handler => value => {
      handler(Number(value));
    },
    [],
  );

 
  useEffect(() => {}, [loading, referenceCode]);
  return (
    <View style={styles.page}>
      <View style={styles.circle1} />
      <View style={styles.circle2} />
      <View style={styles.circle3} />
      <View style={styles.header}>
        <Text style={styles.balance}>Current Balance</Text>
        <Text style={styles.price}>S${balance}</Text>
      </View>
      {!showOtpInput && (
        <View style={styles.container}>
          <Text style={styles.head}>Top Up</Text>
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
              onNumber
              onChangeText={value => {
                setPin(value)
              }}
              label="Pin Number"
            />
          </View>
          <Gap height={30} />
          <View>
            <CardField
              style={{
                borderColor: colors.primary,
                borderWidth: 1,
                height: 60,
                borderRadius: 4
              }}
              postalCodeEnabled={false}
              placeholder={{
                number: '',
              }}
              onCardChange={cardDetails => {
              }}
            />
          </View>
          <Gap height={30} />
          <Button
            textColor={colors.black}
            color={colors.secondary}
            onPress={handleSubmit}
            text="Top Up"></Button>
          <Gap height={20} />
          <Button
            textColor={colors.black}
            color={colors.secondary}
            onPress={() => navigation.goBack()}
            text="Back"></Button>
        </View>
      )}
      {showOtpInput && (
        <View style={styles.container}>
          <Text style={styles.head}>Enter OTP</Text>
          <Gap height={5} />
          <Text style={styles.subhead}>OTP has been already sent</Text>
          <Text style={styles.subhead}>Please check your email</Text>
          <Gap height={5} />
          <Text style={styles.subsubhead}>Reference Code {referenceCode}</Text>
          <Gap height={20} />
          <View style={{width: '100%'}}>
            <Input
              fullWidth={true}
              onNumber
              onChangeText={setOtp}
              label="OTP"
            />
          </View>
          <Gap height={30} />
          <Button
            text="Submit OTP"
            textColor={colors.black}
            color={colors.secondary}
            onPress={handleOtpSubmit}
          />
          <Gap height={20} />
          <Button
            text="Resend OTP"
            textColor={colors.black}
            color={colors.secondary}
            onPress={handleHighTopUp}
          />
          <Gap height={20} />
          <Button
            textColor={colors.black}
            color={colors.secondary}
            onPress={() => setShowOtpInput(false)}
            text="Back"></Button>
        </View>
      )}
    </View>
  );
};

export default TopUp;

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
  subhead: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '300',
    textAlign: 'center',
  },
  subsubhead: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  container: {
    backgroundColor: colors.primary,
    paddingVertical: 40,
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    paddingHorizontal: 30,
    width: '100%',
    flex: 3.5,
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
