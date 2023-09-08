import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import { storeData } from '../../utils/localStorage'
import React, { useCallback, useEffect, useId, useState } from 'react'
import { colors, showError, showSuccess, useForm } from '../../utils'
import { ICBack, ICEdit, ICEye, ICProfile, ICGo, ICLock } from '../../assets'
import { TextInput } from 'react-native-gesture-handler'
import { Button } from '../../components'
import togglePasswordVisibility from '../../components/atoms/Password'
import * as ImagePicker from "react-native-image-picker"
import Config from 'react-native-config'
import { useFocusEffect } from '@react-navigation/native'
import { setUsername, setPhotoUrl, setPhoneNumber } from '../../redux/profile-slice'
import { useDispatch, useSelector } from 'react-redux'
import { current } from '@reduxjs/toolkit'

const Profile = ({navigation}) => {
    const { isPasswordSecure, rightIcon, handlePasswordVisibility } = togglePasswordVisibility();
    const email = useSelector(state => state.profile.email);
    const phoneNumber = useSelector(state => state.profile.phoneNumber);
    const username = useSelector(state => state.profile.fullName);
    const photoUrl = useSelector(state => state.profile.photoUrl);
    const dispatch = useDispatch();
    const [currentUri, setCurrentUri] = useState(null);
   
    const uploadImage = async () => {
        const options = {
            title: 'Select Avatar',
          };
       
        await ImagePicker.launchImageLibrary(options, (response) => {
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
                var path = response.assets[0].uri;
                setCurrentUri(path);
                dispatch(setPhotoUrl(path));
                console.log('photourl: ' + photoUrl);
                console.log('uri: ' + path);
                
        }})
    }

    const discardChanges = () => {
        navigation.openDrawer()
    }

    const discardChangesAlert = () => {
        Alert.alert(  
            'Are you sure?',  
            'This action will discard the changes you made to name and phone number!',  
            [  
                {  
                    text: 'Cancel',  
                    onPress: () => console.log('Cancel Pressed'),  
                    style: 'cancel',  
                },  
                {text: 'OK', onPress: () => discardChanges()},  
            ]  
        );  
    }
    
    const handleUpdate = () => {
        if (username == '' || email == '' || phoneNumber == '') {
            showError('Field(s) cannot be empty!')
        } else if (currentUri == null) {
            fetch(`http://${Config.NODEJS_URL}:${Config.NODEJS_PORT}/profile/saveWithoutImage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    fullName: username,
                    email: email,
                    phoneNumber: phoneNumber,
                })
            })
            .then(res => res.json())
            .then(res => {
                if (res.message == 'success') {
                    dispatch(setUsername(res.fullName));
                    storeData('user', res);
                    showSuccess('Profile updated successfully!')
                    navigation.navigate('Home');
                } else {
                    showError('Profile update failed!')
                }
            })
        } else {
            fetch(`http://${Config.NODEJS_URL}:${Config.NODEJS_PORT}/profile/saveWithImage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    fullName: username,
                    email: email,
                    phoneNumber: phoneNumber,
                    uri: currentUri
                })
            })
            .then(res => res.json())
            .then(res => {
                if (res.message == 'success') {
                    dispatch(setUsername(res.fullName));
                    dispatch(setPhotoUrl(res.photoUrl));
                    storeData('user/' + res.uid, res);
                    showSuccess('Profile updated successfully!')
                    navigation.navigate('Home');
                } else {
                    showError('Profile update failed!')
                }
            })
        }

        
    }

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity onPress={discardChangesAlert}>
            <Image source={ICBack} style={styles.backButton}/>
        </TouchableOpacity>
        <View style={styles.headerTitleBG}>
            <Text style={styles.headerTitle}>Edit Profile</Text>
        </View> 
      </View>

      <View style={styles.imageBG}>
        {photoUrl != null
            ? <Image source={{uri: photoUrl}} style={styles.user} />
            : <Image source={ICProfile} style={styles.user} />     
        }        
        
        <TouchableOpacity onPress={uploadImage}>
            <View style={styles.editBG}>
                <Image source={ICEdit} style={styles.edit}/>
            </View>
        </TouchableOpacity>
      </View>

      <View style={{padding: 10}}>
        <View>
            <Text style={{opacity: 0.5}}>Name</Text>
                <TextInput 
                    placeholder="Full name (required)" 
                    defaultValue={username} 
                    style={styles.subtitle}
                    onChangeText={value => dispatch(setUsername(value))}
                />
                
        </View>
      </View>

      <View style={{padding: 10}}>
        <View>
            <Text style={{opacity: 0.5}}>Phone Number</Text>
                <TextInput 
                    placeholder="Phone number (required)" 
                    defaultValue={phoneNumber}
                    style={styles.subtitle}
                    onChangeText={value => dispatch(setPhoneNumber(value))}
                />
        </View>
      </View>

      <View style={{padding: 10}}>
        <View>
            <Text style={{opacity: 0.5}}>Email</Text>
                <TouchableOpacity style={styles.subtitle} onPress={() => navigation.navigate('Change email')}>
                    <Text style={{fontSize: 16}}>{email}</Text>
                    <View style={styles.arrow}>
                        <Image source={ICGo} style={{width: 15, height: 15}} />
                    </View>
                    
                </TouchableOpacity>
        </View>
      </View>

      <View style={{padding: 10}}>
        <View>
            <Text style={{opacity: 0.5}}>Password</Text>
                <TouchableOpacity 
                    style={{flexDirection: 'row'}}
                    onPress={() => navigation.navigate('Change password')}
                >
                    <Image source={ICLock} style={{width: 15, height: 18, marginTop: 10, marginRight: 10, marginLeft: 2}}/>
                    <Text style={{textDecorationLine: 'underline', ...styles.subtitle}}>Change password</Text>  
                </TouchableOpacity>         
        </View>        
      </View>


      {/* <View style={{padding: 10}}>
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
      </View> */}
{/* 
      <View style={{padding: 10}}>
        <Text style={{fontWeight: '500'}}>Change password</Text>
      </View> */}

        <View style={{padding: 25}}>
            <Button textColor={colors.blacksdk} color={colors.secondary} onPress={handleUpdate} text="Update"></Button>
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
        borderRadius: 90/2,
        borderColor: colors.black,
        borderWidth: 1
        
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
        paddingVertical: 10,
        flexDirection: 'row'
    },
    edit: {
        width: 15,
        height: 15,
    },
    editBG: {
        width: 30,
        height: 30,
        borderColor: colors.black,
        borderWidth: 1,
        borderRadius: 30 / 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -30,
        left: 30,
        backgroundColor: 'white'
    },
    arrow: {
        justifyContent: 'end',
        marginLeft: 312,
        marginTop: 10,
        position: 'absolute'
        
    }
})

export default Profile