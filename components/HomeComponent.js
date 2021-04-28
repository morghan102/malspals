import React, { Component } from 'react';
import { FlatList, View, Text, StyleSheet, Dimensions, Button, Linking, Share } from 'react-native';
// ImageBackground it DID NOT LIKE ithis one
import { ListItem, Tile, Icon, Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';
import { ScrollView } from 'react-native-gesture-handler';
import { withNavigation } from 'react-navigation';
import CollapsibleList from "react-native-collapsible-list";
import * as MailComposer from 'expo-mail-composer';




// not sure ill use loading comp here.
// https://learn.nucamp.co/mod/book/view.php?id=3408&chapterid=3925 referhere for how to connect the loading comp

const mapStateToProps = state => {
    return {
        services: state.services,
        reviews: state.reviews,
        clientImages: state.clientImages
    };
};


class Home extends Component {
    static navigationOptions = {
        title: 'Home'
    }


    sendMail() {
        MailComposer.composeAsync({
            recipients: ['malspals@gmail.com'],
            subject: 'Inquiry',
            body: 'To whom it may concern:'
        })
    }


    render() {
        const { navigate } = this.props.navigation;

        function HeroImage() {
            return (
                <View style={styles.heroContStyle}>
                    <Tile
                        imageSrc={require('./images/malWFlag.jpg')}
                        title="What can Mal do for you?"
                        featured
                        onPress={() => navigate('ServiceInfo')}
                        titleStyle={{ marginBottom: 100 }}
                    />
                </View>
            );
        }

        const renderReviews = ({ item }) => {
            return (
                <ListItem
                    title={item.author}
                    subtitle={item.text}
                    rightSubtitle={item.date}
                // onPress={() => navigate('ServiceInfo', { serviceId: item.id })}
                // leftAvatar={{ source: require('./images/arabica.jpg') }}
                // i can change the image source to be the server. refer to instructions
                // https://learn.nucamp.co/mod/book/view.php?id=3408&chapterid=3923
                />
            );
        };

        const ListHeader = (src) => {
            if (src === "rvws") {
                return (
                    <View style={styles.headerStyle}>
                        <Text style={styles.textStyle}>Rave Reviews</Text>
                    </View>
                );
            } else if (src === "pics") {
                return (
                    <View style={styles.headerStyle}>
                        <Text style={styles.textStyle}>See who Mal's been watching lately</Text>
                    </View>
                );

            }
        };

        const renderClientImages = ({ item }) => {
            return (
                <Tile
                    title={item.name}
                    imageSrc={{ uri: baseUrl + item.image }}
                    featured
                    activeOpacity={1}
                />
            );
        };

        const shareMal = () => {
            Share.share({
                title: 'MalsPals, a professional petcare service',
                message: `Check out who's been watching my furry friends lately!`,
                url: 'https://linktr.ee/malspals'
            });
        };

        return (
            <ScrollView>
                <HeroImage />
                {/* fl is showing too many */}
                {/* HI & FL are bleeding into each other. I added a background color to fl header to compensate */}
                <View>
                    <FlatList
                        ListHeaderComponent={ListHeader("rvws")}
                        data={this.props.reviews.reviews.slice(0, 3)}
                        renderItem={renderReviews}
                        initialNumToRender={3}
                        // ItemSeparatorComponent={"highlighted"}
                        // onEndReached & onEndReachedThreshold
                        keyExtractor={item => item.id.toString()}
                    />
                    <Button
                        title="See more reviews"
                        onPress={() => Linking.openURL('https://linktr.ee/malspals')}
                        color='#A4C936'
                    />
                </View>
                <FlatList
                    ListHeaderComponent={ListHeader("pics")}
                    data={this.props.clientImages.clientImages}
                    renderItem={renderClientImages}
                    initialNumToRender={3}
                    // ItemSeparatorComponent={"highlighted"}
                    keyExtractor={item => item.id.toString()}
                />
                <View style={{margin:10}}>
{/* THIS IS V UGLY */}
                    <Text style={styles.shareText}>Free money? Share Mal with your friends, or contact her off the app!</Text>
                    <View style={styles.shareBox}>
                        <Icon
                            name={'share'}
                            type='font-awesome'
                            color='#A4C936'
                            raised
                            reverse
                            onPress={() => shareMal()}
                        />
                        <Button
                            title="Send Email"
                            buttonStyle={{ backgroundColor: '#A4C936', margin: 40 }}
                            icon={<Icon
                                name='envelope-o'
                                type='font-awesome'
                                color='#fff'
                                iconStyle={{ marginRight: 10 }}
                            />}
                            onPress={() => this.sendMail()}
                        />
                    </View>
                </View>
            </ScrollView>
        )
    };
}

const {
    width: MAX_WIDTH,
    height: MAX_HEIGHT,
} = Dimensions.get('window');

const styles = StyleSheet.create({
    heroContStyle: {
        flex: 1,
        height: MAX_HEIGHT / 6,
        width: MAX_WIDTH,
        // flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 120,
        overflow: 'hidden'

    },
    shareBox: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 10
        // justifyContent: 'center',
        // alignItems: 'center',
        // margin: 0,
        // marginBottom: 0,
        // marginTop: 10
    },
    // heroStyle: {
    //     // height:((MAX_WIDTH-22)/7),
    //     // width: ((MAX_WIDTH-22)/7),
    //     backgroundColor: "red",
    //     alignSelf: 'center',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     padding:10,
    // },
    headerStyle: {
        flex: 1,
        width: '100%',
        // height: 45,
        marginTop: 15,
        backgroundColor: '#fff',
    },
    textStyle: {
        textAlign: 'center',
        // color: '#fff',
        fontSize: 28,
        padding: 7,
    },
    shareText: {
        textAlign:'center', 
        marginHorizontal: MAX_WIDTH/10,
        fontSize: 18
    }
});

export default connect(mapStateToProps)(Home);