import React, { Component } from 'react';
import { Text, View, Button, Modal, StyleSheet, TextInput, Alert } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import Loading from './LoadingComponent';
import ModalSelector from 'react-native-modal-selector';
import CalendarPicker from 'react-native-calendar-picker';
import * as Notifications from 'expo-notifications';
import * as SMS from 'expo-sms';
import { Platform } from 'react-native';



const mapStateToProps = state => {
    return {
        services: state.services
    };
};

class ServiceInfo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            numPets: 0,
            names: [],
            breeds: [],
            sizes: [],
            selectedService: "",
            startDate: null,
            endDate: null,
            showCalendar: false,
            showModal: false,
        };
        this.onDateChange = this.onDateChange.bind(this);

    }

    toggleModal() {
        this.setState({ showModal: !this.state.showModal });
    }

    handleRequest() {
        console.log(JSON.stringify(this.state));
        this.toggleModal();
        this.resetmodal();
        this.sendMessage(this.state);
    }

    resetmodal() {
        this.setState({
            numPets: 0,
            names: [],
            breeds: [],
            sizes: [],
            selectedService: "",
            startDate: null,
            endDate: null,
            showCalendar: false,
            showModal: false,
        });
    }

    onDateChange(date, type) {
        if (type === 'END_DATE') {
            this.setState({
                endDate: date.toString().slice(4, 15),
            });
        } else {
            this.setState({
                startDate: date.toString(0, 15).slice(4, 15),

            });
        }
    }


    // aync bc permiss have to be requested, and then must wait to hear back abt those permissions
    // aync is a special function that always returns a promise
    async presentLocalNotification(date, selectedService) {
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


    async sendMessage(props) {
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

    render() {

        const RenderService = ({ item }) => {
            const today = new Date();
            var holidays = require('@date/holidays-us');
            var serviceRate = (holidays.isHoliday(today) ? item.holidayRate : item.price);

            return (
                <ListItem
                    title={item.name}
                    subtitle={item.description}
                    rightSubtitle={`$${serviceRate}`}
                />
            );
        }

        if (this.props.services.isLoading) {
            return (
                <ScrollView>
                    <Card
                        title='Services'>
                        <Loading />
                    </Card>
                </ScrollView>
            );
        }
        if (this.props.services.errMess) {
            return (
                <ScrollView>
                    <Card
                        title='Services'>
                        <Text>{this.props.services.errMess}</Text>
                    </Card>
                </ScrollView>
            );
        }
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
                    onPress={() => this.toggleModal()}
                    style={styles.button}
                // cancel btn?
                />
                <Text style={{margin: 20, color: 'gray', marginBottom: -3}}>Please note that prices increase during holidays, for multiple pets, and for pets with special needs.</Text>
                <Card containerStyle={{ marginBottom: 15 }} >
                    <FlatList
                        data={this.props.services.services}
                        renderItem={RenderService}
                        keyExtractor={item => item.id.toString()}
                    />
                </Card>

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
                        <View style={{marginBottom: 20}}></View>

                        
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
            </ScrollView>
        );
    };
}

const styles = StyleSheet.create({
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

export default connect(mapStateToProps)(ServiceInfo);