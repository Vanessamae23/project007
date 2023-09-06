import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import { ICProfile, ICLogout } from '../../../assets'
import { colors } from '../../../utils'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Config from 'react-native-config'
import {showError, showSuccess} from '../../../utils';
import { useSelector } from 'react-redux'

const SideBar = (props) => {
    const username = useSelector(state => state.profile.fullName);
    const photoUrl = useSelector(state => state.profile.photoUrl);

    const logout = () => {
        fetch(`http://${Config.NODEJS_URL}:${Config.NODEJS_PORT}/auth/logout`)
          .then(res => res.json())
          .then(res => {
            if (res.message === 'success') {
              showSuccess('Succesfully logged out!');
              props.navigation.navigate('Opening');
            } else {
              showError('Failed to log out!');
            }
          });
    };

  return (
    <View style={{flex: 1, paddingHorizontal: 5, paddingTop: 20}}>
        <View style={styles.profileBG}>
            {photoUrl != null 
                ? <Image source={{uri: photoUrl}} style={styles.user} />
                : <Image source={ICProfile} style={styles.user} />}
            <Text style={styles.name}>{username}</Text>
        </View>
        <View style={{paddingTop: 5}}>
            <DrawerItemList {...props} />
        </View>
        
        <TouchableOpacity onPress={logout}>
            <View style={styles.divider}>
                <View>
                    <Image source={ICLogout} style={styles.logout}/> 
                </View>
                <Text style={styles.logoutText}>Sign Out</Text>
            </View>
        </TouchableOpacity> 
    </View>
  )
}

const styles = StyleSheet.create({
    user: {
        width: 70,
        height: 70,
        borderRadius: 70 / 2,
        borderColor: colors.black,
        borderWidth: 1
    },
    profileBG: {
       height: 150,
       borderBottomWidth: 2,
       borderBottomColor: colors.black,
       justifyContent: 'flex-start',
       alignItems: 'flex-start',
       paddingHorizontal: 15,
       paddingTop: 20
    },
    name: {
        fontSize: 20,
        fontWeight: '500',
        marginTop: 15
    },
    divider: {
       borderTopWidth: 1,
       borderTopColor: colors.black,
       justifyContent: 'center',
       flexDirection: 'row',
       padding: 20,
       marginTop: 320,
    }, 
    logout: {
        width: 30,
        height: 30, 
    },
    logoutText: {
        justifyContent: 'center',
        marginTop: 5,
        marginLeft: 10,
        flex: 1,
        fontWeight: '500',
        fontSize: 15,
    }

})
export default SideBar;