import React, { Component } from 'react';
import profileImg from '../../images/profile.jpg';
import { profile, profileContainer } from './style';
import { View, Text } from 'react-native';
import { capitalize } from '../../functions/reusable';
import { Image } from 'react-native';
import { standardText } from '../../styles/textStyle';


class UserGWProfile extends Component {

    componentDidMount() {
        console.log('hereeee');
        console.log(this.props.user);
    }
    state = {  }

    render() { 
        const { user } = this.props;
        return ( 
            <View style={profileContainer}>
                <Text style={standardText}>Club</Text>
                <Text style={standardText}>{user.user.teamname ? user.user.teamname : ''}</Text>
                <Image
                style={profile}
                source={profileImg}/>
                <Text style={standardText}>Total Points: {user.ug.total_points}</Text>
            </View>
         );
    }
}
 
export default UserGWProfile;