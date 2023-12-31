import {StyleSheet, Text, View, Image, ScrollView, Linking} from 'react-native';
import React, {useState, useCallback} from 'react';
import {Gap, Input, Button} from '../../components';
import {useForm} from '../../utils';
import {storeData} from '../../utils/localStorage';
import {showError, showSuccess, colors} from '../../utils';
import Config from 'react-native-config';
import {useDispatch} from 'react-redux';
import {
  setUsername,
  setPhotoUrl,
  setEmail,
  setPhoneNumber,
} from '../../redux/profile-slice';

const Register = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useForm({
    fullName: '',
    email: '',
    password: '',
    pin: '',
  });

  const dispatch = useDispatch();

  const onContinue = useCallback(() => {
    setLoading(true);
    fetch(`${Config.NODEJS_URL}auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: form.email,
        password: form.password,
        fullName: form.fullName,
        pin: form.pin,
      }),
    })
      .then(res => res.json())
      .then(res => {
        if (res.message === 'success') {
          Linking.canOpenURL(res.account_link).then(() => {
            Linking.openURL(res.account_link);
          });
          const data = {
            fullName: form.fullName,
            email: form.email,
            walletId: res.walletId,
            account_id: res.account_id,
          };
          dispatch(setUsername(form.fullName));
          dispatch(setEmail(form.email));
          dispatch(setPhotoUrl(null));
          dispatch(setPhoneNumber('Not set yet'));
          storeData('user', data);
          setForm('reset');
          navigation.navigate('Home', data);
          showSuccess('Successfully created!');
        } else {
          showError(res.message);
        }
      });
  }, [form]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{flex: 1}}>
      <View style={styles.circle1} />
      <View style={styles.circle2} />
      <View style={styles.circle3} />
      <View style={styles.inputgroup}>
        <Text style={styles.title}>Account Registration</Text>
        <Input
          label="Full Name"
          value={form.fullName}
          onChangeText={value => setForm('fullName', value)}
          placeholder="Type your Full Name"
        />
        <Gap height={16} />
        <Input
          label="Email Address"
          value={form.email}
          onChangeText={value => setForm('email', value)}
          placeholder="Type your email address"
        />
        <Gap height={16} />
        <Input
          label="Password"
          value={form.password}
          onChangeText={value => setForm('password', value)}
          placeholder="Type your Password"
          secureTextEntry={true}
        />
        <Gap height={16} />
        <Input
          label="Pin"
          value={form.pin}
          onChangeText={value => setForm('pin', value)}
          placeholder="Type your Pin"
          secureTextEntry={true}
        />
        <Gap height={16} />
        <Gap height={24} />
        <Button onPress={onContinue} text="Continue" />
        <Gap height={16} />
        <Button text="Back" onPress={() => navigation.navigate('Login')} />
        <Gap height={100} />
      </View>
    </ScrollView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingTop: 26,
    flex: 1,
    height: '100%',
    backgroundColor: colors.primary,
  },
  inputgroup: {
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 30,
    paddingVertical: 20,
    color: colors.white,
    fontWeight: '500',
  },
  circle1: {
    backgroundColor: colors.circle,
    height: 300,
    width: 300,
    borderRadius: 150,
    position: 'absolute',
    zIndex: -2,
    top: 20,
    right: 120,
  },
  circle2: {
    backgroundColor: colors.circle,
    height: 200,
    width: 200,
    borderRadius: 100,
    position: 'absolute',
    zIndex: -2,
    bottom: 60,
    left: 270,
  },
  circle3: {
    backgroundColor: colors.circle,
    height: 400,
    width: 400,
    borderRadius: 200,
    position: 'absolute',
    zIndex: -2,
    bottom: -200,
    right: 150,
  },
});
