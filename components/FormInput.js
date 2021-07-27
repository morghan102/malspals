//This component is going to provide a text input field for the screen components to use and for the user to enter the 
// credentials

import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { windowHeight, windowWidth } from '../utils/Dimensions';


export default function FormInput({ labelValue, placeholderText, ...rest }) {
    return (
        <TextInput
            value={labelValue}
            style={styles.input}
            numberOfLines={1}
            placeholder={placeholderText}
            placeholderTextColor='#666'
            {...rest}
        />
    );
}


const styles = StyleSheet.create({
    input: {
        padding: 10,
        marginTop: 5,
        marginBottom: 10,
        width: windowWidth / 1.5,
        height: windowHeight / 15,
        fontSize: 16,
        borderRadius: 8,
        borderWidth: 1
    }
});