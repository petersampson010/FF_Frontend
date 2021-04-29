import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { headers } from '../../styles/textStyle';
import { headerText } from '../header/style';

class GwScore extends Component {
    state = {  }

    componentDidMount() {
        console.log(this.props.aUser.email);
    }


    render() { 
        const { aUser, gwLatest } = this.props;
        return ( 
            <View>
                <Text style={headerText}>{aUser.club_name} {gwLatest.score} {gwLatest.opponent}</Text>
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