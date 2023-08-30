import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import { colors, useForm } from '../../utils'
import { Button, Gap, Input, Transaction } from '../../components'

export const sampleTransactions = [
    {
        type: "Transfer", // Transfer, Top Up, Withdraw
        contact: {
            name: "Puri",
            number: "91234567"
        },
        date: "2023-08-30",
        amount: 20.00,
    },
    {
        type: "Transfer", // Transfer, Top Up, Withdraw
        contact: {
            name: "Puri",
            number: "91234567"
        },
        date: "2023-08-30",
        amount: -15.23,
    },
    {
        type: "Transfer", // Transfer, Top Up, Withdraw
        contact: {
            name: null,
            number: "91220932"
        },
        date: "2023-08-28",
        amount: -10.00,
    },
    {
        type: "Top Up", // Transfer, Top Up, Withdraw
        contact: null,
        date: "2023-08-26",
        amount: 20.00
    },
    {
        type: "Withdraw", // Transfer, Top Up, Withdraw
        contact: null,
        date: "2023-08-25",
        amount: -10.00
    },
];

const groupedTransactions = sampleTransactions.reduce((acc, curr) => {
    if (!acc[curr.date]) {
        acc[curr.date] = [];
    }
    acc[curr.date].push(curr);
    return acc;
}, {});


const History = ({ navigation }) => {
    return (
        <View style={styles.page}>
            <View style={styles.box}>
                <Text style={styles.welcome}>Transaction History</Text>
                <ScrollView style={styles.tran}>
                    {Object.entries(groupedTransactions).map(([date, transactions]) => (
                        <View key={date}>
                            <Text style={styles.dateHeader}>{date}</Text>
                            {transactions.map((transaction, index) => (
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