import { View, Text, Modal, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { colors } from '../../../utils'
import Button from '../Button'
import Gap from '../Gap'

export default function TransferModal({ visible, onClose, contact, navigation }) {

    const closeModal = () => {
        onClose()
    }

    const handleYes = () => {
        onClose()
        navigation.navigate('TransferAmount', {contact})
    }

    return (
        <>
            <Modal
            transparent={true}
            visible={visible}
            animationIn="slideInLeft"
            animationOut="slideOutRight">
            <View
            style={{
                backgroundColor: 'rgba(0,0,0,0.2)',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
            }}>
            <View
                style={{
                width: '90%',
                backgroundColor: colors.primary,
                padding: 22,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
                borderColor: 'rgba(0, 0, 0, 0.1)',
                }}>
                <Text style={styles.heading}>
                    Are you sure you want to transfer to {contact.name}?  
                </Text>

                <Text style={styles.subHeading}>
                    {contact.name} has a risk level of {contact.risk}
                </Text>

                <View style={{width: '100%'}}>

                    <Button
                        textColor={colors.blacsdk}
                        color={colors.secondary}
                        onPress={handleYes}
                        text="Yes"
                    ></Button>  

                    <Gap height={15} />

                    <Button
                        textColor={colors.blacsdk}
                        color={colors.secondary}
                        onPress={closeModal}
                        text="Cancel"
                    ></Button>

                </View>
                

                
                
            </View>
            </View>
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingTop: 25,
        zIndex: 1
    },
    heading: {
        fontWeight: '600',
        fontSize: 20,
        textAlign: 'center',
        paddingBottom: 25,
        color: 'white'
    },
    subHeading: {
        fontSize: 16,
        color: 'white',
        paddingBottom: 30,
    }
})