import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../../../utils'

const Transaction = ({name, date, price}) => {
  return (
    <View style={styles.card}>
        <View>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.date}>{date}</Text>
        </View>
        <View>
            <Text style={styles.price}>{price}</Text>
        </View>
    </View>
  )
}

export default Transaction

const styles = StyleSheet.create({
    card: {
        height: 'fit-content',
        paddingBottom: 10,
        paddingTop: 10,
        borderBottomWidth: 1,
        borderColor: colors.black,
        flexDirection:"row",
        justifyContent: "space-between",
        alignItems: 'center'
    },
    name: {
        fontSize: 18,
        fontWeight: '500',
        color: colors.black
    },
    date: {
        fontSize: 12
    },
    price: {
        fontSize: 20,
        color: colors.black
    }
})