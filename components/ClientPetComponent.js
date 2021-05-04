import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

// this will look like campsiteinfo comp in numcapsite, postcomment

const mapStateToProps = state => {
    return {
    };
};


function ClientPetInfo(props) {
    return (
        <View>
            <Text>Coming soon once the backend is set up</Text>
        </View>
    );
}

export default connect(mapStateToProps)(ClientPetInfo);