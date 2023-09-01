import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useCallback, useEffect } from 'react'
import { colors, useForm } from '../../utils'
import { Button, Gap, Input } from '../../components'
import { useSelector } from 'react-redux';
import { setBalance } from '../../redux/balance-slice';
import { useDispatch } from 'react-redux'

const TopUp = ({navigation}) => {
    const [amount, setAmount] = useState(0);
    const [pin, setPin] = useState(0);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const balance = useSelector(state => state.balance.value);
    const handleTopup = useCallback(() => {
        fetch('http://10.0.2.2:3000/payments/intents', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount: amount,
                payment_method_types: ['card']
            }),
        })
        .then(res => {
            fetch('http://10.0.2.2:3000/payments/balance', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: amount,
                }),
            }).then(resp => {
                let final = balance + amount;
              dispatch(setBalance(final));
            })
        })
        .catch((err) => {
            console.log(err)
        });

    }, [amount]);
    const handleNumber = useCallback(handler => (value) => {
        handler(Number(value));
    }, []);
    useEffect(() => {

    }, [loading])
    return (
    <View style={styles.page}>
        <View style={styles.circle1} />
        <View style={styles.circle2} />
        <View style={styles.circle3} />
        <View style={styles.header}>
            <Text style={styles.balance}>Current Balance</Text>
            <Text style={styles.price}>S${balance}</Text>
        </View>
        <View style={styles.container}>
            <Text style={styles.head}>Top Up</Text>
            <Gap height={20} />
            <View style={{ width: '100%' }}>
                <Input fullWidth={true} onNumber onChangeText={handleNumber(setAmount)} label="Amount"  />
            </View>
            <Gap height={20} />
            <View style={{ width: '100%' }}>
                <Input secureTextEntry={true} fullWidth={true} onNumber={handleNumber(setPin)} label="Pin Number"  />
            </View>
            <Gap height={50} />
            <Button textColor={colors.black} color={colors.secondary} onPress={handleTopup} text="Top Up"></Button>
            <Gap height={20} />
            <Button textColor={colors.black} color={colors.secondary} onPress={() => navigation.goBack()} text="Back"></Button>
        </View>
    </View>
    )
}

export default TopUp

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