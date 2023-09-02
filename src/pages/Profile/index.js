import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { getData } from '../../utils/localStorage'
import React, { useEffect, useState } from 'react'
import { colors } from '../../utils'
import { ICBack, ICEdit, ICEye, ICProfile } from '../../assets'
import { TextInput } from 'react-native-gesture-handler'
import { Button } from '../../components'
import togglePasswordVisibility from '../../components/atoms/Password'

const Profile = ({navigation}) => {
    const { isPasswordSecure, rightIcon, handlePasswordVisibility } = togglePasswordVisibility();
    const [username, setUsername] = useState('');

    useEffect(() => {
        getData('user').then(res => {
          const data = res;
          setUsername(data.fullName);
        });
      }, []);

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Image source={ICBack} style={styles.backButton}/>
        </TouchableOpacity>
        <View style={styles.headerTitleBG}>
            <Text style={styles.headerTitle}>Edit Profile</Text>
        </View> 
      </View>

      <View style={styles.imageBG}>
        <Image source={ICProfile} style={styles.user}/>
        <TouchableOpacity>
            <View style={styles.editBG}>
                <Image source={ICEdit} style={styles.edit}/>
            </View>
        </TouchableOpacity>
      </View>

      <View style={{padding: 10}}>
        <View>
            <Text style={{opacity: 0.5}}>Name</Text>
                <TextInput 
                    placeholder="Change name" 
                    defaultValue={username} 
                    style={styles.subtitle}
                />
                
        </View>
      </View>

      <View style={{padding: 10}}>
        <View>
            <Text style={{opacity: 0.5}}>Email</Text>
                <TextInput 
                    placeholder="Change email" 
                    defaultValue='test1@gmail.com' 
                    style={styles.subtitle}
                />
        </View>
      </View>

      <View style={{padding: 10}}>
        <View>
            <Text style={{opacity: 0.5}}>Password</Text>
                <TextInput 
                    secureTextEntry={isPasswordSecure}
                    placeholder="Change password" 
                    defaultValue='12345' 
                    style={styles.subtitle}
                />
                <TouchableOpacity onPress={handlePasswordVisibility}>
                    <Image 
                        source={rightIcon} 
                        style={{
                            width: 20,
                            height: 20,
                            position: 'absolute',
                            right: 10,
                            marginTop: -35
                        }}/>
                </TouchableOpacity>         
        </View>        
      </View>

      <View style={{padding: 10}}>
        <View>
            <Text style={{opacity: 0.5}}>Phone Number</Text>
                <TextInput 
                    placeholder="Change phone number" 
                    defaultValue='830213' 
                    style={styles.subtitle}
                />
        </View>
      </View>

        <View style={{padding: 25}}>
            <Button textColor={colors.blacksdk} color={colors.secondary} onPress={() => navigation.goBack()} text="Update"></Button>
        </View> 
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: 'white',
        flex: 1
    },
    header: {
        //backgroundColor: colors.primary,
        borderBottomColor: colors.primary,
        //borderBottomWidth: 2,
        height: 70,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTitle: {
        marginTop: 10,
        fontWeight: '500',
        fontSize: 18,
    },
    backButton: {
        width: 20,
        height: 20,
        marginTop: 10,
        marginLeft: 20
    },
    headerTitleBG: {
        //backgroundColor: 'pink',
        flex: 1,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        marginRight: 40,
    },
    user: {
        width: 90,
        height: 90,
        
    },
    imageBG: {
        //backgroundColor: 'pink',
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -10
    },
    name: {
        fontWeight: '500',
        fontSize: 20,
        paddingTop: 20
    },
    subtitle: {
        fontSize: 16,
        borderBottomWidth: 1,
        borderColor: colors.primary,
        paddingVertical: 10
    },
    edit: {
        width: 15,
        height: 15,
    },
    editBG: {
        width: 30,
        height: 30,
        borderColor: colors.black,
        borderWidth: 3,
        borderRadius: 30 / 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -30,
        left: 30,
        backgroundColor: 'white'
    }
})

export default Profile