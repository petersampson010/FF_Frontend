import React, { Component } from 'react';
import { Image } from 'react-native';
import { View, Text } from 'react-native';
import { capitalize } from '../../functions/reusable';
import profileImg from '../../images/profile.jpg';
import { standardText } from '../../styles/textStyle';
import { profile, profileContainer } from './style';

class PlayerGWProfile extends Component {
    state = {  }

    renderPointsBreakdown = () => {
        return Object.keys(this.props.player.pg).map(score=>{
            let att = this.props.player.pg[score];
            if (att==null || score=="pg_id" || score=="updated_at" || score=="created_at" || score=="player_id" || score=="gameweek_id" || score=="total_points") {
                return;
            } else {
                return <Text style={standardText}>{capitalize(score)}: {att}</Text>;
            }
        });
    }

    render() { 
        const { player } = this.props;
        return ( 
            <View style={profileContainer}>
                <Text style={standardText}>Player</Text>
                <Text style={standardText}>{player.player.first_name} {player.player.last_name}</Text>
                <Image
                style={profile}
                source={profileImg}/>
                <Text style={standardText}>Total Points: {player.pg.total_points}</Text>
                {this.renderPointsBreakdown()}
            </View>
         );
    }
}
 
export default PlayerGWProfile;