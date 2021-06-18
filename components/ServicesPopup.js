// i will be deleiting this but keeping it here just in case


import React, { Component, PropTypes } from 'react';
import { Modal, View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default class ServicesPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false
        };
    }

    //i'm pretty sure i'll want to let redux deal w this
    componentDidMount() {
        // AsyncStorage.getItem(this.props.pagekey, (err, result) => {
        //     if (err) {
        //         //what goes here??
        //         // console.log(err);
        //     } else {
        //         if (result == null) {
        //             console.log("null val recieved: ", result);
        //             this.setModalVisible(true);
        //         } else {
        //             console.log("result: ", result);
        //         }
        //     }
        // });
        // AsyncStorage.setItem(this.props.pagekey, JSON.stringify({"value": "true"}), (err,result) => {
        //     console.log("error: ", err, "result: ", result);
        // });
        const value = AsyncStorage.getItem('once');

        if (value !== null) {
            value.then((ret) => {
                if (ret === null) {
                    // this is the first time
                    // show the modal
                    // save the value

                    AsyncStorage.setItem('once', 'yes');
                                        this.setModalVisible(true);

                    // this.setState({
                    //     modalVisible: true
                    // });

                } else {
                    // this is the second time
                    // skip the modal

                }
            }).catch(err => alert(err.toString()));
        }
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    render() {
        return (
            <View>
                <Modal
                    animationType={"slide"}
                    transparent={true}
                    style={styles.popupContainer}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        alert("Modal has been closed.");
                    }}
                >
                    <View style={styles.popupContainer}>
                        <View style={styles.popupTitleContainer}>
                            <Text style={styles.popupTitle}>{this.props.title}</Text>
                        </View>
                        <View style={styles.popupDescrContainer}>
                            <Text style={styles.popupDescr} allowFontScaling={true}>
                                {this.props.description}
                            </Text>
                        </View>
                        <View style={styles.popupExitContainer}>
                            <TouchableHighlight
                                onPress={() => { this.setModalVisible(!this.state.modalVisible); }}>
                                <View style={styles.popupExitBtnContainer}>
                                    <Text style={styles.popupExitBtnTxt}>Exit</Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    popupContainer: {
        backgroundColor: 'black',
        flex: 1,
        marginTop: 70,
        marginBottom: 40,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 20,
        borderWidth: 4,
        borderColor: 'red'
    },
    popupTitle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    popupTitleContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    popupDescrContainer: {
        flex: 6.5
    },
    popupDescr: {
        color: 'white',
    },
    popupExitContainer: {
        flex: 2,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    popupExitBtnContainer: {
        width: 200,
        height: 40,
        backgroundColor: 'red',
        borderRadius: 10,
        justifyContent: 'center',
    },
    popupExitBtnTxt: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    popupCloseIcon: {
        alignSelf: 'flex-end',
        flex: 0.5,
        marginRight: 10
    },
});