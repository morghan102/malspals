import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';



// the pic for their personal pet could just be an icon for now
const mapStateToProps = state => {
    return {
    };
};


function ClientPetInfo(props) {
    return (
        <View>
            <Text>Your Pet</Text>
        </View>
    );
}

export default connect(mapStateToProps)(ClientPetInfo);