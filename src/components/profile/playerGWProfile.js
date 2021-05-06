import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import { View, Text } from 'react-native';
import { vh, vw } from 'react-native-expo-viewport-units';
import { capitalize } from '../../functions/reusable';
import profileImg from '../../images/profile.jpg';
import { centerHorizontally } from '../../styles/align';
import { standardText } from '../../styles/textStyle';
import MyModal from '../Modal/myModal';
import { modalTextContainer } from '../Modal/style';
import { profile, profileContainer, title } from './style';

class PlayerGWProfile extends Component {

    state = { 
        modal: {
            active: false

        }
     }

     componentDidMount() {
         console.log('*************HERE*****************');
         console.log(this.props.player);
     }

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
            <TouchableOpacity style={profileContainer}
            onPress={() => this.setState({modal: {
                active: true
            }})}>
                <Text style={title}>Player</Text>
                <Text style={standardText}>{player.player.first_name} {player.player.last_name}</Text>
                <View style={centerHorizontally}>
                    <Image
                    style={profile}
                    source={profileImg}/>
                </View>
                <Text style={standardText}>Total Points: {player.pg.total_points}</Text>
                {this.renderPointsBreakdown()}
                <MyModal 
                        visible={this.state.modal.active}
                        height={vh(33)}
                        width={vw(80)}
                        closeModalFcn={()=>this.setState({modal: {...this.state.modal, active: false}})}
                        modalType="playerProfile"
                        entry={player}
                        buttonOptions={[]}
                        />
            </TouchableOpacity>
         );
    }
}
 
export default PlayerGWProfile;
