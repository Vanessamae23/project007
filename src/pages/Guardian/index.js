import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Button, Gap, Input } from '../../components'
import { colors, useForm } from '../../utils'
import Config from 'react-native-config'

const Guardian = ({navigation}) => {
    const [form, setForm] = useForm({
        guardianName: ''
    });
    const [guardian, setGuardian] = useState('')
    const [users, setUsers] = useState([])
    const handleSearch = () => {
        fetch(`http://${Config.NODEJS_URL}:${Config.NODEJS_PORT}/payments/find-users?email=${form.guardianName}`)
            .then(res => res.json())
            .then(res => {
                setUsers(res.users)
        });
    }

    const handleAdd = () => {
        fetch(
            `http://${Config.NODEJS_URL}:${Config.NODEJS_PORT}/guardian`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                user_uid: users[0].uid
              }),
            },
          )
    }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Guardian</Text>
      <Gap height={16} />
        <Input
          label="Guardian Name"
          value={form.guardianName}
          onChangeText={value => setForm('guardianName', value)}
          placeholder="Type your guardian's name"
        />
        <Gap height={50} />
        {users.map((user, index) => (
            <View style={{ padding: 20, backgroundColor: colors.primary, borderWidth: 1, borderRadius: 20}}>
                <Text style={{color : colors.white}} key={index}>Add {user.name} as Guardian</Text>
            </View>
            
          ))}
          <Gap height={36} />
        <Button text="Search" onPress={handleSearch}/>
      <Gap height={16} />
      <Button disabled={users.length == 0}  text="Add Guardian" onPress={handleAdd}/>
      <Gap height={16} />
      <Button text="Back" onPress={() => navigation.navigate('Home')} />
    </View>
  )
}

export default Guardian

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingTop: 26,
        flex: 1,
        height: '100%',
        paddingHorizontal: 30,
        backgroundColor: colors.white,
      },
    title: {
      paddingTop: 10,
      fontSize: 20,
      textAlign: 'top',
      fontWeight: '500',
    },
});