import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { ICCalendar, ICProfile } from '../../../assets/Icon'

const TabItem = ({title, active, onPress, onLongPress}) => {

    const Icons = (title) => {
        if(title == "Profile") {
            return <ICProfile />
        }
        return <ICCalendar />
    }
    if (title == "Home") {
        return (
            <TouchableOpacity activeOpacity={0.7} style={styles.container} onPress={onPress} onLongPress={onLongPress}>
                <ICProfile />
              <Text style={styles.text(active)}>{title}</Text>
            </TouchableOpacity>
      )
    }
  return (
        <TouchableOpacity activeOpacity={0.7} style={styles.container} onPress={onPress} onLongPress={onLongPress}>
            <ICCalendar />
          <Text style={styles.text(active)}>{title}</Text>
        </TouchableOpacity>
  )
}

export default TabItem

const styles = StyleSheet.create({
    container: {
        alignItems: "center"
    },
    text: (active) => ({
        fontSize: 12,
        color: active ? 'white' : 'black',
        marginTop: 4,
        fontWeight:'800'
    })
})