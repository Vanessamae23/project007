import { StyleSheet, ScrollView, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getData } from '../../utils/localStorage'
import { Card, Chip, Header, Transaction } from '../../components'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Home({navigation}) {
  const [ username, setUsername ] =useState('')
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    getData('user').then(res => {
      const data = res;
      setUsername(data.fullName)
    })
  }, [])
  return (
    <View style={styles.page}>
      <View style={styles.box1}>
        <Header navigation={navigation} onPress={() => setModalVisible(!modalVisible)} modalVisible={modalVisible} title="Good day," subtitle={username} />
        <Card name={username} />
      </View>
      <View style={styles.box}>
        <Text style={styles.welcome}>Actions</Text>
        <ScrollView contentContainerStyle={{
          justifyContent: 'space-around',
          flex: 1
        }} horizontal={true} style={styles.action}>
          <Chip onPress={() => navigation.navigate("TopUp")} type="Top up" title="Top Up" />
          <Chip type="Transfer" title="Transfer"  onPress={() => navigation.navigate("Transfer")}/>
          <Chip title="Withdraw"  onPress={() => navigation.navigate("Withdraw")}/>
        </ScrollView>
      </View>
      <View style={styles.box}>
        <Text style={styles.welcome}>Transaction History</Text>
        <ScrollView style={styles.tran}>
          <Transaction name="Puri" date="2022-23-02" price="+$20.00" />
          <Transaction name="Puri" date="2022-23-02" price="+$20.00" />
          <Transaction name="Puri" date="2022-23-02" price="+$20.00" />
          <Transaction name="Puri" date="2022-23-02" price="+$20.00" />
          <Transaction name="Puri" date="2022-23-02" price="+$20.00" />
          <Transaction name="Puri" date="2022-23-02" price="+$20.00" />
        </ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    welcome: {
        fontSize: 22,
        marginTop: 20,
        marginBottom: 15,
        maxWidth: 300,
        fontWeight: "600",
        color: 'black',
        fontWeight: '600'
    },
    box: {
       flex: 1,
    },

    page: {
        paddingTop: 30,
        paddingHorizontal: 16,
        backgroundColor: "white",
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
    },
    action: {
      flex: 1,
      display: 'flex',
    },
    tran: {
      paddingHorizontal: 10
    }
})