import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { SERVICES } from '../shared/services';


// function RenderService({services}) {
//      {
//         return (
//             <Card 
//                 featuredTitle={service.name}
//                 image={require('./images/arabica.jpg')}
//             >
//                 <Text style={{margin: 50}}>
//                     {service.description}
//                 </Text>
//             </Card>
//         );
//     }
//     return <View />;
// }

class ServiceInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            services: SERVICES
        };
    }


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
        // const serviceId = this.props.navigation.getParam('serviceId');
        // const service = this.state.services.filter(service => service.id === serviceId)[0];
        return (
            <ScrollView>
{/* a title of some kind                 */}
                <Card
                // title="What do you need?"
                >
                    <FlatList
                        data={this.state.services}
                        renderItem={RenderService}
                        keyExtractor={item => item.id.toString()}
                    />
                </Card>
            </ScrollView>
        );
    };
}

export default ServiceInfo;