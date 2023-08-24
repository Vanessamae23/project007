import {StyleSheet, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {TabItem} from '../../atoms';

const BottomNavigator = ({state, descriptors, navigation}) => {
    return (
      <View style={styles.container}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;
  
          const isFocused = state.index === index;
  
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
  
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };
  
          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };
  
          return (
            <TabItem
              key={index}
              onPress={onPress}
              onLongPress={onLongPress}
              title={label}
              active={isFocused}
            />
          );
        })}
      </View>
    );
  };
  
  export default BottomNavigator;
  
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 10,
      backgroundColor: "#e1ac35",
      paddingHorizontal: 40,
      borderRadius: 30,
      marginBottom: 15,
      marginHorizontal: 10
    },
  });