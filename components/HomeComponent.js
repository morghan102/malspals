import React, { Component } from 'react';
import { FlatList, View, Text, StyleSheet, Dimensions, Button, Linking, Share, TouchableOpacity } from 'react-native';
// ImageBackground it DID NOT LIKE ithis one
import { Tile, Icon, Rating } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
// import Loading from './LoadingComponent';
import { ScrollView } from 'react-native-gesture-handler';
// import { withNavigation } from 'react-navigation';
// import CollapsibleList from "react-native-collapsible-list";
// import * as MailComposer from 'expo-mail-composer';

import ViewMoreText from 'react-native-view-more-text';
// import Accordion from 'react-native-collapsible/Accordion';
// import LottieView from 'lottie-react-native';


import FormButton from './FormButton';
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
    state = {
        activeSections: [],
    };


    static navigationOptions = {
        title: 'Home'
    }

    // eveything for the accordan

    // this renders for eaxh list item
    // renderSectionTitle = (section) => {
    //     return (
    //         <View>
    //             <Text>Rave Reviews</Text>
    //         </View>
    //     );
    // };

    // renderHeader = (section) => {
    //     return (
    //         <View >
    //             <Text>{section.author}</Text>
    //         </View>
    //     );
    // };

    // renderContent = (section) => {
    //     return (
    //         <View>
    //             <Text>{section.text}</Text>
    //         </View>
    //     );
    // };

    // updateSections = (activeSections) => {
    //     this.setState({ activeSections });
    // };









    // ******
    // sendMail() {
    //     MailComposer.composeAsync({
    //         recipients: ['malspals@gmail.com'],
    //         subject: 'Inquiry',
    //         body: 'To whom it may concern:'
    //     })
    // }

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


        function RenderExperience() {
            return (
                <View>
                    <View style={styles.headerStyle}>
                        <Text style={styles.textStyle}>My Experience</Text>
                    </View>
                    <View>
                        <Text style={styles.smallText}>
                            {`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`}
                        </Text>
                    </View>
                </View>
            );
        }


        function RenderBio() {
            //i may want to put this on the server instead of right here
            return (
                <View>
                    <View style={styles.headerStyle}>
                        <Text style={styles.textStyle}>About Me</Text>
                    </View>
                    <View>
                        <Text style={styles.smallText}>
                            {`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`}
                        </Text>
                    </View>
                </View>
            );
        }

        // function ReviewButtons() {
        //     return (
        //         <View>
        //             <Text style={styles.moreReviews}>See more reviews:</Text>
        //             <View style={styles.reviewButtons}>
        //                 <Button
        //                     title="    Wag    "
        //                     onPress={() => Linking.openURL('https://wagwalking.com/walker-profile/MALLORY48314')}
        //                     color='#28B78C'
        //                     style={{ width: '200' }}
        //                 />
        //                 <Button
        //                     title="   Rover   "
        //                     onPress={() => Linking.openURL('https://www.rover.com/members/mallory-m-love-animals-lots-of-experience/?utm_medium=direct&utm_campaign=977262825&utm_content=ssp&utm_source=sit-link&utm_term=7811029')}
        //                     color='#00BD70'
        //                 />
        //             </View>
        //         </View>

        //     );
        // }

        function RenderReviews({ comments }) {

            const reviewItem = ({ item }) => {
                return (
                    <View style={styles.smallText}>
                        <ViewMoreText
                            numberOfLines={3}
                            renderViewMore={(onPress => { return (<Text style={{ color: 'blue' }} onPress={onPress}>View more</Text>) })}
                            renderViewLess={(onPress => { return (<Text style={{ color: 'blue' }} onPress={onPress}>View less</Text>) })}
                        >
                            <Text stmayle={{ fontSize: 14.5 }}>{item.text}{"\n"}</Text>
                            {/* <Rating
                                style={{ alignItems: 'flex-start', paddingVertical: '5%' }}
                                startingValue={item.rating}
                                imageSize={10}
                                readonly
                            /> */}
                            <Text style={{ fontSize: 13 }}>{`-- ${item.author}, ${item.date}`}</Text>
                        </ViewMoreText>
                    </View>
                );
            };

            return (
                <View>
                    <FlatList
                        ListHeaderComponent={ListHeader("rvws")}
                        data={comments}
                        renderItem={reviewItem}
                        keyExtractor={item => item.id.toString()}
                    />
                    <Text style={styles.smallText}>{`More reviews avaiable upon request.`}</Text>
                </View>
            );

            // leftAvatar={{ source: require('./images/arabica.jpg') }}
            // i can change the image source to be the server. refer to instructions
            // https://learn.nucamp.co/mod/book/view.php?id=3408&chapterid=3923
            // />

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
                <View>
                    <View style={styles.loginContainer}>
                        <Text style={styles.loginText}>Home screen</Text>
                        <FormButton buttonTitle='Logout' />
                    </View>
                    {/* <Accordion
                        sections={this.props.reviews.reviews}
                        activeSections={this.state.activeSections}
                        renderSectionTitle={this.renderSectionTitle}
                        renderHeader={this.renderHeader}
                        renderContent={this.renderContent}
                        onChange={this.updateSections}
                        underlayColor='white'
                        renderAsFlatList='true'
                    /> */}
                    {/* {ListHeader("rvws")} */}
                    <RenderExperience />
                    <RenderBio />
                    <RenderReviews comments={this.props.reviews.reviews.slice(0, 3)} />
                    {/* <FlatList
                        ListHeaderComponent={ListHeader("rvws")}
                        data={this.props.reviews.reviews}
                        renderItem={renderReviews}
                        initialNumToRender={3}
                        // ItemSeparatorComponent={"highlighted"}
                        // onEndReached & onEndReachedThreshold
                        keyExtractor={item => item.id.toString()}
                    /> */}
                    {/* <ReviewButtons /> */}
                </View>

                <FlatList
                    //mal wants to get rid of this but i'm going to leave this bc maybe the pics can be used in another way and i want it here for inspo
                    ListHeaderComponent={ListHeader("pics")}
                    data={this.props.clientImages.clientImages}
                    renderItem={renderClientImages}
                    initialNumToRender={3}
                    // ItemSeparatorComponent={"highlighted"}
                    keyExtractor={item => item.id.toString()}
                />
                <View style={styles.shareBox}>
                    <Text style={styles.shareText}>Share Mal and get a free walk!</Text>
                    {/* move email to the reservation thing.
                    stylize the share thing */}
                    <View style={styles.shareIcons}>
                        <Icon
                            name={'share'}
                            type='font-awesome'
                            color='#A4C936'
                            raised
                            reverse
                            onPress={() => shareMal()}
                        />
                        {/* <Button
                            title="Send Email"
                            buttonStyle={{ backgroundColor: '#A4C936', margin: 40 }}
                            icon={<Icon
                                name='envelope-o'
                                type='font-awesome'
                                color='#fff'
                                iconStyle={{ marginRight: 10 }}
                            />}
                            onPress={() => this.sendMail()}
                        /> */}
                    </View>
                    {/* { source: { uri: baseUrl + item.image } } */}
                    {/* <TouchableOpacity>
                        <LottieView
                            source={require('../assets/lottie/dog-walking.json')}
                            style={{ width: 75, height: 75 }}
                            loop={true}
                            autoplay={true}
                        />
                    </TouchableOpacity> */}
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
    shareIcons: {
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
    shareBox: {
        margin: 10,
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
        textAlign: 'center',
        marginHorizontal: MAX_WIDTH / 10,
        fontSize: 18
    },
    smallText: {
        marginBottom: 15,
        marginLeft: 20,
        marginRight: 20
    },
    moreReviews: {
        marginLeft: 20,
        marginBottom: 10,
        fontSize: 18,
    },
    reviewButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 100,
        marginLeft: 100
    }
});

export default connect(mapStateToProps)(Home);