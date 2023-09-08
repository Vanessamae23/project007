import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import {colors} from '../../../utils';

export const Contactlist = ({
  title,
  contacts,
  onContactPress,
  selectedContact,
}) => (
  <View accessible={false} style={styles.contactList}>
    <View style={{width: '100%'}}>
      <Text style={styles.listTitle}>{title.toUpperCase()}</Text>
    </View>
    {contacts.map(contact => (
      <Contact
        key={contact.uid}
        {...contact}
        onPress={() => onContactPress(contact)}
        isSelectedContact={
          selectedContact && selectedContact.uid === contact.uid
        }
      />
    ))}
  </View>
);

export const Contact = ({name, uid, onPress, isSelectedContact}) => (
  <TouchableOpacity
    style={[
      styles.container,
      isSelectedContact && {backgroundColor: colors.secondary},
    ]}
    onPress={onPress}>
    <View style={styles.avatar}>
      <Text style={styles.avaText}>{name[0].toUpperCase()}</Text>
    </View>
    <View style={styles.details}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.number}>{uid}</Text>
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
  selectedContact: {
    backgroundColor: colors.primary,
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
