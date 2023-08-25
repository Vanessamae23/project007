import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(key, jsonValue)
  } catch (e) {
    // saving error
  }
}

  

export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key)
    if(value !== null) {
      return JSON.parse(value)
    }

  } catch(e) {
    // error reading value
  }
}

export const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key)

  } catch(e) {
    // error reading value
  }
}