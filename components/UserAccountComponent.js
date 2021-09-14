import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View, ScrollView, StyleSheet, Modal } from 'react-native'
import { ListItem } from 'react-native-elements';
import { firebase } from '../config/Firebase';

export default function UserAccount(props) {

    const [petName, setPetName] = useState('')
    const [pets, setPets] = useState([])
    const [userInfo, setUserInfo] = useState([]) //this is not showing up in the flatlist for yourInfo
    const [petSpecies, setPetSpecies] = useState('')
    const [petSize, setPetSize] = useState('')
    const [specialNeeds, setSpecialNeeds] = useState('')
    const [petBreed, setPetBreed] = useState('')

    const [editing, setEditing] = useState(false)


    const petRef = firebase.firestore().collection('pets')
    const userRef = firebase.firestore().collection('users')//this is not happy, same as above
    const userID = props.screenProps.user.id
    const user = props.screenProps.user

    useEffect(() => {
        // console.log(petRef.where("authorID", "==", userID))
        petRef
            .where("authorID", "==", userID) //find correct user for the data
            .orderBy('createdAt', 'desc')
            .onSnapshot(
                querySnapshot => {
                    // console.log(querySnapshot)
                    // console.log("--------------------")
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

    useEffect(() => {
        setUserInfo(user)
        // not sure if i need that other stuff, i couldnt get it working anyways


        // (userRef.where("id", "==", userID).orderBy('createdAt', 'desc').onSnapshot(x => {
        //     x.forEach(doc => {
        //     // console.log(doc)
        //     const user = doc.data()
        //     console.log(user)
        //     user.id = doc.id
        //                 console.log(user.id = doc.id)
        //     })
        // })
        // )

        // console.log(userRef)
        // const newInfo = []; //this is for updating address and stuff
        // console.log("------------------")




        // userRef.doc(userID).get().then(snapshot => {
        //     // console.log(snapshot)
        //     // snapshot.forEach(doc => {
        //     // console.log(doc)
        //     const userData = snapshot.data()
        //     // user.id = doc.id
        //     // console.log(userData)
        //     newInfo.push(userData)
        //     // })
        //     // console.log(userData)
        // })
        // console.table(newInfo)
        // setUserInfo(newInfo)






        // userRef //not sure this will work??? cuz you're updating your own info
        //     .where("id", "==", userID)
        //     .orderBy('createdAt', 'desc')
        //     .onSnapshot(
        //         querySnapshot => {
        //             const newInfo = []; //this is for updating address and stuff
        //             querySnapshot.forEach(doc => {
        //                 // console.log(doc)
        //                 const user = doc.data()
        //                 user.id = doc.id
        //                 newInfo.push(user)
        //             });
        //             // console.log(newInfo) //empty arr
        //             setUserInfo(newInfo)
        //         },
        //         error => {
        //             console.log(error)
        //         }
        //     )
        //     console.log(user)
        // setUserInfo(user)
        // doGetUserProfile(userID, setUserInfo(userID))
        // console.log(userInfo)


        // const currUser = userRef.doc(user.id)
        // f.update({
        //     fullName: "Joey Travolta"
        // })
        // console.log(userInfo)
    }, [])


    // dont think i can use this but it's here just in case. For userInfo update
    // const doProfileUpdate = (profile) => {
    //     return userRef
    //       .doc(this.auth.currentUser.uid)
    //       .set(profile)
    //       .catch((error) => console.error("Error: ", error));
    //   };

    function RenderPetsList() {
        return (
            <View>
                <View style={styles.infoHeaderContainer}>
                    <Text style={styles.textStyle}>Your Pets</Text>
                </View>
                {pets && (
                    <View style={styles.listContainer}>
                        <FlatList
                            data={pets}
                            renderItem={renderPet}
                            keyExtractor={(item) => item.id}
                            removeClippedSubviews={true}
                        />
                    </View>
                )}
                {/* <View>
                    <Text style={styles.smallText}>
                    </Text>
                </View> */}
            </View>
        );
    }

    // skipping this for now bc I need to figure out how to do this
    // function RenderPastServices() {
    //     return (
    //         <View>
    //             <View style={styles.infoContainer}>
    //                 <Text style={styles.textStyle}>Past Services</Text>
    //             </View>
    //             <View>
    //                 <Text style={styles.smallText}>
    //                     {'hudcnjladbkc'}
    //                 </Text>
    //             </View>
    //         </View>
    //     );
    // }


    function RenderPersonalInfoList() {
        return (
            <View>
                <View style={styles.infoHeaderContainer}>
                    <Text style={styles.textStyle}>Your Info</Text>
                </View>
                {userInfo && (
                    <View style={styles.listContainer}>
                        <FlatList
                            data={[userInfo]} //data needs to be objs in an arr
                            renderItem={renderPersonalInfo}
                            keyExtractor={(item) => item.id}
                            removeClippedSubviews={true}
                        />
                    </View>
                )}
                {/* <View>
                    <Text style={styles.smallText}>
                    </Text>
                </View> */}
            </View>
        );
    }

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

    const renderPet = ({ item, index }) => { //this is rendered w flatlist. not sure where the index is coming from
        return (
            // <View style={styles.entityContainer}>
            //     <Text style={styles.entityText}>
            //         {index}. {item.name}
            //     </Text>
            // </View>
            <ListItem
                title={item.name}
                subtitle={`${item.species} - ${item.breed} - ${item.size}`}
                rightSubtitle={`${item.specialNeeds}`}

            />
        )
    }


    const renderPersonalInfo = ({ item }) => {
        console.log(item)//this is rendered w flatlist. not sure where the index is coming from
        return (
            <View style={styles.bigInfoCont}>
                {/* <View style={styles.leftInfo}> not using these bc of flexbox */}
                <View style={styles.infoContainer}>
                    <Text style={styles.infoText}>
                        {item.fullName}
                    </Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.infoText}>
                        {item.email}
                    </Text>
                </View>
                {/* </View> */}
                {/* <View style={styles.rightInfo}> */}
                <View style={styles.infoContainer}>
                    <Text style={styles.infoText}>
                        {item.address}
                    </Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.infoText}>
                        {"Phone: " + item.phone}
                    </Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.infoText}>
                        {"Emergency Contact: " + item.emergencyNum}
                    </Text>
                </View>
                {/* </View> */}
            </View>
            // <ListItem
            //     title={item.email}
            //     subtitle={`${item.fullName}`}
            //     rightSubtitle={`${item.address}`}

            // />
        )
    }

    // toggleModal = () => {
    //     this.setState({ showModal: !this.state.showModal });
    // }

    // handleSubmitEdit = () => {
    //     console.log(JSON.stringify(this.state));
    //     this.toggleModal();
    //     this.resetmodal();
    // }

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
        <ScrollView style={styles.container}>
            {/* {!editing ? (ee) : (cc)} //trying to add ability to conditionall render either acct info or edit info screen */}
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Hello, {user.fullName}!</Text>
            </View>

            <RenderPetsList />
            {/* <RenderPastServices /> */}
            <RenderPersonalInfoList />

            {/* inside the modal -> */}
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

            <View>
                <TouchableOpacity style={styles.button} onPress={() => setEditing(true)}>
                    <Text style={styles.buttonText}>Edit info</Text>
                </TouchableOpacity>
            </View>

            {/* <Modal
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
            </Modal> */}
        </ScrollView>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'flex-start'
    },
    headerContainer: {
        // flex: 1,
        height: 60,
        alignItems: 'center',
        flexDirection: 'row'
    },
    headerText: {
        flex: 1,
        textAlign: 'center',
        fontSize: 30
    },
    infoHeaderContainer: {
        flex: 1,
        borderBottomWidth: 1,
        borderRadius: 50,
    },
    textStyle: {
        textAlign: 'left',
        // color: '#fff',
        fontSize: 20,
        padding: 7,
        marginLeft: 7
    },
    // smallText: {
    //     marginBottom: 15,
    //     marginLeft: 20,
    //     marginRight: 20
    // },
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
        // marginTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
        // borderWidth: 2 //remove later
    },
    bigInfoCont: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        // height: 'auto',
        alignContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10,
        // borderWidth: 2
        // columnGap: 5
    },
    infoContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: 5,

        // borderBottomColor: '#cccccc',
        // borderBottomWidth: 1,
        // paddingBottom: 10,
        // borderWidth: 2
    },
    infoText: {
        fontSize: 15,
        color: '#333333',
        textAlign: 'center',
        lineHeight: 23,
    },
    // leftInfo: {
    //     textAlign: "left"
    // },
    // rightInfo: {
    //     textAlign: "right",
    // }
})