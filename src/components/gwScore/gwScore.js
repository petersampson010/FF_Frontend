import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';

class GwScore extends Component {
    state = {  }

    componentDidMount() {

    }


    render() { 
        const { aUser, gwLatest } = this.props;
        return ( 
            <View>
                <Text>${aUser.club_name} ${gwLatest.score} ${gwLatest.opponent}</Text>
            </View>
         );
    }
}

const mapStateToProps = state => {
    return {
        aUser: state.endUser.adminUser.aUser,
        gwLatest: state.gameweek.gwLatest
    }
}
 
export default connect(mapStateToProps)(GwScore);