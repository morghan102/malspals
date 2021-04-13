import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import { SERVICES } from '../shared/services';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // THIS IS MY GUESS AS TO WHAT THE STATE WILL LOOK LIKE
            services: SERVICES,
            // reviews: REVIEWS,
            // dogImages: DOGIMAGES NOT SURE THIS WILL NEED TO BE A PSRT OF THE STATE?
        };
    }

    render() {

        const renderHomeItem = ({item}) => {
            return (
                <ListItem
                    title={item.name}
                    subtitle={item.description}
                    // onPress={() => navigate('ServiceInfo', { serviceId: item.id })}
                    leftAvatar={{ source: require('./images/arabica.jpg')}}
                />
            );
        };
        return (
        <FlatList
            data={this.state.services}
            renderItem={renderHomeItem}
            keyExtractor={item => item.id.toString()}
        />)
        };
}

export default Home;