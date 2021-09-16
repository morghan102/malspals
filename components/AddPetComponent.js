import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View, ScrollView, StyleSheet, Modal, Alert } from 'react-native'
import { ListItem, Card } from 'react-native-elements';
import { firebase } from '../config/Firebase';

export default function AddPet(props) {
    const [petName, setPetName] = useState('')
    const [pets, setPets] = useState([])
    const [petSpecies, setPetSpecies] = useState('')
    const [petSize, setPetSize] = useState('')
    const [specialNeeds, setSpecialNeeds] = useState('')
    const [petBreed, setPetBreed] = useState('')

    const petRef = firebase.firestore().collection('pets')
    const userRef = firebase.firestore().collection('users')
    const userID = props.screenProps.user.id
    const user = props.screenProps.user

    useEffect(() => {
        petRef
            .where("authorID", "==", userID)
            .orderBy('createdAt', 'desc')
            .onSnapshot(
                querySnapshot => {
                    const newPets = [];
                    querySnapshot.forEach(doc => {
                        const pet = doc.data()
                        pet.id = doc.id
                        newPets.push(pet)
                    });
                    setPets(newPets)
                },
                error => {
                    console.log(error)
                }
            )
    }, [])


    const onAddButtonPress = () => {
        if (petName && petName.length > 0 && petSpecies && petSize && petBreed && specialNeeds) { //i can probably map over the entire thing of entries and check that they're all filled out. or do it some other way
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
                // .doc(name)//to update i need the id's of the pet im referencing or to set the id as the name but petName does nothing
                .add(data)
                .then(_doc => {
                    setPetName('')
                    setPetSize('')
                    setPetSpecies('')
                    setSpecialNeeds('')
                    setPetBreed('')
                    Keyboard.dismiss()
                })
                .catch((error) => {
                    alert(error)
                });
        } else {
            Alert.alert('', 'Please completely fill in the form.')
        }
    }



    return (
        <ScrollView style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Add a New Pet</Text>
            </View>

            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder='Pet name'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setPetName(text)}
                    value={petName}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder='Species'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setPetSpecies(text)}
                    value={petSpecies}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder='Breed'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setPetBreed(text)}
                    value={petBreed}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder='Size (lbs)'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setPetSize(text)}
                    value={petSize}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder='Special needs?'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setSpecialNeeds(text)}
                    value={specialNeeds}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity style={styles.button} onPress={onAddButtonPress}>
                    <Text style={styles.buttonText}>Save Changes</Text>
                </TouchableOpacity>
            </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
    },
    headerContainer: {
        height: 60,
        alignItems: 'center',
        flexDirection: 'row'
    },
    headerText: {
        flex: 1,
        textAlign: 'center',
        fontSize: 30,
        borderBottomWidth: 1,
        margin: 80
    },
    formContainer: {
        flexDirection: 'column',
        marginBottom: 20,
        flex: 1,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 30,
        paddingRight: 30,
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        paddingLeft: 16,
        flex: 1,
        marginRight: 5
    },
    button: {
        height: 47,
        borderRadius: 5,
        backgroundColor: '#B980D4',
        width: 'auto',
        alignItems: "center",
        justifyContent: 'center',
        marginTop: 30
    },
    buttonText: {
        color: 'white',
        fontSize: 16
    },

})