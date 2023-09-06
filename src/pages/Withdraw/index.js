import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { colors, showError, showSuccess, useForm } from '../../utils'
import { Button, Gap, Input } from '../../components'
import Config from 'react-native-config'
import { useDispatch, useSelector } from 'react-redux'
import { getData } from '../../utils/localStorage'
import { setBalance } from '../../redux/balance-slice'

const Withdraw = ({navigation}) => {
    const [username, setUsername] = useState('');
    const [wallet, setWallet] = useState(0);
    const [pin, setPin] = useState('');
    const dispatch = useDispatch();
    const [form, setForm] = useForm({
        amount: 0,
        pin: 0
      });
      useEffect(() => {
        getData('user').then(res => {
          const data = res;
          setUsername(data.email);
          setWallet(data.walletId);
        });
      }, []);
      const balance = useSelector(state => state.balance.value);
      const [amount, setAmount] = useState(0);

      const handleSubmitPin = () => {
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
              handleSubmit();
            } else {
              throw new Error('Error pin authentication.');
            }
          })
          .catch(error => {
            showError("Error authenticating")
          });
      }
      const handleSubmit = () => {
        if(amount > balance) {
            throw new Error("Money withdrawn exceeded")
        }
        fetch(`http://${Config.NODEJS_URL}:${Config.NODEJS_PORT}/payments/withdraw`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
           },
           body: JSON.stringify({
            amount: amount
        })
        })
        .then(res => {
        if (res.status === 200) {
            console.log(res);
        } else {
            throw new Error('Error pin authentication.');
        }
        })
        .then(res => {
            console.log(res)
            fetch(
              `http://${Config.NODEJS_URL}:${Config.NODEJS_PORT}/payments/deduct`,
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
              let final = balance - amount;
              showSuccess('Withdrawn S$' + amount + ' to your account');
              dispatch(setBalance(final));
              navigation.navigate('Home');
            });
          })
        .catch(error => {
        showError(error.message)
        });
      }
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
            <View style={{ width: '100%' }}>
                <Input fullWidth={true} onNumber label="Amount" onChangeText={handleNumber(setAmount)} />
            </View>
            <Gap height={20} />
            <View style={{ width: '100%' }}>
                <Input secureTextEntry={true} fullWidth={true} onNumber label="Pin Number" onChangeText={value => {
                setPin(value)
              }} />
            </View>
            <Gap height={50} />
            <Button textColor={colors.black} color={colors.secondary} onPress={handleSubmit} text="Withdraw"></Button>
            <Gap height={20} />
            <Button textColor={colors.black} color={colors.secondary} onPress={() => navigation.goBack()} text="Back"></Button>
        </View>
    </View>
  )
}

export default Withdraw

const styles = StyleSheet.create({
    page: {
        paddingTop: 30,
        backgroundColor: "white",
        overflow: 'hidden',
        flexDirection: 'column',
        height: '100%',
        alignItems: "center",
        display: 'flex',
    },
    head: {
        color: colors.white,
        fontSize: 24,
        fontWeight: '600',
        textAlign: "center"
    },
    container: {
        backgroundColor: colors.primary,
        paddingVertical: 50,
        borderTopEndRadius: 30,
        borderTopStartRadius: 30,
        paddingHorizontal: 30,
        width: '100%',
        flex: 2,
        display: 'flex',
        flexDirection: 'column'
    },
    header: {
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        flex: 1
    },
    amount: {
        fontWeight: '700',
        color: colors.black,
        fontSize: 40
    },
    balance: {
        fontWeight: '500',
        color: colors.black,
        fontSize: 20
    },
    tag: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        flex: 1
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
    right: 120
  },
  circle2: {
    backgroundColor: colors.circle2,
    height: 90,
    width: 90,
    borderRadius: 100,
    position: 'absolute',
    zIndex: -2,
    top: 60,
    left: 270
  },
  circle3: {
    backgroundColor: colors.circle2,
    height: 400,
    width: 400,
    borderRadius: 200,
    position: 'absolute',
    zIndex: -2,
    top: 40,
    right: 200
  }
})