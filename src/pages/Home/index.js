import { StyleSheet, ScrollView, Text, View } from 'react-native'
import React from 'react'

export default function Home() {
  return (
    <ScrollView style={styles.page}>
      <Text style={styles.welcome}>index</Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    welcome: {
        fontSize: 22,
        marginTop: 30,
        marginBottom: 15,
        maxWidth: 300,
        fontWeight: "600",
        color: 'black',
        fontWeight: '600'
    },
    page: {
        paddingTop: 30,
        paddingHorizontal: 16,
        backgroundColor: "white",
        flex: 1
    },
})