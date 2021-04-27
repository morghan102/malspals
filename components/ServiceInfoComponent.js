import React, { Component } from 'react';
import { Text, View, Button, Modal, StyleSheet, Picker, TextInput } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';
import ModalSelector from 'react-native-modal-selector';
import CalendarPicker from 'react-native-calendar-picker';
import * as Notifications from 'expo-notifications';



const mapStateToProps = state => {
    return {
        services: state.services
    };
};

class ServiceInfo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            numPets: 1,
            name: [],
            species: [],
            breed: [],
            selectedService: "",
            selectedStartDate: null,
            selectedEndDate: null,
            showCalendar: false,
            showModal: false,
            endDateViewAppear: false,
        };
        this.onDateChange = this.onDateChange.bind(this);
        // idk if i need that?

    }

    toggleModal() {
        this.setState({ showModal: !this.state.showModal });
    }

    handleRequest() {
        console.log(JSON.stringify(this.state));
        this.presentLocalNotification(this.state.selectedStartDate, this.state.selectedService);
        this.toggleModal();
    }

    resetmodal() {
        // and then resetting
        this.setState({
            numPets: 1,
            // id like to get rid of this at some pt, replacing num w a dropdwn of pets on the clients acct
            name: [],
            species: [],
            breed: [],
            size: [],
            selectedService: "",
            selectedStartDate: null,
            selectedEndDate: null,
            showCalendar: false,
            showModal: false,
            endDateViewAppear: false,
        });
    }

    onDateChange(date, type) {
        if (type === 'END_DATE') {
            this.setState({
                selectedEndDate: date.toString().slice(4, 15),
            });
        } else {
            this.setState({
                selectedStartDate: date.toString(0, 15).slice(4, 15),
                // endDate: null,
                // meybs I want to comment enddate null out
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




    render() {
        const { selectedStartDate, selectedEndDate } = this.state;
        const startDate = selectedStartDate ? selectedStartDate.toString() : '';
        const endDate = selectedEndDate ? selectedEndDate.toString() : '';



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
                <Card
                    containerStyle={{ marginBottom: 15 }}
                >
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
                            <Text style={styles.modalLabel}>What service are you requesting?</Text>
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
                            <Text style={styles.modalLabel}>Date(s)</Text>
                            <Button
                                onPress={() =>
                                    this.setState({ showCalendar: !this.state.showCalendar })
                                }
                                title={`${this.state.selectedStartDate === null ? new Date().toDateString() : this.state.selectedStartDate}${this.state.selectedEndDate === null ? "" : ", " + this.state.selectedEndDate}`}
                                color='#A4C936'
                                accessibilityLabel='Tap me to select a date(s)'
                            />
                        </View>
                        {this.state.showCalendar && (
                            <CalendarPicker
                                allowRangeSelection={true}
                                minDate={new Date()}
                                todayBackgroundColor="#f2e6ff"
                                selectedDayColor="#7300e6"
                                selectedDayTextColor="#FFFFFF"
                                // value={this.state.startDate}
                                // mode={'date'}
                                // display='default'
                                onDateChange={this.onDateChange}
                            // style={styles.modalItem}
                            />
                        )}



                        <View>
                            <Button
                                onPress={() => {
                                    this.handleRequest();
                                    this.resetmodal();
                                }}
                                title='Submit Request'
                                color='#A4C936'
                                accessibilityLabel='Tap me'
                            />
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
        marginTop: 20
    },
    modalHeader: {
        fontSize: 23,
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center',
        borderBottomWidth: 1.5,
        marginBottom: 5,
    },
    modalRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    modalLabel: {
        fontSize: 18,
        flex: 2
    },
    modalItem: {
        flex: 1
    },
})

export default connect(mapStateToProps)(ServiceInfo);