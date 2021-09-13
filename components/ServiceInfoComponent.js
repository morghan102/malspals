import React, { useState, useEffect } from 'react';
import { Text, View, Button, Modal, StyleSheet, TextInput, Alert, TouchableOpacity } from 'react-native';
import { Card, ListItem, Icon } from 'react-native-elements';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import ModalSelector from 'react-native-modal-selector';
import CalendarPicker from 'react-native-calendar-picker';
import * as Notifications from 'expo-notifications';
import * as SMS from 'expo-sms';
import { Platform } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import Loading from './LoadingComponent';
import { firebase } from '../config/Firebase';


// const mapStateToProps = state => {
//     return {
//         services: state.services
//     };
// };

function ServiceInfo(props) {

    // constructor(props) {
    //     super(props);

    //     this.state = {
    //         numPets: 0,
    //         names: [],
    //         breeds: [],
    //         sizes: [],
    //         selectedService: "",
    //         startDate: null,
    //         endDate: null,
    //         showCalendar: false,
    //         showModal: false,
    //         showAlert: false
    //     };
    //     this.onDateChange = this.onDateChange.bind(this);

    // }

    const [numPets, setNumPets] = useState(0)
    const [names, setNames] = useState([])
    const [data, setData] = useState([])
    const [species, setSpecies] = useState('')
    const [sizes, setSizes] = useState([])
    // const [specialNeeds, setSpecialNeeds] = useState('')
    const [breeds, setBreeds] = useState([])
    const [selectedService, setSelectedService] = useState('')
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [showCalendar, setShowCalendar] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [services, setServices] = useState([])

    const [loading, setLoading] = useState(true); // Set loading to true on component mount
    const [editing, setEditing] = useState(false)


    const servicesRef = firebase.firestore().collection('services')


    //for the alert popup
    function showAlertFunc() {
        setShowAlert(true);
    };

    function hideAlert() {
        setShowAlert(false);
    };    //end popup

    function toggleModal() {
        setShowModal(!showModal);
    }

    function handleRequest() {
        console.log(JSON.stringify(names)); //it wont be state...
        this.toggleModal();
        this.resetmodal();
        // this.sendMessage(this.state);//need to make a data object
    }

    function resetmodal() {
        setNumPets(0); //fetch all this info from firebase for the current user
        setNames([]);
        setBreeds([]);
        setSizes([]);
        setSelectedService("");
        setStartDate(null)
        setEndDate(null);
        setShowCalendar(false);
        setShowModal(false);
        setShowAlert(false);
    }

    function onDateChange(date, type) {
        if (type === 'END_DATE') {
            setEndDate(date.toString().slice(4, 15))
        } else {
            setStartDate(date.toString(0, 15).slice(4, 15))
        }
    }


    // !!!!!!!!!!!!!!!!!! this async/await func has t0 be handled diff in func comp
    // aync bc permiss have to be requested, and then must wait to hear back abt those permissions
    // aync is a special function that always returns a promise
    async function presentLocalNotification(date, selectedService) {
        // since we're waiting for the pesmiss, have to have the code for sending the notif in another func that we'll call when ready
        function sendNotification() {
            // overrides default that no notifs will show when app is in foregruond
            Notifications.setNotificationHandler({
                handleNotification: async () => ({
                    shouldShowAlert: true
                })
            });

            Notifications.scheduleNotificationAsync({
                content: {
                    title: 'Your Service Request',
                    body: `Your request for ${selectedService}, ${date} has been submitted`
                },
                // causes notif to fire immed. cd also set to future or repeat or both
                trigger: null
            });
        }

        let permissions = await Notifications.getPermissionsAsync();
        if (!permissions.granted) {
            permissions = await Notifications.requestPermissionsAsync();
        }
        if (permissions.granted) {
            sendNotification();
        }
    }


    async function sendMessage(props) {
        const isAvailable = await SMS.isAvailableAsync(); // returns promise of t/f
        if (isAvailable) {
            const { result } = await SMS.sendSMSAsync( // returns promise of "sent", "canceled", or "unknown"
                "5094949647", //array of strings of recipients 
                `MP app: I am requesting a ${props.selectedService} on ${props.startDate} ${props.endDate != null ? ("to " + props.endDate) : ""}. There is ${props.numPets} pets: ${props.names}, ${props.breeds}, weighing ${props.sizes}.`
            );

            if (result != null && result === "sent") {
                console.log("message went through");
                this.presentLocalNotification(props.startDate, props.selectedService);
            } else if (Platform.OS === 'android') {
                console.log("Note: Device OS is android, message status unknown due to Expo SMS & Android interaction");
            } else {
                Alert.alert(
                    "Message",
                    "Message has been canceled or there was an unforeseen error."
                );
            };
        } else {
            Alert.alert(
                "Sms request",
                "Sms is unavailable on this device"
            );
        }

    }

    //this is not working bc the navigation thing is just for an entire componenet. i need meybs the usefocus effect hook
    // https://reactnavigation.org/docs/function-after-focusing-screen/
    // function ToggleAlert(navigation) {
    //     return (
    //     React.useEffect(() => {
    //         const unsub = navigation.addListener('focus', () => {
    //             Alert.alert("title", "message");
    //         });
    //     }, [navigation])
    //     );
    // }
    // function AlertPopup() {
    //     return (this.props.isFocused ? Alert.alert("hi") : "");
    // }

    // const { showAlert } = this.state;

    function PricingAlert() {
        return (
            <View style={styles.container}>

                <Text>I'm AwesomeAlert</Text>
                <TouchableOpacity onPress={() => {
                    showAlertFunc();
                }}>
                    <View style={styles.button}>
                        <Text style={styles.text}>Try me!</Text>
                    </View>
                </TouchableOpacity>

                <AwesomeAlert
                    show={showAlert}
                    showProgress={false}
                    title="AwesomeAlert"
                    message="I have a message for you!"
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    showCancelButton={true}
                    showConfirmButton={true}
                    cancelText="No, cancel"
                    confirmText="Yes, delete it"
                    confirmButtonColor="#DD6B55"
                    onCancelPressed={() => {
                        hideAlert();
                    }}
                    onConfirmPressed={() => {
                        hideAlert();
                    }}
                />
            </View>
        );
    };

    const RenderService = ({ item }) => {
        return (
            <ListItem
                title={item.name}
                subtitle={item.description}
                rightSubtitle={`$${item.price}`}
                icon={{ name: 'fa-question-circle', type: 'font-awesome' }}
            />
        );
    }

    useEffect(() => {
        // const subscriber = firestore()
        //     .collection('services')
        servicesRef
            .onSnapshot(querySnapshot => {
                const services = [];

                querySnapshot.forEach(documentSnapshot => {
                    services.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    });
                });

                setServices(services);
                setLoading(false);
            });

        // Unsubscribe from events when no longer in use
        return () => subscriber();
    }, []);


    // these 2 below need to be updated for firebase and functional comp
    // if (this.props.services.isLoading) { //below is followiung firebase suggestion
    if (loading) {
        return (
            <ScrollView>
                <Card
                    title='Services'>
                    <Loading />
                </Card>
            </ScrollView>
        );
    }
    // if (this.props.services.errMess) {
    //     return (
    //         <ScrollView>
    //             <Card
    //                 title='Services'>
    //                 <Text>{this.props.services.errMess}</Text>
    //             </Card>
    //         </ScrollView>
    //     );
    // }


    const numbers = [
        { key: 1, label: "1" },
        { key: 2, label: "2" },
        { key: 3, label: "3" },
        { key: 4, label: "4" },
        { key: 5, label: "5" },
        { key: 6, label: "6" },
    ];

    return (
        <ScrollView>
            <Button
                title="Make a Service Request"
                color='#A4C936'
                onPress={() => toggleModal()}
                style={styles.button}
            // cancel btn?
            />
            <Text style={{ margin: 20, color: 'gray', marginBottom: -3 }}>Please note that prices increase during holidays, for multiple pets, and for pets with special needs.</Text>

            {/* i would like to put the btn in itrs own custom component but couldnt get that working */}
            <View style={styles.container}>
                <TouchableOpacity onPress={() => {
                    showAlertFunc();
                }}>
                    {/* <Icon name='question-circle' type='font-awesome'/> */}
                    <View style={styles.button}>
                        <Text style={styles.text}>What do those prices mean?</Text>
                    </View>
                </TouchableOpacity>
                <AwesomeAlert
                    show={showAlert}
                    showProgress={false}
                    title="Why is there a range of prices shown?"
                    message="Mal has chosen to offer range pricing, based on clients' income. Mal asks that you pay what you can."
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    showCancelButton={true}
                    showConfirmButton={false}
                    cancelText="Got it!"
                    cancelButtonColor="#DD6B90"
                    onCancelPressed={() => {
                        hideAlert();
                    }}
                />
            </View>



            <Card containerStyle={{ marginBottom: 15 }} >
                <FlatList
                    data={services}
                    renderItem={RenderService}
                    // keyExtractor={item => item.id.toString()}
                />
            </Card>

            <Modal
                animationType={'slide'}
                transparent={false}
                visible={showModal}
                onRequestClose={() => toggleModal()}
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
                                setNumPets(itemValue.label)
                                // setState({ numPets: itemValue.label }); 
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
                                value={numPets}
                            />
                        </ModalSelector>
                    </View>


                    <View style={styles.modalRow}>
                        <Text style={styles.modalLabel}>Service</Text>
                        <ModalSelector
                            style={styles.modalItem}
                            data={services}
                            onChange={itemValue => setSelectedService(itemValue.name)}
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
                                value={selectedService} />
                        </ModalSelector>

                    </View>


                    <View style={styles.modalRow}>
                        <Text style={styles.modalLabel}>Pet Name</Text>
                        <TextInput
                            onChangeText={itemValue => setNames(itemValue.split(", "))}
                            value={names}
                            supportedOrientations={['landscape']}
                            placeholder="Enter"
                            keyboardType="default"
                            style={styles.modalItem}
                        />
                    </View>
                    <View style={styles.modalRow}>
                        <Text style={styles.modalLabel}>Pet Breed/Species</Text>
                        <TextInput
                            onChangeText={itemValue => setBreeds(itemValue.split(", ") )}
                            value={breeds}
                            supportedOrientations={['landscape']}
                            placeholder="Enter"
                            keyboardType="default"
                            style={styles.modalItem}
                        />
                    </View>
                    <View style={styles.modalRowWFoot}>
                        <Text style={styles.modalLabel}>Pet Size</Text>
                        <TextInput
                            onChangeText={itemValue => setSizes(itemValue.split(", "))}
                            value={sizes}
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
                                setShowCalendar(!showCalendar)
                            }
                            title={`${startDate === null ? 'Select' : startDate}${endDate === null ? "" : " - " + endDate}`}
                            color='#A4C936'
                            accessibilityLabel='Tap me to select a date(s)'
                        />
                    </View>
                    <View style={{ marginBottom: 20 }}></View>


                    {showCalendar && (
                        <CalendarPicker
                            allowRangeSelection={true}
                            minDate={new Date()}
                            todayBackgroundColor="#f2e6ff"
                            selectedDayColor="#7300e6"
                            selectedDayTextColor="#FFFFFF"
                            onDateChange={onDateChange}
                        />
                    )}
                    {/* {!!this.state.error && ( //change
                        <Text style={{ color: "red", marginLeft: 20, marginBottom: 10 }}>{this.state.error}</Text>
                    )} */}



                    <View>
                        <Button
                            onPress={() => {
                                if (numPets === 0 || names === "" || breeds === "" || sizes === "" || selectedService === "" || startDate === null) {
                                    setState(() => ({ error: "Please complete form." }));//change
                                } else {
                                    setState(() => ({ error: null }));//change
                                    handleRequest();

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
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        margin: 10,
        // paddingBottom: 0,
        marginBottom: 0
        // i want this flush with the top of the card
    },
    button: {
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 7,
        borderRadius: 5,
        backgroundColor: "#F57E4A",
    },
    text: {
        color: '#fff',
        fontSize: 15
    },
    modal: {
        justifyContent: 'center',
        marginTop: 10
    },
    modalHeader: {
        fontSize: 20,
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center',
        borderBottomWidth: 1.5,
        marginBottom: 8,
    },
    modalRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20,
        marginBottom: 3
    },
    modalRowWFoot: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 15
    },
    modalLabel: {
        fontSize: 18,
        flex: 2
    },
    modalItem: {
        flex: 1,
    },
    footerLabel: {
        color: 'gray',
        marginLeft: 20,
        fontSize: 13,
        marginBottom: 3
    },
    footerMessage: {
        color: 'gray',
        fontSize: 12,
        marginTop: 10,
        textAlign: 'center'
    }
})
export default ServiceInfo;
// export default connect(mapStateToProps)(ServiceInfo);