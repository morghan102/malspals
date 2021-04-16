import React, { Component } from 'react';
import { FlatList, View, Text } from 'react-native';
// ImageBackground it DID NOT LIKE ithis one
import { ListItem, Tile } from 'react-native-elements';
// import { SERVICES } from '../shared/services';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';
import { ScrollView } from 'react-native-gesture-handler';
import { withNavigation } from 'react-navigation';


// not sure ill use loading comp here.
// https://learn.nucamp.co/mod/book/view.php?id=3408&chapterid=3925 referhere for how to connect the loading comp

// do i need state?
const mapStateToProps = state => {
    return {
        services: state.services,
        reviews: state.reviews 
        // dogImages:  NOT SURE THIS WILL NEED TO BE A PSRT OF THE STATE?
        // comments?
    };
};


class Home extends Component {
    static navigationOptions = {
        title: 'Home'
    }

    render() {
        const { navigate } = this.props.navigation;

        function HeroImage() {
            return (
                <View styles={{ flex: 1 }}>
                    <Tile
                        imageSrc={require('./images/arabica.jpg')}
                        title="What can Mal do for you?"
                        featured
                        onPress={() => navigate('ServiceInfo')}
                    />
                </View>
            );
        }

        const renderReviews = ({ item }) => {
            return (
                <ListItem
                    title={item.author}
                    subtitle={item.text}
                    // onPress={() => navigate('ServiceInfo', { serviceId: item.id })}
                    leftAvatar={{ source: require('./images/arabica.jpg') }}
                // i can change the image source to be the server. refer to instructions
                // https://learn.nucamp.co/mod/book/view.php?id=3408&chapterid=3923
                />
            );
        };
        return (
            <ScrollView>
                <HeroImage />
                {/* <ClientImages />  */}

                <FlatList
                    data={this.props.reviews.reviews}
                    renderItem={renderReviews}
                    keyExtractor={item => item.id.toString()}
                />
            </ScrollView>)
    };
}

export default connect(mapStateToProps)(Home);