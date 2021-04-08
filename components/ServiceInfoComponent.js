import React from 'react';
import { Text, View } from 'react-native';
import { Card } from 'react-native-elements';

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

function ServiceInfo(props) {
    return <RenderService service={props.service} />;
}

export default ServiceInfo;