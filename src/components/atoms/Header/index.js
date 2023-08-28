import { StyleSheet, Pressable, Text, View, Image, TouchableOpacity, Modal } from 'react-native'
import React, {useEffect} from 'react'
import { ICMore, ICProfile } from '../../../assets'
import { colors } from '../../../utils'
import { getData } from '../../../utils/localStorage'
import { auth } from '../../../config/Firebase'
import { getAuth, signOut } from "firebase/auth";
import { showMessage } from 'react-native-flash-message'
const Header = ({navigation, title, onPress, subtitle, modalVisible = true}) => {

  const logout = () => {
    signOut(auth).then(() => {
      console.log("ASSA")
      navigation.replace('Opening')
    }).catch(e => {
      showMessage({
        message: e.message,
        type: 'default',
        backgroundColor: colors.error,
        color: colors.white
      })
    })
  }
  return (
    <View style={styles.container}>
      {/* {onBack &&
        <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
        <View style={styles.icon}>
          <Back />
        </View>
      </TouchableOpacity>
      } */}
      <View>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>     
      </View>
      <TouchableOpacity onPress={onPress} >
        <Image style={styles.image} source={ICMore} />
        <Modal
          animationType="slide"
          visible={modalVisible}
        >
        <View style={styles.centeredView}>
            <Text style={styles.modalText}>Profile</Text>
            <Text style={styles.modalText}>Settings</Text>
            <Text onPress={() => logout()} style={styles.modalText}>Logout</Text>
            <TouchableOpacity 
            onPress={onPress}
            style={{
              borderRadius: 30,
              backgroundColor: colors.primary,
              width: 60,
              height: 60,
              display: 'flex',
              
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <Text  style={styles.XText}>X</Text>

            </TouchableOpacity>
        </View>
      </Modal>
      </TouchableOpacity>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    title: {
      fontSize: 22,
      color: 'black',
      fontWeight: '800'
    },
    subtitle: {
      fontSize: 14,
      color: 'black'
    },
    container: {
      backgroundColor: 'white',
      paddingHorizontal: 24,
      paddingTop: 30,
      paddingBottom: 24,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    icon: {
      padding: 12,
      marginRight: 16,
      marginLeft: -16
    },
    image: {
      height: 30,
      width: 30
    },
    centeredView: {
      top: 0,
      display: "flex",
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      paddingVertical: 80,
      justifyContent: 'space-around'
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      zIndex: 20,
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
      fontSize: 30

    },
    XText: {
      textAlign: 'center',
      fontSize: 20,
      color: colors.white
    },
  })