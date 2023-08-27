import {StyleSheet, ScrollView, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getData} from '../../utils/localStorage';
import {Card, Header, Button} from '../../components';

export default function Home() {
  const [username, setUsername] = useState('');
  useEffect(() => {
    getData('user').then(res => {
      const data = res;
      setUsername(data.fullName);
    });
  }, []);

  const handleTopUp = () => {};

  const handleTransfer = () => {};

  return (
    <ScrollView style={styles.page}>
      <Header title="Good day," subtitle={username} />
      <Card name={username} />
      <Text style={styles.welcome}>Actions</Text>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-evenly',

        }}>
        <Button text="Top Up" onPress={handleTopUp} />
        <Button text="Transfer" onPress={handleTransfer} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  welcome: {
    fontSize: 22,
    marginTop: 30,
    marginBottom: 15,
    maxWidth: 300,
    fontWeight: '600',
    color: 'black',
    fontWeight: '600',
  },
  page: {
    paddingTop: 30,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    flex: 1,
  },
});
