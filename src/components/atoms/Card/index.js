import { Image, StyleSheet, ImageBackground, Text, View } from 'react-native'
import React from 'react'
import { TiktokLogo } from '../../../assets'
import { useSelector } from 'react-redux';

export default function Card({name, wallet}) {
    const balance = useSelector(state => state.balance.value);
    return (
        <View style={styles.card}>
            <Text style={styles.name}>{name}</Text>
            <Text  style={styles.number}>**** **** {(wallet.slice(8))}</Text>
            <Image style={styles.backgroundImage} source={TiktokLogo} ></Image>
            <View>
                <Text style={styles.balance}>Current Balance :</Text>
                <Text style={styles.balanceMoney}>S$ {balance}</Text>
            </View>
        </View>
  )
}

const styles = StyleSheet.create({
    card : {
        borderRadius: 20,
        padding: 20,
        paddingBottom: 30,
        backgroundColor: '#2b2626',
        minHeight: 100,
        display: "flex",
        flexDirection: "column",
        color: "white",
        justifyContent: "space-between",
        alignItems: "flex-start",
        overflow: 'hidden'
    },
    stretch: {
        width: 50,
        height: 200,
        resizeMode: 'stretch',
      },
    name: {
        color: "white",
        fontSize: 25
    },
    number: {
        fontSize: 20,
        letterSpacing: 10,
        color: "white",
        marginTop: 20,
        paddingBottom: 20
    },
    balance: {
        color: "white"
    },
    balanceMoney: {
        fontSize: 30,
        color: "white",
        fontWeight: '800'
    },
    backgroundImage: {
        width: 250, // Set the desired width
        height: 200, // Set the desired height
        resizeMode: 'cover',
        justifyContent: 'space-between', // Center content within the image
        alignItems: 'flex-start',
        alignSelf: "flex-end",
        position: 'absolute',
        zIndex: -1,
        top: 20,
        opacity: 0.3
      },
})