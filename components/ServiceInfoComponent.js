import React, { Component } from 'react';
import { Text, View, Button, Modal, Picker } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';

// could have a modal that will pull up the form for requesting service

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
            service: [],
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

    resetForm() {
        // and then resetting
        this.setState({
            numPets: 1,
            service: [],
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

        // const serviceId = this.props.navigation.getParam('serviceId');
        // const service = this.state.services.filter(service => service.id === serviceId)[0];
        return (
            <ScrollView>
                <Card
                    containerStyle={{ marginBottom: 15 }}
                >
                    <FlatList
                        data={this.props.services.services}
                        renderItem={RenderService}
                        keyExtractor={item => item.id.toString()}

                    />
                </Card>
                <Button
                    title="Make a Service Request"
                    color='#A4C936'
                    onPress={() => this.toggleModal()}
                />

                <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.showModal}
                    onRequestClose={() => this.toggleModal()}
                >
                    <ScrollView>
                        <View>
                            <Text>Number of Pets</Text>
                            <Picker>
                                <Picker.Item label='1' value='1' />
                                <Picker.Item label='2' value='2' />
                                <Picker.Item label='3' value='3' />
                                <Picker.Item label='4' value='4' />
                                <Picker.Item label='5' value='5' />
                                <Picker.Item label='6' value='6' />
                            </Picker>
                        </View>
                        <View>
                            <Text>What service are you requesting?</Text>
                        </View>
                        <View>
                            <Text>Date</Text>
                            <Button
                                onPress={() =>
                                    this.setState({ showCalendar: !this.state.showCalendar })
                                }
                                // this title sets the label on the btn
                                title={this.state.date.toLocaleDateString('en-US')}
                                color='#5637DD'
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
                                style={styles.formItem}
                            />
                        )}
                        <View>
                            <Button
                                onPress={() => {
                                    this.handleRequest();
                                    this.resetForm();
                                }}
                                title='Submit Request'
                                color='#5637DD'
                                accessibilityLabel='Tap me'
                            />
                        </View>

                    </ScrollView>
                </Modal>
            </ScrollView>
        );
    };
}

export default connect(mapStateToProps)(ServiceInfo);