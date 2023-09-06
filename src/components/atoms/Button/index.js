import { StyleSheet, TouchableOpacity, Text, View } from 'react-native'
import React from 'react'

const Button = ({text, color = '#93c47d', height = 'auto', textColor = 'black', onPress, disabled}) => {
  return (
    <TouchableOpacity disabled={disabled} activeOpacity={0.7} onPress={onPress}>
      <View style={styles.container(color, height)}>
      <Text style={styles.text(textColor)}>{text}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
    container: (color, height) => ({
        backgroundColor: color,
        padding: 12, 
        borderRadius: 8,
        height: height
    }),
    text: (textColor) => ({
        fontSize: 14,
        textAlign: 'center',
        color: textColor,
        fontWeight: '600'
    })
})