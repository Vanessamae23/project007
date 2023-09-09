import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Modal } from 'react-native'
import React , {useState }from 'react'
import { colors, useForm, showError, showSuccess } from '../../utils'
import { Gap, Input, Button } from '../../components'
import Config from 'react-native-config'
import { useDispatch } from 'react-redux'
import { setEmail } from '../../redux/profile-slice'

const Password = ({navigation, visible, onClose}) => {


    const [email, setEmail] = useState(null);
    const [currentPassword, setCurrentPassword] = useState(null);
    const [newPassword, setNewPassword] = useState(null);

    const handleUpdate = () => {
        fetch(`${Config.NODEJS_URL}auth/update-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    currentPassword: currentPassword,
                    newPassword: newPassword

                })
            })
            .then(res => res.json())
            .then(res => {
                if (res.message == 'success') {
                    showSuccess('Password updated successfully!')
                } else {
                    showError('Password update failed!')
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
                <Text style={styles.head}>Reset Your Password</Text>
                <Text style={{ opacity: 0.5, ...styles.subtitle }}>Please fill in all the fields below </Text>

                <View style={{ padding: 10, paddingTop: 35 }}>
                    <View>
                        <TextInput
                            placeholder="Email Address"
                            placeholderTextColor='#d3d3d3'
                            style={styles.box}
                            onChangeText={value => setEmail(value)} />
                    </View>
                </View>

                <View style={{ padding: 10 }}>
                    <View>
                        <TextInput
                            secureTextEntry={true}
                            placeholder="Current Password"
                            placeholderTextColor='#d3d3d3'
                            style={styles.box}
                            onChangeText={value => setCurrentPassword(value)} />
                    </View>
                </View>

                <View style={{ padding: 10 }}>
                    <View>
                        <TextInput
                            secureTextEntry={true}
                            placeholder="New Password"
                            placeholderTextColor='#d3d3d3'
                            style={styles.box}
                            onChangeText={value => setNewPassword(value)} />
                    </View>
                </View>

                <Gap height={20} />
                <Button onPress={() => handleUpdate()} textColor={colors.black} color={colors.secondary} text="Update"></Button>
                <Gap height={20} />
                <Button onPress={() => navigation.navigate('Home')} textColor={colors.black} color={colors.secondary} text="Back"></Button>
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

export default Password;