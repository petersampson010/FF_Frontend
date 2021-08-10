import React, { Component } from 'react';
import { ScrollView, Text, View, StyleSheet, Button, Picker, Modal, TouchableHighlight } from 'react-native';
import { getCaptain, getVCaptain, positionString, fullName, playersObjToArray, getPuId, playersArrayToObj } from '../../functions/reusable';
import { connect } from 'react-redux';
import { addSpinner, pickTeamUpdate, removeSpinner, setLatestToTransferring, setTransferringBackToLatest, subIn, subOut } from '../../actions';
import {vw, vh} from 'react-native-expo-viewport-units';
import { validatePickTeam } from '../../functions/validity';
import _ from 'lodash';
import { patchPlayerUserJoinerSUBS, patchPlayerUserJoinerCAPTAINS } from '../../functions/APIcalls';
import { showMessage } from 'react-native-flash-message';
import Pitch from '../../components/Pitch/pitch';
import BottomNav from '../../components/bottomNav/bottomNav';
import { screenContainer } from '../../styles/global';
import PitchHead from '../../components/PitchHead/pitchHead';



class PickTeamScreen extends Component {


    transfer = player => {
        const { subs, subIn, subOut } = this.props;
        if (subs.includes(player)) {
            subIn(player)
        } else {
            subOut(player);
        }
    }

    validateTeam = () => {
        if (validatePickTeam(playersArrayToObj(this.props.starters))) {
            this.updateTeam();
        }
    }
        
    updateTeam = async() => {
        const { starters, subs, originalStarters, originalSubs, records, captain, vCaptain, originalCaptain, originalVCaptain, addSpinner, removeSpinner, setLatestToTransferring, setTransferringBackToLatest } = this.props;
        let startToSub = _.difference(originalStarters, starters)
        let subToStart = _.difference(originalSubs, subs);
        try {
            addSpinner();
            for (let i=0;i<startToSub.length;i++) {
                await patchPlayerUserJoinerSUBS(true, getPuId(startToSub[i], records));
                await patchPlayerUserJoinerSUBS(false, getPuId(subToStart[i], records));
            }
            if (originalCaptain!==captain) {
                await patchPlayerUserJoinerCAPTAINS(true, false, getPuId(captain, records));
                await patchPlayerUserJoinerCAPTAINS(false, false, getPuId(originalCaptain, records));
            } 
            if (originalVCaptain!==vCaptain) {
                await patchPlayerUserJoinerCAPTAINS(false, true, getPuId(vCaptain, records));
                await patchPlayerUserJoinerCAPTAINS(false, false, getPuId(originalVCaptain, records));
            }
            setLatestToTransferring();
            removeSpinner();
            showMessage({
                type: 'success',
                message: `Team selection successful`
            })
        } catch(e) {
            console.warn(e);
            setTransferringBackToLatest();
            removeSpinner();
            showMessage({
                type: 'danger',
                message: "Fail: This update was not successful, please try again later"
            })
        }
    }

    teamChange = () => {
        const { subs, originalStarters, originalSubs, records, captain, vCaptain,} = this.props;
        return (originalSubs===subs && 
        getCaptain(originalStarters, records)===captain &&
        getVCaptain(originalStarters, records)===vCaptain
        ) ?
        false : true;
    }

        
    render() { 
        return (
            <View style={screenContainer}>
                <PitchHead type='pickTeam' update={this.validateTeam}/>
                <ScrollView>
                    <Pitch
                    type="pickTeam"
                    modalType="pickTeam"
                    update={this.validateTeam}
                    clickFcn={this.transfer}
                    team={this.props.starters}
                    subs={this.props.subs}
                    />
                </ScrollView>
                <BottomNav navigation={this.props.navigation}/>
            </View>
         );
    }
}

const mapStateToProps = state => {
    return {
        subs: state.players.transferring.subs,
        starters: state.players.transferring.starters,
        originalSubs: state.players.latest.subs,
        originalStarters: state.players.latest.starters,
        records: state.joiners.records,
        captain: state.players.transferring.captain,
        vCaptain: state.players.transferring.captain,
        originalCaptain: state.players.latest.captain,
        originalVCaptain: state.players.latest.captain,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        pickTeamUpdate: (team, subs) => dispatch(pickTeamUpdate(team, subs)),
        subIn: player => dispatch(subIn(player)),
        subOut: player => dispatch(subOut(player)),
        setTransferringBackToLatest: () => dispatch(setTransferringBackToLatest()),
        setLatestToTransferring: () => dispatch(setLatestToTransferring()),
        addSpinner: () => dispatch(addSpinner()),
        removeSpinner: () => dispatch(removeSpinner())
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(PickTeamScreen);