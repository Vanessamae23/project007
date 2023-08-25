import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux'
import { auth } from '../../config/Firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { getDatabase, ref, get, onValue } from "firebase/database";
import { storeData } from '../../utils/localStorage'
import { colors, showError, useForm } from '../../utils'
import { Button, Gap, Input } from '../../components'

const Login = ({navigation}) => {
    const dispatch = useDispatch()
    const [ form, setForm ] = useForm({
        email: '',
        password: ''
    })

    const login = () => {
        signInWithEmailAndPassword(auth, form.email, form.password).then(res => {
            const database = getDatabase();
            const userRef = ref(database, 'users/' + res.user.uid + '/');
            onValue(userRef, (snapshot) => {
                const data = snapshot.val()
                if (data) {
                    storeData('user', data);
                    navigation.replace('MainApp')
                }
            })
        }).catch(e => {
            showError(e.message)
        })
    }

  return (
    <View style={styles.page}>
    <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.text}>Sign In Account</Text>
        <Input label="Email" value={form.email} onChangeText={(value) => setForm('email', value)} />
        <Gap height={20} />
        <Input label="Password" secureTextEntry={true} value={form.password} onChangeText={(value) => setForm('password', value)} />
        <Gap height={30} />
        <Button text="Sign In" onPress={login}/>
        <Gap height={20} />
        <Button size={16} text="Create New Account" align="center" onPress={() => navigation.navigate('Register')}/>
        <Gap height={10} />
        {/* <Link size={16} title="Forgot password" align="center" onPress={resetPassword}/> */}
    </ScrollView>
  </View>
  )
}

export default Login

const styles = StyleSheet.create({
    page: {
        padding: 40,
        flex: 1,
        backgroundColor: colors.primary,
    },
    text: {
        fontSize: 30,
        maxWidth: 200,
        color: colors.white,
        marginTop: 40,
        marginBottom: 40
    }
})