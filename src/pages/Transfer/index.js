import React, {useState, useEffect, useCallback, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {colors, showError, showSuccess, useForm} from '../../utils';
import {Button, Gap, Input} from '../../components';
import {Contactlist} from '../../components/atoms/Contact';
import Config from 'react-native-config';
import { setBalance } from '../../redux/balance-slice';
import TransferModal from '../../components/atoms/TransferModal';


const Transfer = ({navigation}) => {
  const [query, setQuery] = useState('');
  const [contacts, setContacts] = useState([]);
  const [isQueryJustChanged, setIsQueryJustChanged] = useState(false);
  const queryJustChangedTimer = useRef(null);
  const [isSearching, setIsSearching] = useState(false);
  const balance = useSelector(state => state.balance.value);
  const dispatch = useDispatch();
  const [currentUserContact, setCurrentUserContact] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSearchContact = useCallback(query => {
    if (!isSearching && query.length >= 2) {
      fetch(`http://${Config.NODEJS_URL}:${Config.NODEJS_PORT}/payments/find-users?email=${query}`)
        .then(res => res.json())
        .then(res => {
          setIsSearching(false);
          setContacts(res.users);
        })
        .catch(() => {
          showError("failed to find users");
        });
    }
  }, [isSearching]);

  useEffect(() => {
    fetch(`http://${Config.NODEJS_URL}:${Config.NODEJS_PORT}/payments/balance`)
      .then(res => res.json())
      .then(res => {
        dispatch(setBalance(res.balance));
      });
  }, [navigation]);

  const handleContactPress = contact => {
    setIsModalVisible(true);
    setCurrentUserContact(contact)
    //navigation.navigate('TransferAmount', {contact});
  };
  // Use effect to filter contacts when query changes
  useEffect(() => {
    if (!isQueryJustChanged) {
      handleSearchContact(query);
    }
  }, [query, isQueryJustChanged]);

  const isValidPhoneNumber = number => {
    return number.length <= 8 && /^\d+$/.test(number);
  };

  const handleOnClose = () => {
    setIsModalVisible(false);
  }

  return (
    <View style={styles.page}>
      <View style={styles.circle1} />
      <View style={styles.circle2} />
      <View style={styles.circle3} />
      <View style={styles.header}>
        <Text style={styles.balance}>Current Balance</Text>
        <Text style={styles.amount}>S${balance}</Text>
      </View>
      <View style={styles.contacts}>
        <TextInput
          style={styles.search}
          placeholder="Search name or enter number"
          onChangeText={text => {
            setQuery(text);
            setIsQueryJustChanged(true);
            clearTimeout(queryJustChangedTimer.current);
            queryJustChangedTimer.current = setTimeout(() => {
              setIsQueryJustChanged(false);
            }, 1000);
          }}
        />
        {contacts.length > 0 ? (
          <ScrollView>
            <Contactlist
              title="All contacts"
              contacts={contacts}
              onContactPress={handleContactPress}
            />
          </ScrollView>
        ) : isValidPhoneNumber(query) ? (
          <ScrollView>
            <Contactlist
              title="Unknown contact"
              contacts={[{name: 'Unknown', number: query}]}
              onContactPress={handleContactPress}
            />
          </ScrollView>
        ) : (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: colors.black}}>No contacts found</Text>
          </View>
        )}
        <Button
          textColor={colors.blacsdk}
          color={colors.secondary}
          onPress={() => navigation.goBack()}
          text="Back"></Button>
      </View>
      <TransferModal visible={isModalVisible} onClose={handleOnClose} contact={currentUserContact} navigation={navigation}/>
    </View>
  );
};

const TransferAmount = ({route, navigation}) => {
  const {contact} = route.params; // Getting the contact passed from the Transfer page

  const [amount, setAmount] = useState(0);
  const [pin, setPin] = useState('');
  const balance = useSelector(state => state.balance.value);
  const dispatch = useDispatch();
  const [currentUserContact, setCurrentUserContact] = useState(false);

  const handleTransfer = useCallback(() => {
    if (!amount || parseFloat(amount) <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid transfer amount.');
      return;
    }

    fetch(
      `http://${Config.NODEJS_URL}:${Config.NODEJS_PORT}/payments/transfer`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid: contact.uid,
          amount: amount,
          pin: pin,
        }),
      }
    )
      .then(res => res.json())
      .then(res => {
        if (res.message === 'success') {
          navigation.goBack();
          showSuccess(`Success! You've transferred ${amount} to ${contact.name}`);
        } else {
          showError('Failed to transfer');
        }
      })
      .then(() => {
        fetch(`http://${Config.NODEJS_URL}:${Config.NODEJS_PORT}/payments/balance`)
          .then(res => res.json())
          .then(res => {
            dispatch(setBalance(res.balance));
          });
      });
  }, [amount, contact, pin]);
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
        <Text style={styles.head}>Transfer to {contact.name}</Text>
        <Gap height={20} />
        <View style={{width: '100%'}}>
          <Input fullWidth={true} onNumber onChangeText={handleNumber(setAmount)} label="Amount" />
        </View>
        <Gap height={20} />
        <View style={{width: '100%'}}>
          <Input
            secureTextEntry={true}
            fullWidth={true}
            onNumber
            onChangeText={handleNumber(setPin)}
            label="Pin Number"
          />
        </View>
        <Gap height={50} />
        <Button
          textColor={colors.black}
          color={colors.secondary}
          onPress={handleTransfer}
          text="Transfer"></Button>
        <Gap height={20} />
        <Button
          textColor={colors.black}
          color={colors.secondary}
          onPress={() => navigation.goBack()}
          text="Back"></Button>
      </View>
      
    </View>
  );
};

export {Transfer, TransferAmount};

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
  search: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  head: {
    color: colors.white,
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
  },
  contacts: {
    backgroundColor: colors.white,
    paddingVertical: 10,
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    paddingHorizontal: 30,
    width: '100%',
    flex: 2,
    display: 'flex',
    flexDirection: 'column',
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
