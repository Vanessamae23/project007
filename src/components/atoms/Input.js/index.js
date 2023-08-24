import {StyleSheet, Text, View, TextInput} from 'react-native';
import React, {useState} from 'react';

const Input = ({
    label,
    placeholder,
    onNumber,
    onDate,
    onChangeText,
    secureTextEntry,
    value,
  }) => {
  
    if (onNumber) {
      return (
        <View>
          <Text style={styles.label}>{label}</Text>
          <TextInput
            placeholder={placeholder}
            keyboardType="numbers-and-punctuation"
            secureTextEntry={secureTextEntry}
            value={value}
            onChangeText={onChangeText}
          />
        </View>
      );
    }
    if (onDate) {
      return (
        <View>
          <Text style={styles.label}>{label}</Text>
          <TextInput
           style={styles.input1}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            value={value}
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
      color: 'black',
      marginBottom: 10,
    },
    input: {                                 
      borderWidth: 1,
      borderColor: 'black',           
      borderRadius: 8,            
      padding: 10,   
      width: '100%'                                                                                                                                                                     
    },
    input1: {                                 
      borderWidth: 1,
      borderColor: 'black',           
      borderRadius: 8,            
      padding: 10,   
      width: 250                                                                                                                                                                   
    },
  });