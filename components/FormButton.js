import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { windowHeight, windowWidth } from '../utils/Dimensions'; //Dimensions from React Native core API provides a way to get the screen width and height.

export default function FormButton({ buttonTitle, ...rest }) { //The ...rest props must be the last prop passed as a parameter, otherwise, you are going to get an error. The purpose of passing this prop is to allow the component to have other props value. ???? idgi
    return (
      <TouchableOpacity style={styles.buttonContainer} {...rest}>
        <Text style={styles.buttonText}>{buttonTitle}</Text>
      </TouchableOpacity>
    );
  }

  const styles = StyleSheet.create({
    buttonContainer: {
      marginTop: 10,
      width: windowWidth / 2,
      height: windowHeight / 15,
      backgroundColor: '#6646ee',
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 8
    },
    buttonText: {
      fontSize: 28,
      color: '#ffffff'
    }
  });