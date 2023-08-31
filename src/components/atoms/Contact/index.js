import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { colors } from '../../../utils';

export const Contactlist = ({ title, contacts, onContactPress }) => (
    <View accessible={false} style={styles.contactList}>
        <View
            style={{ width: '100%' }}
        >
            <Text style={styles.listTitle}>{title.toUpperCase()}</Text>
        </View>
        {contacts.map(contact => (
            <Contact key={contact.number} {...contact} onPress={() => onContactPress(contact)} />
        ))}
    </View>
);

export const Contact = ({ name, number, onPress }) => (
    <TouchableOpacity
        style={styles.container}
        onPress={onPress}
    >
        <View style={styles.avatar}>
            <Text style={styles.avaText}>{name[0].toUpperCase()}</Text>
        </View>
        <View style={styles.details}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.number}>{number}</Text>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingVertical: 10,
        height: 60,
        width: '100%',
    },
    avatar: {
        height: 40,
        width: 40,
        backgroundColor: colors.primary,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avaText: {
        fontSize: 25,
        color: colors.white,
    },
    details: {
        marginLeft: 10,
        justifyContent: 'space-around',
    },
    contactList: {
        padding: 10,
        width: '100%',
    },
    listTitle: {
        color: colors.primary,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    number: {
        fontSize: 14,
    },
});
