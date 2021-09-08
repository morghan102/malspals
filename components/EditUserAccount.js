import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native'
// import styles from './styles';
import { firebase } from '../config/Firebase';


export default function EditUserAccount(props) {

    
    const [petName, setPetName] = useState('')
    const [entities, setEntities] = useState([])
    const [petSpecies, setPetSpecies] = useState('')
    const [petSize, setPetSize] = useState('')
    const [specialNeeds, setSpecialNeeds] = useState('')
    const [petBreed, setPetBreed] = useState('')


    const petRef = firebase.firestore().collection('pets')
    const userID = props.screenProps.user.id //i need to make sure the screenProps is passed

    //read data... right?
    useEffect(() => {
        petRef
            .where("authorID", "==", userID)
            .orderBy('createdAt', 'desc')
            .onSnapshot(
                querySnapshot => {
                    const newPets = []
                    querySnapshot.forEach(doc => {
                        const pet = doc.data()
                        pet.id = doc.id
                        newPets.push(pet)
                    });
                    setEntities(newPets)
                },
                error => {
                    console.log(error)
                }
            )
    }, [])


    //takes care of sending to firebase
    const onAddButtonPress = () => {
        if (petName && petName.length > 0) { //i can probably map over the entire thing of entries and check that they're all filled out. or do it some other way
            const timestamp = firebase.firestore.FieldValue.serverTimestamp();
            const data = {
                name: petName,
                species: petSpecies,
                size: petSize,
                breed: petBreed,
                specialNeeds: specialNeeds,
                authorID: userID,
                createdAt: timestamp,
            };

            petRef
                .add(data)
                .then(() => {
                    navigation.navigate('UserAccount')//navigate back to useracctcomp



                    // setPetName('')
                    // setPetSize('')
                    // setPetSpecies('')
                    // setSpecialNeeds('')
                    // setPetBreed('')
                    // Keyboard.dismiss()
                })
                .catch((error) => {
                    alert(error)
                });
        }
    }



}