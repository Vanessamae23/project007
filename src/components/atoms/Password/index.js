import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { ICEye, ICEyeOff } from '../../../assets';

const togglePasswordVisibility = () => {
    const [isPasswordSecure, setIsPasswordSecure] = useState(true);
    const [rightIcon, setRightIcon] = useState(ICEye);

    const handlePasswordVisibility = () => {
        if (rightIcon == ICEyeOff) {
            setIsPasswordSecure(true);
            setRightIcon(ICEye);
        } else {
            setIsPasswordSecure(false);
            setRightIcon(ICEyeOff);
        }
    }

    return { isPasswordSecure, rightIcon, handlePasswordVisibility}
}

export default togglePasswordVisibility;