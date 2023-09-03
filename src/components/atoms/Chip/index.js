import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors } from '../../../utils'
import { ICMore, ICTopUp, ICTransfer } from '../../../assets'

const Chip = ({ title, onPress, type }) => {
    const img = (type == "Transfer" ? <Image source={ICTransfer} style={styles.image}></Image> : 
        type == "Top up" ? <Image source={ICTopUp} style={styles.image}></Image> : <Image source={ICMore} style={styles.image}></Image>);
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
        {img}
        <Text style={styles.titles}>{title}</Text>
    </TouchableOpacity>
  )
}

export default Chip

const styles = StyleSheet.create({
    container: {
        borderColor: 'black',
        borderRadius: 20,
        display: 'flex',
        borderWidth: 2,
        justifyContent: 'space-around',
        paddingVertical: 10,
        paddingHorizontal: 10,
        width: '30%',
        height: 120,
        alignItems: 'center',
    },
    image: {
        height: 40,
        width: 40
    },
    titles: {
        color: colors.black,
        fontWeight: '600',
        fontSize: 16
    }
})