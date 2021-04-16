import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';


export default function RequestService() {
    return (
        <ScrollView>
            <Text>sercice req</Text>
        </ScrollView>
    );
}