import {StyleSheet, Text, View, TextInput} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../../../utils';

const Input = ({
  label,
  placeholder,
  onNumber,
  onChangeText,
  secureTextEntry,
  value,
  fullWidth = false
}) => {

  if (onNumber) {
    return (
      <View style={styles.follow}>
        <Text style={styles.phonelabel}>{label}</Text>
        <TextInput
          style={styles.phoneinput}
          placeholder={placeholder}
          keyboardType="number-pad"
          secureTextEntry={secureTextEntry}
          value={value}
          fullWidth={fullWidth}
          onChangeText={onChangeText}
        />
      </View>
    );
  }
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput 
        style={styles.input} 
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText} />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    color: colors.white,
    marginBottom: 10,
  },
  phonelabel: {
    fontSize: 20,
    color: colors.white,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.white,
    borderRadius: 8,
    padding: 10,
    backgroundColor: colors.white,
    shadowColor: colors.circle,
    shadowOffset: { width: 0, height: 2 }, // Correct shadow offset values
    shadowOpacity: 0.5, // Adjust shadow opacity as needed
    shadowRadius: 4, // Adjust shadow radius as needed
    elevation: 4, // For Android shadow
  },
  phoneinput: {
    borderBottomWidth: 2,
    borderColor: colors.white,
    borderRadius: 8,
    color: colors.white,
    fontSize: 30,
    textAlign: 'center',
    padding: 10,
  },
  follow: {
    minWidth: '30%',
  }
});