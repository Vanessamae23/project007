import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native'
import { colors, useForm } from '../../utils'
import { Button, Gap, Input } from '../../components'
import { Contactlist } from '../../components/atoms/Contact';

// Sample contacts data
const initialContacts = [
    { name: 'Alan Walker', number: '91234567' },
    { name: 'Beyonce Knowles', number: '86753019' },
    { name: 'Charlie Puth', number: '98765432' },
    { name: 'Dua Lipa', number: '90000001' },
    { name: 'Ed Sheeran', number: '90000002' },
    { name: 'Fifth Harmony', number: '90000003' },
    { name: 'Gwen Stefani', number: '90000004' },
    { name: 'Halsey', number: '90000005' },
    { name: 'Imagine Dragons', number: '90000006' },
    { name: 'Justin Bieber', number: '90000007' },
    { name: 'Katy Perry', number: '90000008' },
    { name: 'Lady Gaga', number: '90000009' },
    { name: 'Maroon 5', number: '90000010' },
    { name: 'Niall Horan', number: '90000011' },
    { name: 'One Direction', number: '90000012' },
    { name: 'Pitbull', number: '90000013' },
];

const Transfer = ({ navigation }) => {
    const [query, setQuery] = useState('');
    const [contacts, setContacts] = useState(initialContacts)

    const handleSearchContact = (query) => {
        if (query.length > 0) {
            const filteredContacts = initialContacts.filter(
                c => c.name.toLowerCase().includes(query.toLowerCase())
                    || c.number.includes(query));
            setContacts(filteredContacts);
        } else {
            setContacts(initialContacts);
        }
    };

    const handleContactPress = (contact) => {
        navigation.navigate('TransferAmount', { contact });
    };

    // Use effect to filter contacts when query changes
    useEffect(() => {
        handleSearchContact(query);
    }, [query]);

    const isValidPhoneNumber = (number) => {
        return number.length <= 8 && /^\d+$/.test(number);
    };

    return (
        <View style={styles.page}>
            <View style={styles.circle1} />
            <View style={styles.circle2} />
            <View style={styles.circle3} />
            <View style={styles.header}>
                <Text style={styles.balance}>Current Balance</Text>
                <Text style={styles.amount}>S$12.00</Text>
            </View>
            <View style={styles.contacts}>
                <TextInput
                    style={styles.search}
                    placeholder="Search name or enter number"
                    onChangeText={setQuery}
                />
                {contacts.length > 0 ? (
                    <ScrollView>
                        <Contactlist
                            title="All contacts"
                            contacts={contacts}
                            onContactPress={handleContactPress}
                        />
                    </ScrollView>
                ) : isValidPhoneNumber(query) ? (
                    <ScrollView>
                        <Contactlist
                            title="Unknown contact"
                            contacts={[{ name: "Unknown", number: query }]}
                            onContactPress={handleContactPress}
                        />
                    </ScrollView>
                ) : (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: colors.black }}>No contacts found</Text>
                    </View>
                )}
                <Button textColor={colors.blacsdk} color={colors.secondary} onPress={() => navigation.goBack()} text="Back"></Button>
            </View>
        </View>
    )
}

const TransferAmount = ({ route, navigation }) => {
    const { contact } = route.params; // Getting the contact passed from the Transfer page

    const [form, setForm] = useForm({
        amount: 0,
        pin: 0
    });

    const handleTransfer = () => {
        if (!amount || parseFloat(amount) <= 0) {
            Alert.alert("Invalid Amount", "Please enter a valid transfer amount.");
            return;
        }

        // Implement the transfer logic here, for now, we'll just go back
        navigation.goBack();
        Alert.alert("Success", `You've transferred ${amount} to ${contact.name}`);
    };

    return (
        <View style={styles.page}>
            <View style={styles.circle1} />
            <View style={styles.circle2} />
            <View style={styles.circle3} />
            <View style={styles.header}>
                <Text style={styles.balance}>Current Balance</Text>
                <Text style={styles.amount}>S$12.00</Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.head}>Transfer to {contact.name}</Text>
                <Gap height={20} />
                <View style={{ width: '100%' }}>
                    <Input fullWidth={true} onNumber label="Amount" />
                </View>
                <Gap height={20} />
                <View style={{ width: '100%' }}>
                    <Input secureTextEntry={true} fullWidth={true} onNumber label="Pin Number" />
                </View>
                <Gap height={50} />
                <Button textColor={colors.black} color={colors.secondary} text="Transfer"></Button>
                <Gap height={20} />
                <Button textColor={colors.black} color={colors.secondary} onPress={() => navigation.goBack()} text="Back"></Button>
            </View>
        </View>
    )
}

export { Transfer, TransferAmount };

const styles = StyleSheet.create({
    page: {
        paddingTop: 30,
        backgroundColor: "white",
        overflow: 'hidden',
        flexDirection: 'column',
        height: '100%',
        alignItems: "center",
        display: 'flex',
    },
    search: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginTop: 10
    },
    head: {
        color: colors.white,
        fontSize: 24,
        fontWeight: '600',
        textAlign: "center"
    },
    contacts: {
        backgroundColor: colors.white,
        paddingVertical: 10,
        borderTopEndRadius: 30,
        borderTopStartRadius: 30,
        paddingHorizontal: 30,
        width: '100%',
        flex: 2,
        display: 'flex',
        flexDirection: 'column'
    },
    container: {
        backgroundColor: colors.primary,
        paddingVertical: 50,
        borderTopEndRadius: 30,
        borderTopStartRadius: 30,
        paddingHorizontal: 30,
        width: '100%',
        flex: 2,
        display: 'flex',
        flexDirection: 'column'
    },
    header: {
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        flex: 1
    },
    amount: {
        fontWeight: '700',
        color: colors.black,
        fontSize: 40
    },
    balance: {
        fontWeight: '500',
        color: colors.black,
        fontSize: 20
    },
    circle1: {
        backgroundColor: colors.circle2,
        height: 80,
        width: 80,
        borderRadius: 150,
        position: 'absolute',
        zIndex: -2,
        top: 30,
        right: 120
    },
    circle2: {
        backgroundColor: colors.circle2,
        height: 90,
        width: 90,
        borderRadius: 100,
        position: 'absolute',
        zIndex: -2,
        top: 60,
        left: 270
    },
    circle3: {
        backgroundColor: colors.circle2,
        height: 400,
        width: 400,
        borderRadius: 200,
        position: 'absolute',
        zIndex: -2,
        top: 40,
        right: 200
    }
});