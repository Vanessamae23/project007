import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../../../utils'

const Transaction = ({ type, contact, date, amount, showDate = true }) => {
    const getDescription = () => {
        switch (type) {
            case "Transfer":
                return contact.name ?? contact.number;
            case "Top Up":
                return "Top Up";
            case "Withdraw":
                return "Withdraw";
            default:
                return "";
        }
    };

    return (
        <View style={styles.card}>
            <View>
                <Text style={styles.name}>{getDescription()}</Text>
                {showDate && <Text style={styles.date}>{date}</Text>}
            </View>
            <View>
                <Text style={styles.amount}>{amount.toFixed(2)}</Text>
            </View>
        </View>
    );
}

export default Transaction;

const styles = StyleSheet.create({
    card: {
        height: 'fit-content',
        paddingBottom: 10,
        paddingTop: 10,
        borderBottomWidth: 1,
        borderColor: colors.black,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center'
    },
    name: {
        fontSize: 18,
        fontWeight: '500',
        color: colors.black
    },
    date: {
        fontSize: 12
    },
    amount: {
        fontSize: 20,
        color: colors.black
    }
});
