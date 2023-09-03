import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native'
import React , {useState }from 'react'
import { colors, useForm, showError, showSuccess } from '../../utils'
import { Gap, Input, Button } from '../../components'
import Config from 'react-native-config'
import { useDispatch } from 'react-redux'
import { setEmail } from '../../redux/profile-slice'

const Email = ({navigation}) => {

    const dispatch = useDispatch();

    const [currentEmail, setCurrentEmail] = useState(null);
    const [newEmail, setNewEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const handleUpdate = () => {
        fetch(`http://${Config.NODEJS_URL}:${Config.NODEJS_PORT}/auth/update-email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    currentEmail: currentEmail,
                    newEmail: newEmail,
                    password: password
                })
            })
            .then(res => res.json())
            .then(res => {
                if (res.message == 'success') {
                    dispatch(setEmail(res.newEmail));
                    showSuccess('Email updated successfully!')
                    navigation.navigate('Profile');
                } else {
                    showError('Email update failed!')
                }
            })
    }


  return (
    <View style={styles.page}>
        
        <View style={styles.circle1} />
        <View style={styles.circle2} />
        <View style={styles.circle3} />
        <View style={styles.header}>
        </View>

        <View style={styles.container}>
            <Text style={styles.head}>Change Email Address </Text>
            <Text style={{opacity: 0.5, ...styles.subtitle}}>Please fill in all the fields below </Text>

            <View style={{padding: 10, paddingTop: 35}}>
                <View>
                    <TextInput 
                        placeholder="Current Email Address" 
                        placeholderTextColor='#d3d3d3'
                        style={styles.box}  
                        onChangeText={value => setCurrentEmail(value)}
                    />
                </View>
            </View>

            <View style={{padding: 10}}>
                <View>
                    <TextInput 
                        secureTextEntry={true}
                        placeholder="Your Password" 
                        placeholderTextColor='#d3d3d3'
                        style={styles.box}  
                        onChangeText={value => setPassword(value)}
                    />
                </View>
            </View>

            <View style={{padding: 10}}>
                <View>
                    <TextInput 
                        placeholder="New Email Address" 
                        placeholderTextColor='#d3d3d3'
                        style={styles.box}  
                        onChangeText={value => setNewEmail(value)}
                    />
                </View>
            </View>

            <Gap height={20} />
            <Button onPress={() => handleUpdate()}textColor={colors.black} color={colors.secondary} text="Update"></Button>
            <Gap height={20} />
            <Button onPress={() => navigation.navigate('Profile')} textColor={colors.black} color={colors.secondary} text="Back"></Button>
            <TouchableOpacity onPress={() => navigation.navigate('Change password')}>
                <Text style={{color: colors.white, fontWeight: '500', ...styles.subtitle}}>Forgot your password?</Text>
            </TouchableOpacity>

        </View>
    </View>
  )
}

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
      head: {
        color: colors.white,
        fontSize: 24,
        fontWeight: '600',
        textAlign: "center"
    },
    container: {
        marginTop: -70,
        backgroundColor: colors.primary,
        paddingVertical: 50,
        borderTopEndRadius: 30,
        borderTopStartRadius: 30,
        paddingHorizontal: 30,
        width: '100%',
        //height: '100%',
        flex: 2,
        display: 'flex',
        flexDirection: 'column'
    },
    header: {
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        marginRight: 330,
        flex: 1,
    },
    amount: {
        fontWeight: '700',
        color: colors.black,
        fontSize: 40
    },
    balance: {
        fontWeight: '500',
        color: colors.black,
        fontSize: 20
    },
    tag: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        flex: 1
    },
    cvv: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
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
      subtitle: {
        fontSize: 16,
        color: 'white',
        textAlign: "center",
        paddingTop: 10,
      },
      box: {
        fontSize: 16,
        borderBottomWidth: 1,
        borderColor: '#a9a9a9',
        paddingVertical: 10,
        flexDirection: 'row',
        color: 'white'
      },
      backButton: {
        width: 25,
        height: 25,
        marginTop: 10,
        marginLeft: 20
       },
      
})

export default Email;