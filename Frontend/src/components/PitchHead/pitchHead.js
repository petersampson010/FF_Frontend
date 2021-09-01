import React, { Component } from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';
import { vh, vw } from 'react-native-expo-viewport-units';
import { connect } from 'react-redux';
import { labelText, standardText } from '../../styles/textStyle';
import Button from '../button';
import { pitchHead } from './style';


class PitchHead extends Component {
    state = {  }

    comp1 = () => {
        switch(this.props.type) {
            case 'points': 
                return <Text style={labelText}>{this.props.otherTeam ? this.props.otherUser.team_name : this.props.user.team_name}</Text>;
            case 'transfers':
                    return <View>
                        <Text style={labelText}>Transfers Available: {this.props.user.transfers}</Text>
                        <View style={{flexDirection: "row"}}><Text style={labelText}>Budget: </Text><Text style={{...labelText, color: (this.props.budget>=0 ? 'green' : 'red')}}>{Math.floor(this.props.budget*100)/100}m</Text></View>
                    </View>;
                return 
            case 'pickTeam':
                return <Text></Text>;
            default: 
                return;
        }
    }

    comp2 = () => {
        switch(this.props.type) {
            case 'points': 
                return <Text style={labelText}>Points: {this.props.otherTeam ? this.props.otherUg.total_points : this.props.latestUG.total_points}</Text>;
            case 'transfers':
                return <Button text='Confirm' func={this.props.update} width={vw(30)}/>
            case 'pickTeam':
                return <Button text='Confirm' func={this.props.update} width={vw(30)}/>
            default: 
                return;
        }
    }

    comp3 = () => {
        switch(this.props.type) {
            case 'points':
                return <View>
                    <Text onPress={}>Gw {}</Text>
                    <Text onPress={}>GW {}</Text>
                </View>
            default:
                return;
        }
    }

    render() { 
        return (
            <View>
                <View style={pitchHead}>
                    {this.comp1()}
                    {this.comp2()}
                </View>
                {this.comp3()}
            </View>
         );
    }
}

const mapStateToProps = state => {
    return {
        latestUG: state.joiners.latestUG,
        user: state.endUser.user,
        budget: state.players.transferring.budget,
        otherUg: state.players.otherTeamPoints.ug,
        otherUser: state.players.otherTeamPoints.user
    }
}
 
export default connect(mapStateToProps)(PitchHead);