import React, { Component } from 'react';
import { ScrollView, View, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import { addSubAttributeToPlayersArray, allSelectedPlayerIds, fullName, getPuId, playersArrayToObj, playersObjToArray, positionString } from '../../functions/reusable';
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
import { deletePlayerUserJoiner, fetchAllPlayerUserJoinersByUserId, fetchPlayerUserJoinerByUserIdAndPlayerId, patchUserBUDGET, postPlayerUserJoiner, postPlayerUserJoinerTRANSFER } from '../../functions/APIcalls';
import { TouchableHighlightBase } from 'react-native';
import { setTransfers, updateBudget } from '../../actions';
import SpinnerOverlay from '../../components/spinner/spinner';


class TransfersScreen extends Component {


    state = { 
        team: {
            '1': this.props.teamPlayers.filter(x=>x.position==='1'),
            '2': this.props.teamPlayers.filter(x=>x.position==='2'),
            '3': this.props.teamPlayers.filter(x=>x.position==='3'),
            '4': this.props.teamPlayers.filter(x=>x.position==='4')
        },
        positionFilter: '0',
        budget: this.props.user.budget,
        spinner: false
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

    confirmUpdates = async() => {
        const { team } = this.state;
        try {
            if (validateTransfers(this.state.budget, team)) {
                this.setState({...this.state, spinner: true});
                let count = 0;
                let captain = false;
                let vice_captain = false;
                // players transferred out
                const playersOut = _.difference(playersObjToArray(this.originalTeam()), playersObjToArray(this.state.team));
                for (let i=0;i<playersOut.length;i++) {
                    console.log('************* TRANSFERING OUT LOOP *************');
                  console.log(playersOut[i]);
                  let puJ = await fetchPlayerUserJoinerByUserIdAndPlayerId(this.props.user.user_id, playersOut[i].player_id);
                  console.log(puJ);
                  if (puJ.sub) {
                      count++;
                  }
                  if (puJ.captain) {
                      captain = true;
                  }
                  if (puJ.vice_captain) {
                      vice_captain = true;
                  }
    
                  deletePlayerUserJoiner(puJ.pu_id);
                }
                // players transferred in
                const playersIn = _.difference(playersObjToArray(this.state.team), playersObjToArray(this.originalTeam()));
                for (let j=0;j<playersIn.length;j++) {
                    if (captain) {
                        console.log('hit on captain');
                        await postPlayerUserJoinerTRANSFER(playersIn[j], this.props.user.user_id, 0, captain, false);
                        captain = false;
                    } else if (vice_captain) {
                        console.log('hit on vice captain');
                        await postPlayerUserJoinerTRANSFER(playersIn[j], this.props.user.user_id, 0, false, vice_captain);
                        vice_captain = false;
                    } else {
                        console.log('hit');
                        await postPlayerUserJoinerTRANSFER(playersIn[j], this.props.user.user_id, count, false, false);
                        vice_captain = false;
                        count--
                    }
                }
                // update budget
                await patchUserBUDGET(this.state.budget, this.props.user.user_id);
                this.props.updateBudget(this.state.budget);
                // 
                // persist in root app state
                let allPuJ = await fetchAllPlayerUserJoinersByUserId(this.props.user.user_id);
                this.props.setTransfers(addSubAttributeToPlayersArray(playersObjToArray(this.state.team), allPuJ, count));
                this.setState({...this.state, spinner: false});
                showMessage({
                    type: 'success',
                    message: `Transfers successful, you have ${this.props.user.transfers} left`
                })
            }
        } catch(e) {
            console.warn(e);
            this.setState({...this.state, spinner: false});
            showMessage({
                type: 'danger',
                message: "This update was not successful, please try again later"
            })
        }
    }

    render() { 
        return ( 
            <View style={screenContainer}>
                {this.state.spinner ? <SpinnerOverlay/> : null}
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
                    team={this.state.team}
                    allSelectedPlayerIds={allSelectedPlayerIds(this.state.team)}
                    clickFcn={this.transfer}
                    />
                </ScrollView>
                <BottomNav navigation={this.props.navigation}/>
            </View>
         );
    }
}

const mapStateToProps = state => {
    return {
        teamPlayers: state.players.starters.concat(state.players.subs),
        clubPlayers: state.players.clubPlayers,
        user: state.endUser.user,

    }
}

export const mapDispatchToProps = dispatch => {
    return {
        setTransfers: team => dispatch(setTransfers(team)),
        updateBudget: budget => dispatch(updateBudget(budget))
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(TransfersScreen);