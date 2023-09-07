import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, useForm } from '../../utils'
import { Button, Gap, Input, Transaction } from '../../components'
import Config from 'react-native-config';

export const sampleTransactions = [
    {
        transactionType: "transfer",
        contact: {
            email: "puri@gmail.com",
            fullName: "Puri",
            walletId: "270971537447"
        },
        amount: -20.00,
        timestamp: 1694103559869
    },
    {
        transactionType: "transfer",
        contact: {
            email: "puri@gmail.com",
            fullName: "Puri",
            walletId: "270971537447"
        },
        amount: -20.00,
        timestamp: 1694103559869
    },
    {
        transactionType: "transfer",
        contact: {
            email: "puri@gmail.com",
            fullName: "Puri",
            walletId: "270971537447"
        },
        amount: -20.00,
        timestamp: 1694103559869
    },
    {
        transactionType: "transfer",
        contact: {
            email: "puri@gmail.com",
            fullName: "Puri",
            walletId: "270971537447"
        },
        amount: -20.00,
        timestamp: 1694103559869
    },
    {
        transactionType: "transfer",
        contact: {
            email: "puri@gmail.com",
            fullName: "Puri",
            walletId: "270971537447"
        },
        amount: 20.00,
        timestamp: 1694083359869
    },
    {
        transactionType: "topup",
        contact: null,
        amount: 10,
        timestamp: 1684103559869
    },
    {
        transactionType: "withdraw",
        contact: null,
        amount: -10,
        timestamp: 1594203559569
    },
    {
        transactionType: "withdraw",
        contact: null,
        amount: -10,
        timestamp: 1594203559569
    }
];

const History = ({ navigation }) => {
    const [transactions, setTransactions] = useState({});

    useEffect(() => {
        fetch(`http://${Config.NODEJS_URL}:${Config.NODEJS_PORT}/payments/transactions`)
            .then(res => res.json())
            .then(res => {
                // Group transactions by date
                setTransactions(res.transactions.reduce((acc, curr) => {
                    const date = new Date(curr.timestamp).toLocaleDateString();
                    if (!acc[date]) {
                        acc[date] = [];
                    }
                    acc[date].push(curr);
                    return acc;
                }
                    , {}));
            });
    }, []);

    return (
        <View style={styles.page}>
            <View style={styles.box}>
                <Text style={styles.welcome}>Transaction History</Text>
                <ScrollView style={styles.tran}>
                    {Object.entries(transactions).map(([date, groupedTransactions]) => (
                        <View key={date}>
                            <Text style={styles.dateHeader}>{date}</Text>
                            {groupedTransactions.map((transaction, index) => (
                                <Transaction key={index} {...transaction} showDate={false} />
                            ))}
                        </View>
                    ))}
                </ScrollView>
                <Button textColor={colors.black} color={colors.secondary} onPress={() => navigation.goBack()} text="Back"></Button>
            </View>
        </View>
    )
};

export default History;

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
    box: {
        flex: 1,
        width: '80%',
        paddingBottom: 20
    },
    welcome: {
        fontSize: 22,
        marginTop: 20,
        marginBottom: 15,
        maxWidth: 300,
        fontWeight: "600",
        color: 'black',
        fontWeight: '600'
    },
    tran: {
        paddingHorizontal: 10
    },
    dateHeader: {
        fontSize: 20,
        fontWeight: '800',
        marginTop: 20,
        color: colors.primary,
    }
});