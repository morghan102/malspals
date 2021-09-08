import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native'
// import styles from './styles';
import { firebase } from '../config/Firebase';
import EditUserAccount from './EditUserAccount';

export default function UserAccount(props) {

    const [petName, setPetName] = useState('')
    const [entities, setEntities] = useState([])
    const [petSpecies, setPetSpecies] = useState('')
    const [petSize, setPetSize] = useState('')
    const [specialNeeds, setSpecialNeeds] = useState('')
    const [petBreed, setPetBreed] = useState('')

    const [editing, setEditing] = useState(false)


    const petRef = firebase.firestore().collection('pets')
    const userID = props.screenProps.user.id

    useEffect(() => {
        petRef
            .where("authorID", "==", userID) //find correct user for the data
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


            // const usersRef = firebase.firestore().collection('users')
            // petRef.doc(uid).set(account).then(() => {
            //     navigation.navigate('App', { user: account })
            //     console.log(account)

            // })
            petRef
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
        }
    }

    const renderPet = ({ item, index }) => { //this is rendered w flatlist
        return (
            <View style={styles.entityContainer}>
                <Text style={styles.entityText}>
                    {index}. {item.name}
                </Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            {!editing ? (ee) : (cc)}
            <View>
                <Text>Header</Text>
            </View>
            <View>
                <Text>info they inputted when signed up</Text>
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
            {/* below this needs to change */}
            {entities && (
                <View style={styles.listContainer}>
                    <FlatList
                        data={entities}
                        renderItem={renderPet}
                        keyExtractor={(item) => item.id}
                        removeClippedSubviews={true}
                    />
                </View>
            )}
            <View>
                <TouchableOpacity style={styles.button} onPress={() => setEditing(true)}>
                    <Text style={styles.buttonText}>Edit info</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    formContainer: {
        flexDirection: 'row',
        height: 80,
        marginTop: 40,
        marginBottom: 20,
        flex: 1,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 30,
        paddingRight: 30,
        justifyContent: 'center',
        alignItems: 'center'
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
        backgroundColor: '#788eec',
        width: 80,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 16
    },
    listContainer: {
        marginTop: 20,
        padding: 20,
    },
    entityContainer: {
        marginTop: 16,
        borderBottomColor: '#cccccc',
        borderBottomWidth: 1,
        paddingBottom: 16
    },
    entityText: {
        fontSize: 20,
        color: '#333333'
    }
})