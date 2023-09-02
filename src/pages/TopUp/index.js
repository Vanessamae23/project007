import {StyleSheet, Text, View, Alert} from 'react-native';
import React, {useState, useCallback, useEffect} from 'react';
import {colors, showSuccess, useForm} from '../../utils';
import {Button, Gap, Input} from '../../components';
import {useSelector} from 'react-redux';
import {setBalance} from '../../redux/balance-slice';
import {useDispatch} from 'react-redux';
import {CardField, useStripe} from '@stripe/stripe-react-native';
import Config from 'react-native-config';

const TopUp = ({navigation}) => {
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [amount, setAmount] = useState(0);
  const [pin, setPin] = useState(0);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const balance = useSelector(state => state.balance.value);

  const handleHighTopUp = () => {
    setShowOtpInput(true);
    fetch(`http://${Config.NODEJS_URL}:${Config.NODEJS_PORT}/email/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  const processPayment = () => {
    const billingDetails = {
      email: 'email@stripe.com',
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
          billingDetails: billingDetails,
          payment_method_types: ['card'],
        }),
      },
    )
      .then(res => {
        fetch(
          `http://${Config.NODEJS_URL}:${Config.NODEJS_PORT}/payments/balance`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              amount: amount * 100,
            }),
          },
        ).then(resp => {
          let final = balance + amount;
          showSuccess('Added S$' + amount + ' to your account');
          dispatch(setBalance(final));
          navigation.navigate('Home');
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

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

  const handleTopup = useCallback(() => {
    if (amount > 1000) {
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
  useEffect(() => {}, [loading]);
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
              onNumber={handleNumber(setPin)}
              label="Pin Number"
            />
          </View>
          <Gap height={30} />
          <View>
            <CardField
              style={{
                height: 30,
              }}
              postalCodeEnabled={false}
              placeholder={{
                number: '4242 4242 4242 4242',
              }}
              onCardChange={cardDetails => {}}
            />
          </View>
          <Gap height={30} />
          <Button
            textColor={colors.black}
            color={colors.secondary}
            onPress={handleTopup}
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
          <Text style={styles.subhead}>OTP has been already sent.</Text>
          <Text style={styles.subhead}>Please check your email.</Text>
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
