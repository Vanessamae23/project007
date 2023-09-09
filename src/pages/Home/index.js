import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import {Card, Chip, Gap, Header, Button, Transaction} from '../../components';
import {SafeAreaView} from 'react-native-safe-area-context';
import {sampleTransactions} from '../History';
import {setBalance} from '../../redux/balance-slice';
import {useDispatch, useSelector} from 'react-redux';
import Config from 'react-native-config';
import { getData } from '../../utils/localStorage';
import { useFocusEffect } from '@react-navigation/native';

export default function Home({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const username = useSelector(state => state.profile.fullName);
  const [wallet, setWallet] = useState(0);
  const [name, setName] = useState('')
  const [bal, setBal] = useState(0)
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getData('user').then(res => {
      const data = res;
      console.log(res)
      setWallet(data.walletId);
      setName(data.fullName);
    });
  }, []);

  useEffect(() => {
    fetch(`${Config.NODEJS_URL}payments/balance`)
      .then(res => res.json())
      .then(res => {  
        setBal(bal)
        dispatch(setBalance(res.balance));
      });
  }, [bal]);

  useFocusEffect(
    useCallback(() => {
      fetch(`${Config.NODEJS_URL}payments/transactions`)
        .then(res => res.json())
        .then(res => {
          // set only 5 latest transactions
          setTransactions(res.transactions.slice(0, 5));
        });
  
      // Cleanup function to prevent memory leaks, if necessary
      return () => {};
    }, [])
  );  

  const handleTopUp = () => {};

  const handleTransfer = () => {};

  return (
    <View style={styles.page}>
      <View style={styles.box1}>
        <Header
          navigation={navigation}
          onPress={() => setModalVisible(!modalVisible)}
          modalVisible={modalVisible}
          title="Good day,"
          subtitle={name}
        />
        <Card name={name} wallet={wallet} bal={bal}/>
      </View>
      <View style={styles.box}>
        <Text style={styles.welcome}>Actions</Text>
        <ScrollView
          contentContainerStyle={{
            justifyContent: 'space-around',
            flex: 1,
          }}
          horizontal={true}
          >
          <Chip
            onPress={() => navigation.navigate('TopUp')}
            type="Top up"
            title="Top Up"
          />
          <Chip
            type="Transfer"
            title="Transfer"
            onPress={() => navigation.navigate('Transfer')}
          />
          <Chip
            title="Withdraw"
            onPress={() => navigation.navigate('Withdraw')}
          />
        </ScrollView>
      </View>
      <View style={styles.box}>
        <Text style={styles.welcome}>Latest Transactions</Text>
        <Text
          style={styles.subheader}
          onPress={() => navigation.navigate('History')}>
          View All Transactions
        </Text>
        <ScrollView style={styles.tran}>
          {transactions.map((transaction, index) => (
            <Transaction key={index} {...transaction} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  welcome: {
    fontSize: 22,
    marginTop: 10,
    marginBottom: 15,
    maxWidth: 300,
    fontWeight: '600',
    color: 'black',
    fontWeight: '600',
  },
  box: {
    flex: 1,
    fontWeight: '600',
    color: 'black',
  },
  page: {
    paddingTop: 30,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  action: {
    maxHeight: 'min-content',
    height: 20,
    backgroundColor: 'grey'
  },
  tran: {
    paddingHorizontal: 10,
  },
  subheader: {
    fontSize: 16,
    marginTop: -10,
    marginBottom: 10,
    backgroundColor: 'white',
  },
});
