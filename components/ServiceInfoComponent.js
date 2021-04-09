import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Card } from 'react-native-elements';
import { SERVICES } from '../shared/services';


function RenderService({service}) {
    if (service) {
        return (
            <Card 
                featuredTitle={service.name}
                image={require('./images/arabica.jpg')}
            >
                <Text style={{margin: 50}}>
                    {service.description}
                </Text>
            </Card>
        );
    }
    return <View />;
}

class ServiceInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            services: SERVICES
        };
    }
    render() {
        const serviceId = this.props.navigation.getParam('serviceId');
        const service = this.state.services.filter(service => service.id === serviceId)[0];
        return <RenderService service={service} />
    };
}

export default ServiceInfo;