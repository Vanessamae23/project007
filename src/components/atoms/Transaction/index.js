import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../../../utils';

const Transaction = ({transactionType, contact, timestamp, amount, showDate = true}) => {
  const getDescription = () => {
    switch (transactionType) {
      case 'transfer':
        return contact.fullName ?? contact.email;
      case 'topup':
        return 'Top Up';
      case 'withdraw':
        return 'Withdraw';
      default:
        return '';
    }
  };

  // get both date and time
  const date = new Date(timestamp).toLocaleString();

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
};

export default Transaction;

const styles = StyleSheet.create({
  card: {
    height: 'auto',
    paddingBottom: 10,
    paddingTop: 10,
    borderBottomWidth: 1,
    borderColor: colors.black,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.black,
  },
  date: {
    fontSize: 12,
  },
  amount: {
    fontSize: 20,
    color: colors.black,
  },
});
