import React, { Component } from 'react';
import { ScrollView, View, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import { allSelectedPlayerIds, fullName, positionString } from '../../functions/reusable';
import Pitch from '../../components/Pitch/pitch.js';
import PlayersList from '../../components/playersList/playersList.js';
import { showMessage } from 'react-native-flash-message';
import BottomNav from '../../components/bottomNav/bottomNav.js';
import FadeInView from '../../components/fadeInView.js';
import { pitchContainer } from './style.js';
import { screenContainer } from '../../styles/global.js';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { validateTransfers } from '../../functions/validity';
import pitch from '../../components/Pitch/pitch.js';
import _ from 'lodash';


class TransfersScreen extends Component {


    state = { 
        team: {
            '1': this.props.teamPlayers.filter(x=>x.position==='1'),
            '2': this.props.teamPlayers.filter(x=>x.position==='2'),
            '3': this.props.teamPlayers.filter(x=>x.position==='3'),
            '4': this.props.teamPlayers.filter(x=>x.position==='4')
        },
        positionFilter: '0',
        budget: this.props.budget
    }

    originalTeam = () => {
        return {
            '1': this.props.teamPlayers.filter(x=>x.position==='1'),
            '2': this.props.teamPlayers.filter(x=>x.position==='2'),
            '3': this.props.teamPlayers.filter(x=>x.position==='3'),
            '4': this.props.teamPlayers.filter(x=>x.position==='4')
        }
    }

    transfer = player => {
        let { player_id, position, price } = player;
        let newBudget = this.state.budget;
        if (this.playerSelected(player)) {
            newBudget += price;
            this.setState({...this.state,
                team: {
                    ...this.state.team,
                    [position]: this.state.team[position].filter(x=>x.player_id!==player_id)
                },
                budget: newBudget
            })
        } else {
            if (this.state.team[position].length>3) {
                showMessage({
                    message: "Too many players in this position",
                    type: "warning"
                })
            } else {
                newBudget -= price;
                this.setState({...this.state,
                    team: {...this.state.team,
                        [position]: [...this.state.team[position], player]
                    },
                    budget: newBudget
                })
            }
        }
    }   

    playerSelected = player => {
        return allSelectedPlayerIds(this.state.team).includes(player.player_id);
    };

    confirmUpdates = () => {
        const { team } = this.state;
        if (validateTransfers(this.state.budget, team)) {
            console.log(this.getObjectDiff(this.originalTeam(), this.state.team))
        }
    }

    getObjectDiff = (obj1, obj2) => {
        const diff = Object.keys(obj1).reduce((result, key) => {
            if (!obj2.hasOwnProperty(key)) {
                result.push(key);
            } else if (_.isEqual(obj1[key], obj2[key])) {
                const resultKeyIndex = result.indexOf(key);
                result.splice(resultKeyIndex, 1);
            }
            return result;
        }, Object.keys(obj2));
    
        return diff;
    }

    render() { 
        return ( 
            <View style={screenContainer}>
                <ScrollView style={pitchContainer}>
                    <Pitch 
                    type="transfers"
                    update={this.confirmUpdates}
                    budget={this.state.budget}
                    team={this.state.team}
                    clickFcn={this.transfer}
                    subs={false}
                    captain={false}
                    vCaptain={false}
                    />
                    <PlayersList
                    allSelectedPlayerIds={allSelectedPlayerIds(this.state.team)}
                    clickFcn={this.transfer}
                    />
                </ScrollView>
                <BottomNav navigate={this.props.navigation.navigate}/>
            </View>
         );
    }
}

const mapStateToProps = state => {
    return {
        teamPlayers: state.players.starters.concat(state.players.subs),
        clubPlayers: state.players.clubPlayers,
        budget: state.endUser.user.budget
    }
}
 
export default connect(mapStateToProps)(TransfersScreen);