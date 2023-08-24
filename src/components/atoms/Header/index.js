import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Header = ({title, subtitle}) => {
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
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
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
      alignItems: 'center'
    },
    icon: {
      padding: 12,
      marginRight: 16,
      marginLeft: -16
    }
  })