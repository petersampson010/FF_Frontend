import React, { Component } from 'react';
import profileImg from '../../images/profile.jpg';
import { profile, profileContainer } from './style';
import { View, Text } from 'react-native';
import { capitalize } from '../../functions/reusable';
import { Image } from 'react-native';


class UserGWProfile extends Component {
    state = {  }

    render() { 
        const { user } = this.props;
        return ( 
            <View style={profileContainer}>
                <Text>Club</Text>
                <Text>{user.user.teamname ? user.user.teamname : ''}</Text>
                <Image
                style={profile}
                source={profileImg}/>
                <Text>Total Points: {user.ug.total_points}</Text>
                {/* <Text>{player.first_name} {player.last_name}</Text>
                <Text>Total Points: {player.pg.total_points}</Text>
                {this.renderPointsBreakdown()} */}
            </View>
         );
    }
}
 
export default UserGWProfile;