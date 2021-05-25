import React, { Component } from 'react';
import { ScrollView, View, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import { addSubAttributeToPlayersArray, playerIds, fullName, getPuId, playersArrayToObj, playersObjToArray, positionString } from '../../functions/reusable';
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
import _, { remove } from 'lodash';
import { deletePlayerUserJoiner, fetchAllPlayerUserJoinersByUserId, fetchPlayerUserJoinerByUserIdAndPlayerId, patchUserBUDGET, postPlayerUserJoiner, postPlayerUserJoinerTRANSFER } from '../../functions/APIcalls';
import { TouchableHighlightBase } from 'react-native';
import { addSpinner, removeSpinner, setLatestToTransferring, setTransferringBackToLatest, transferIn, transferOut } from '../../actions';
import SpinnerOverlay from '../../components/spinner/spinner';


class TransfersScreen extends Component {


    state = {
        positionFilter: '0'
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
        let { position, price } = player;
        const { transferOut, transferIn, user, teamPlayers } = this.props;
        if (this.playerSelected(player)) {
            console.log('hit, transfer ouot');
            transferOut(player);
        } else {
            if (teamPlayers.filter(x=>x.position===position).length>2) {
                showMessage({
                    message: "Too many players in this position",
                    type: "warning"
                })
            } else {
                transferIn(player);
            }
        }
    } 

    playerSelected = player => playerIds(this.props.teamPlayers).includes(player.player_id);

    confirmUpdates = async() => {
        const { teamPlayers, addSpinner, removeSpinner, originalPlayers, user, setLatestToTransferring, setTransferringBackToLatest, budget } = this.props;
        try {
            if (validateTransfers(budget, playersArrayToObj(teamPlayers))) {
                addSpinner()
                let count = 0;
                let captain = false;
                let vice_captain = false;
                // players transferred out
                const playersOut = _.difference(originalPlayers, teamPlayers);
                for (let i=0;i<playersOut.length;i++) {
                  let puJ = await fetchPlayerUserJoinerByUserIdAndPlayerId(user.user_id, playersOut[i].player_id);
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
                const playersIn = _.difference(teamPlayers, originalPlayers);
                for (let j=0;j<playersIn.length;j++) {
                    if (captain) {
                        await postPlayerUserJoinerTRANSFER(playersIn[j], user.user_id, 0, captain, false);
                        captain = false;
                    } else if (vice_captain) {
                        await postPlayerUserJoinerTRANSFER(playersIn[j], user.user_id, 0, false, vice_captain);
                        vice_captain = false;
                    } else {
                        await postPlayerUserJoinerTRANSFER(playersIn[j], user.user_id, count, false, false);
                        vice_captain = false;
                        count--
                    }
                }
                // update budget
                await patchUserBUDGET({...user, budget: budget});
                // persist budget update in root state
                setLatestToTransferring();
                removeSpinner();
                showMessage({
                    type: 'success',
                    message: `Transfers successful, you have ${user.transfers} left`
                })
            }
        } catch(e) {
            console.warn(e);
            setTransferringBackToLatest();
            removeSpinner()
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
                    modalType="playerProfile"
                    update={this.confirmUpdates}
                    clickFcn={this.transfer}
                    team={this.props.teamPlayers}
                    />
                    <PlayersList
                    team={this.props.teamPlayers}
                    clickFcn={this.transfer}
                    modalType="playerProfile"
                    />
                </ScrollView>
                <BottomNav navigation={this.props.navigation}/>
            </View>
         );
    }
}

const mapStateToProps = state => {
    return {
        teamPlayers: state.players.transferring.starters.concat(state.players.transferring.subs),
        clubPlayers: state.players.clubPlayers,
        user: state.endUser.user,
        budget: state.players.transferring.budget,
        originalPlayers: state.players.latest.starters.concat(state.players.latest.subs)
    }
}

export const mapDispatchToProps = dispatch => {
    return {
        transferOut: player => dispatch(transferOut(player)),
        transferIn: player => dispatch(transferIn(player)),
        addSpinner: () => dispatch(addSpinner()),
        removeSpinner: () => dispatch(removeSpinner()),
        setTransferringBackToLatest: () => dispatch(setTransferringBackToLatest()),
        setLatestToTransferring: () => dispatch(setLatestToTransferring()),
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(TransfersScreen);