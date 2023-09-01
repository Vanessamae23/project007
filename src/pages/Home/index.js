import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getData} from '../../utils/localStorage';
import {Card, Chip, Gap, Header, Button, Transaction} from '../../components';
import {SafeAreaView} from 'react-native-safe-area-context';
import {sampleTransactions} from '../History';
import {setBalance} from '../../redux/balance-slice';
import {useDispatch} from 'react-redux';
import Config from 'react-native-config';

export default function Home({navigation}) {
  const [username, setUsername] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    getData('user').then(res => {
      const data = res;
      setUsername(data.fullName);
    });
  }, []);

  useEffect(() => {
    fetch(`http://${Config.NODEJS_URL}:${Config.NODEJS_PORT}/payments/balance`)
      .then(res => res.json())
      .then(res => {
        dispatch(setBalance(res.balance));
      });
  }, []);

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
          subtitle={username}
        />
        <Card name={username} />
      </View>
      <View style={styles.box}>
        <Text style={styles.welcome}>Actions</Text>
        <ScrollView
          contentContainerStyle={{
            justifyContent: 'space-around',
            flex: 1,
          }}
          horizontal={true}
          style={styles.action}>
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
          {sampleTransactions.map((transaction, index) => (
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
    marginTop: 20,
    marginBottom: 15,
    maxWidth: 300,
    fontWeight: '600',
    color: 'black',
    fontWeight: '600',
  },
  box: {
    flex: 1,
    marginTop: 30,
    fontWeight: '600',
    color: 'black',
    fontWeight: '600',
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
    flex: 1,
    display: 'flex',
  },
  tran: {
    paddingHorizontal: 10,
  },
  subheader: {
    fontSize: 12,
    marginTop: -10,
    marginBottom: 10,
    backgroundColor: 'white',
    flex: 1,
  },
});
