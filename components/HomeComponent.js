import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import { SERVICES } from '../shared/services';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = state => {
    return {
        services: state.services
            // reviews: 
            // dogImages:  NOT SURE THIS WILL NEED TO BE A PSRT OF THE STATE?
            // comments?
    };
};

class Home extends Component {

    render() {

        const renderHomeItem = ({item}) => {
            return (
                <ListItem
                    title={item.name}
                    subtitle={item.description}
                    // onPress={() => navigate('ServiceInfo', { serviceId: item.id })}
                    leftAvatar={{ source: require('./images/arabica.jpg')}}
                    // i can change the image source to be the server. refer to instructions
                    // https://learn.nucamp.co/mod/book/view.php?id=3408&chapterid=3923
                />
            );
        };
        return (
        <FlatList
            data={this.props.services.services}
            renderItem={renderHomeItem}
            keyExtractor={item => item.id.toString()}
        />)
        };
}

export default connect(mapStateToProps)(Home);