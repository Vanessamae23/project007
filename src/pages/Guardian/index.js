import {StyleSheet, Text, View, TextInput, ScrollView} from 'react-native';
import React, {useState, useEffect, useRef, useCallback} from 'react';
import {Button, Gap, Input} from '../../components';
import {Contactlist} from '../../components/atoms/Contact';
import {colors, useForm, showError} from '../../utils';
import Config from 'react-native-config';

const Guardian = ({navigation}) => {
  const [form, setForm] = useForm({
    guardianName: '',
  });
  const [guardian, setGuardian] = useState('');
  const [selectedContact, setSelectedContact] = useState('');
  const [query, setQuery] = useState('');
  const [isQueryJustChanged, setIsQueryJustChanged] = useState(false);
  const queryJustChangedTimer = useRef(null);
  const [contacts, setContacts] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleContactPress = contact => {
    setSelectedContact(contact);
  };

  const isValidPhoneNumber = number => {
    return number.length <= 8 && /^\d+$/.test(number);
  };

  const handleSearchContact = useCallback(
    query => {
      if (!isSearching && query.length >= 2) {
        fetch(
          `${Config.NODEJS_URL}payments/find-users?name=${query}`,
        )
          .then(res => res.json())
          .then(res => {
            setIsSearching(false);
            setContacts(res.users);
          })
          .catch(() => {
            showError('failed to find users');
          });
      }
    },
    [isSearching],
  );

  const handleAdd = () => {
    if (selectedContact) {
      fetch(
        `${Config.NODEJS_URL}auth/set-guardian`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            guardianId: selectedContact.uid,
            newPassword: newPassword,
            password: password,
          }),
        },
      )
        .then(res => {
          if (res.status == 200) {
            setGuardian(selectedContact.name);
            setSelectedContact('');
            setNewPassword('');
            setPassword('');
            navigation.navigate('Home');
          }
          return res.json();
        })
        .then(res => {
          if (res.error) {
            showError(res.error);
          }
        });
    } else {
      showError('No contact selected');
    }
  };

  useEffect(() => {
    fetch(`${Config.NODEJS_URL}auth/is-guarded`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => {
        if (res.message != '') {
          setGuardian(res.message);
        }
      });
  }, []);

  useEffect(() => {
    if (!isQueryJustChanged) {
      handleSearchContact(query);
    }
  }, [query, isQueryJustChanged]);

  return (
    <ScrollView style={styles.container}>
      <Gap height={40} />
      <Text style={styles.title}>Add Guardian</Text>
      <Gap height={16} />
      <Text style={{fontWeight: 'bold'}}>Search the name of the guardian</Text>
      <Gap height={7} />
      <TextInput
        label="Guardian Name"
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
      <Gap height={30} />
      {contacts.length > 0 ? (
        <ScrollView>
          <Contactlist
            title="All contacts"
            contacts={contacts}
            onContactPress={handleContactPress}
            selectedContact={selectedContact}
          />
        </ScrollView>
      ) : isValidPhoneNumber(query) ? (
        <ScrollView>
          <Contactlist
            title="Unknown contact"
            contacts={[{name: 'Unknown', number: query}]}
            onContactPress={handleContactPress}
            selectedContact={selectedContact}
          />
        </ScrollView>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: colors.black || 'black'}}>
            No contacts found
          </Text>
        </View>
      )}
      <Gap height={50} />
      {/* <Button text="Search" onPress={handleSearch} /> */}
      {guardian != '' && (
        <>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '300',
            }}>{`Current Guardian: ${guardian}`}</Text>
          <Gap height={20} />
          <Text style={{fontWeight: 'bold'}}>
            Password for Current Guardian
          </Text>
          <Gap height={7} />
          <TextInput
            label="Old Password"
            secureTextEntry={true}
            style={styles.search}
            value={password}
            placeholder="fill the current password"
            onChangeText={text => {
              setPassword(text);
            }}
          />
          <Gap height={20} />
        </>
      )}
      <Text style={{fontWeight: 'bold'}}>New Password</Text>
      <Gap height={7} />
      <TextInput
        label="New Password"
        style={styles.search}
        secureTextEntry={true}
        placeholder="fill new Password"
        value={newPassword}
        onChangeText={text => {
          setNewPassword(text);
        }}
      />
      <Gap height={30} />
      <Button
        disabled={!selectedContact}
        text="Change Guardian"
        onPress={handleAdd}
      />
      <Gap height={16} />
      <Button
        text="Back"
        onPress={() => {
          setSelectedContact('');
          setNewPassword('');
          setPassword('');
          navigation.navigate('Home');
        }}
      />
    </ScrollView>
  );
};

export default Guardian;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingTop: 26,
    flex: 1,
    height: '100%',
    paddingHorizontal: 30,
  },
  title: {
    paddingTop: 10,
    fontSize: 20,
    textAlign: 'left',
    fontWeight: '500',
  },
  input: {
    color: 'black',
    textColor: 'black',
  },
});
