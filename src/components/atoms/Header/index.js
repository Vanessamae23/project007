import {
  StyleSheet,
  Pressable,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';
import React from 'react';
import {ICProfile} from '../../../assets';
import {colors} from '../../../utils';
import { useSelector } from 'react-redux';

const Header = ({
  navigation,
  title,
  subtitle,
}) => {


  const photoUrl = useSelector(state => state.profile.photoUrl);

  return (
    <View style={styles.container}>
      <View>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        {photoUrl != null 
          ? <Image style={styles.image} source={{uri: photoUrl}} />
          : <Image style={styles.image} source={ICProfile} />}
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    color: 'black',
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 14,
    color: 'black',
  },
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    padding: 12,
    marginRight: 16,
    marginLeft: -16,
  },
  image: {
    height: 45,
    width: 45,
    borderRadius: 45 / 2,
    borderWidth: 1,
    borderColor: colors.black
  },
  centeredView: {
    top: 0,
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 80,
    justifyContent: 'space-around',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    zIndex: 20,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 30,
  },
  XText: {
    textAlign: 'center',
    fontSize: 20,
    color: colors.white,
  },
});
