import React, { Component } from 'react';
import { Text, View, Button, Modal, StyleSheet, Picker, TextInput } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';
import ModalSelector from 'react-native-modal-selector';
import DateTimePicker from '@react-native-community/datetimepicker';


// could have a modal that will pull up the modal for requesting service

const mapStateToProps = state => {
    return {
        services: state.services
    };
};
// this might need an event handler, like oncelect, this input appears
function PetInfo(props) {
    return (
        // <View style={styles.modalRow}>
        //     <TextInput
        //         // style={{ paddingTop: 10, height: 30 }}
        //         editable={false}
        //         placeholder="Name"
        //         value={this.state.name}
        //     />
            <Text style={styles.modalLabel}>Species</Text>
            // <Text style={styles.modalLabel}>Breed</Text>
            // <Text style={styles.modalLabel}>Size</Text>
        // </View>
    );
}

class ServiceInfo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            numPets: 1,
            name: [],
            species: [],
            breed: [],
            selectedService: "",
            date: new Date(),
            showCalendar: false,
            showModal: false
        };
    }

    toggleModal() {
        this.setState({ showModal: !this.state.showModal });
    }

    handleRequest() {
        // rn it's just echoing the selections back to us
        console.log(JSON.stringify(this.state));
        this.toggleModal();
    }

    resetmodal() {
        // and then resetting
        this.setState({
            numPets: 1,
            name: [],
            species: [],
            breed: [],
            size: [],
            selectedService: "",
            date: new Date(),
            showCalendar: false,
            showModal: false
        });
    }


    render() {
        const RenderService = ({ item }) => {
            const today = this.state.date;
            var holidays = require('@date/holidays-us');
            var serviceRate = (holidays.isHoliday(today) ? item.holidayRate : item.price);

            return (
                <ListItem
                    title={item.name}
                    subtitle={item.description}
                    // subtitleStyle={{marginLeft: 75}}
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

        // const serviceId = this.props.navigation.getParam('serviceId');
        // const service = this.state.services.filter(service => service.id === serviceId)[0];
        return (

            <ScrollView>
                <Button
                    title="Make a Service Request"
                    color='#A4C936'
                    onPress={() => this.toggleModal()}
                    style={styles.button}
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
                                    (<PetInfo /> * itemValue.key)

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
                            <Text style={styles.modalLabel}>Date</Text>
                            <Button
                                onPress={() =>
                                    this.setState({ showCalendar: !this.state.showCalendar })
                                }
                                title={this.state.date.toLocaleDateString('en-US')}
                                color='#A4C936'
                                accessibilityLabel='Tap me to select a date'
                            />
                        </View>
                        {this.state.showCalendar && (
                            <DateTimePicker
                                value={this.state.date}
                                mode={'date'}
                                display='default'
                                onChange={(event, selectedDate) => {
                                    // the && below is for if the user exits out of the modal w/o selecting, bc then the value passed wd be like null and cause weird things to happen
                                    selectedDate && this.setState({ date: selectedDate, showCalendar: false });
                                }}
                                style={styles.modalItem}
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