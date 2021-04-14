import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';


const mapStateToProps = state => {
    return {
        services: state.services
            // reviews: 
    };
};
class ServiceInfo extends Component {

    render() {            
        const RenderService = ({ item }) => {   
         // this will need to be a select date thing, not the current day           
            const today = new Date();
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
{/* a title of some kind                 */}
                <Card
                // title="What do you need?"
                >
                    <FlatList
                        data={this.props.services.services}
                        renderItem={RenderService}
                        keyExtractor={item => item.id.toString()}
                    />
                </Card>
            </ScrollView>
        );
    };
}

export default connect(mapStateToProps)(ServiceInfo);