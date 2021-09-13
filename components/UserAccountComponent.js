import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native'
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

    const onBeginEditBtnPress = () => {

    }

    const onConfirmEditBtnPress = () => {

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

    toggleModal = () => {
        this.setState({ showModal: !this.state.showModal });
    }

    handleSubmitEdit = () => {
        console.log(JSON.stringify(this.state));
        this.toggleModal();
        this.resetmodal();
    }

    resetmodal = () => {
        this.setState({
            // this will all be the setState hooks for whatever info gets put into the modal.
            // it is whatever's fetched from firebase, so I guess it'll just be reading from that


            // numPets: 0,
            // names: [],
            // breeds: [],
            // sizes: [],
            // selectedService: "",
            // startDate: null,
            // endDate: null,
            // showCalendar: false,
            // showModal: false,
            // showAlert: false
        });
    }


    return (
        <View style={styles.container}>
            {/* {!editing ? (ee) : (cc)} //trying to add ability to conditionall render either acct info or edit info screen */}
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

            <Modal
                animationType={'slide'}
                transparent={false}
                visible={this.state.showModal}
                onRequestClose={() => this.toggleModal()}
            >
                <ScrollView>
                    <View style={styles.modal}>
                        <Text style={styles.modalHeader}>Service Request</Text>
                    </View>
                    <View style={styles.modalRow}>
                        <Text style={styles.modalLabel}>Number of Pets</Text>
                        <ModalSelector
                            style={styles.modalItem}
                            data={numbers}
                            onChange={itemValue => {
                                this.setState({ numPets: itemValue.label });
                                // (<PetInfo /> * itemValue.key)

                            }}
                            cancelButtonAccessibilityLabel={'Cancel Button'}
                            initValue="How many pets?"
                            supportedOrientations={['landscape']}
                            accessible={true}
                            scrollViewAccessibilityLabel={'Scrollable options'}
                        >
                            <TextInput
                                style={{ paddingTop: 10, height: 30 }}
                                editable={false}
                                placeholder="Select"
                                value={this.state.numPets}
                            />
                        </ModalSelector>
                    </View>


                    <View style={styles.modalRow}>
                        <Text style={styles.modalLabel}>Service</Text>
                        <ModalSelector
                            style={styles.modalItem}
                            data={this.props.services.services}
                            onChange={itemValue => this.setState({ selectedService: itemValue.name })}
                            cancelButtonAccessibilityLabel={'Cancel Button'}
                            initValue="Which service?"
                            supportedOrientations={['landscape']}
                            accessible={true}
                            scrollViewAccessibilityLabel={'Scrollable options'}
                        >
                            <TextInput
                                style={{ paddingTop: 10, height: 30 }}
                                editable={false}
                                placeholder="Select"
                                value={this.state.selectedService} />
                        </ModalSelector>

                    </View>


                    <View style={styles.modalRow}>
                        <Text style={styles.modalLabel}>Pet Name</Text>
                        <TextInput
                            onChangeText={itemValue => this.setState({ names: itemValue.split(", ") })}
                            value={this.state.names}
                            supportedOrientations={['landscape']}
                            placeholder="Enter"
                            keyboardType="default"
                            style={styles.modalItem}
                        />
                    </View>
                    <View style={styles.modalRow}>
                        <Text style={styles.modalLabel}>Pet Breed/Species</Text>
                        <TextInput
                            onChangeText={itemValue => this.setState({ breeds: itemValue.split(", ") })}
                            value={this.state.breeds}
                            supportedOrientations={['landscape']}
                            placeholder="Enter"
                            keyboardType="default"
                            style={styles.modalItem}
                        />
                    </View>
                    <View style={styles.modalRowWFoot}>
                        <Text style={styles.modalLabel}>Pet Size</Text>
                        <TextInput
                            onChangeText={itemValue => this.setState({ sizes: itemValue.split(", ") })}
                            value={this.state.sizes}
                            supportedOrientations={['landscape']}
                            placeholder="Enter"
                            keyboardType="default"
                            style={styles.modalItem}
                        />
                    </View>
                    <Text style={styles.footerLabel}>If multiple, please seperate with a comma</Text>


                    <View style={styles.modalRow}>
                        <Text style={styles.modalLabel}>Date(s)</Text>
                        <Button
                            onPress={() =>
                                this.setState({ showCalendar: !this.state.showCalendar })
                            }
                            title={`${this.state.startDate === null ? 'Select' : this.state.startDate}${this.state.endDate === null ? "" : " - " + this.state.endDate}`}
                            color='#A4C936'
                            accessibilityLabel='Tap me to select a date(s)'
                        />
                    </View>
                    <View style={{ marginBottom: 20 }}></View>


                    {this.state.showCalendar && (
                        <CalendarPicker
                            allowRangeSelection={true}
                            minDate={new Date()}
                            todayBackgroundColor="#f2e6ff"
                            selectedDayColor="#7300e6"
                            selectedDayTextColor="#FFFFFF"
                            onDateChange={this.onDateChange}
                        />
                    )}
                    {!!this.state.error && (
                        <Text style={{ color: "red", marginLeft: 20, marginBottom: 10 }}>{this.state.error}</Text>
                    )}



                    <View>
                        <Button
                            onPress={() => {
                                if (this.state.numPets === 0 || this.state.names === "" || this.state.breeds === "" || this.state.sizes === "" || this.state.selectedService === "" || this.state.startDate === null) {
                                    this.setState(() => ({ error: "Please complete form." }));
                                } else {
                                    this.setState(() => ({ error: null }));
                                    this.handleRequest();

                                }
                            }}
                            title='Compose request message'
                            color='#A4C936'
                            accessibilityLabel='Tap me'
                        />
                        <Text style={styles.footerMessage}>Click will take you to your messaging app. {"\n"}Please do not alter message. {"\n"}If your pet has special requirements, please send as seperate message.</Text>
                    </View>

                </ScrollView>
            </Modal>
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