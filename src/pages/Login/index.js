import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useCallback} from 'react';
import {storeData} from '../../utils/localStorage';
import {colors, showError, useForm} from '../../utils';
import {Button, Gap, Input} from '../../components';
import Config from 'react-native-config';
import { useDispatch } from 'react-redux';
import { setUsername, setEmail, setPhotoUrl, setPhoneNumber } from '../../redux/profile-slice';

const Login = ({navigation}) => {
  const [form, setForm] = useForm({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();

  const login = useCallback(() => {

    fetch(`${Config.NODEJS_URL}auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })
      .then(res => res.json())
      .then(res => {
        if (res.message == 'success') {
          dispatch(setUsername(res.fullName))
          dispatch(setEmail(res.email))
          dispatch(setPhotoUrl(res.photoUrl))
          dispatch(setPhoneNumber(res.phoneNumber))
          storeData('user', res);
          setForm('reset');
          navigation.replace('Home');
        } else {
          showError('Wrong username or password!');
        }
      });
  }, [form]);

  return (
    <View style={styles.page}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.text}>Sign In Account</Text>
        <Input
          label="Email"
          value={form.email}
          onChangeText={value => setForm('email', value)}
        />
        <Gap height={20} />
        <Input
          label="Password"
          secureTextEntry={true}
          value={form.password}
          onChangeText={value => setForm('password', value)}
        />
        <Gap height={30} />
        <Button text="Sign In" onPress={login} />
        <Gap height={20} />
        <Button
          size={16}
          text="Create New Account"
          align="center"
          onPress={() => navigation.navigate('Register')}
        />
        <Gap height={10} />
        {/* <Link size={16} title="Forgot password" align="center" onPress={resetPassword}/> */}
      </ScrollView>
    </View>
  );
};

export default Login;

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
    marginBottom: 40,
  },
});
