import React, { Component } from 'react';
import { ScrollView, Text, View, StyleSheet, Button, Picker, Modal, TouchableHighlight } from 'react-native';
import { getCaptain, getVCaptain, positionString, fullName, playersObjToArray, getPuId } from '../../functions/reusable';
import { connect } from 'react-redux';
import { pickTeamUpdate, setLatestToTransferring, setTransferringBackToLatest, subIn, subOut } from '../../actions';
import {vw, vh} from 'react-native-expo-viewport-units';
import { validatePickTeam } from '../../functions/validity';
import _ from 'lodash';
import { patchPlayerUserJoinerSUBS, patchPlayerUserJoinerCAPTAINS } from '../../functions/APIcalls';
import { showMessage } from 'react-native-flash-message';
import Pitch from '../../components/Pitch/pitch';
import BottomNav from '../../components/bottomNav/bottomNav';
import { screenContainer } from '../../styles/global';



class PickTeamScreen extends Component {
    state = {
    }

    transfer = player => {
        if (this.props.subs.includes(player)) {
            this.props.subIn(player)
        } else {
            this.props.subOut(player);
        }
    }



    validateTeam = () => {
        if (validatePickTeam(this.state.team)) {
            this.updateTeam();
        }
    }
        
    updateTeam = async() => {
        let prevCaptain = getCaptain(this.props.starters, this.props.puJoiners);
        let prevVCaptain = getVCaptain(this.props.starters, this.props.puJoiners);
        let startToSub = _.difference(this.props.starters, this.props.transferStarters)
        let subToStart = _.difference(this.props.subs, this.props.transferSubs);
        try {
            for (let i=0;i<startToSub.length;i++) {
                await patchPlayerUserJoinerSUBS(true, getPuId(startToSub[i], this.props.puJoiners));
                await patchPlayerUserJoinerSUBS(false, getPuId(subToStart[i], this.props.puJoiners));
            }
            if (prevCaptain!==this.state.captain) {
                await patchPlayerUserJoinerCAPTAINS(true, false, getPuId(this.state.captain, this.props.puJoiners));
                await patchPlayerUserJoinerCAPTAINS(false, false, getPuId(prevCaptain, this.props.puJoiners));
            } 
            if (prevVCaptain!==this.state.vCaptain) {
                await patchPlayerUserJoinerCAPTAINS(false, true, getPuId(this.state.vCaptain, this.props.puJoiners));
                await patchPlayerUserJoinerCAPTAINS(false, false, getPuId(prevVCaptain, this.props.puJoiners));
            }
            this.props.setTransferringBackToLatest()
        } catch(e) {
            console.warn(e);
        }
    }

    teamChange = () =>
        (this.props.subs===this.state.subs && 
        getCaptain(this.props.starters, this.props.puJoiners)===this.state.captain &&
        getVCaptain(this.props.starters, this.props.puJoiners)===this.state.vCaptain
        ) ?
        false : true;

        
    render() { 
        return ( 
            <View style={screenContainer}>
                <Pitch
                type="pickTeam"
                modalType="pickTeam"
                update={this.validateTeam}
                clickFcn={this.transfer}
                />
                <BottomNav navigation={this.props.navigation}/>
            </View>
         );
    }
}

const mapStateToProps = state => {
    return {
        subs: state.players.latest.subs,
        starters: state.players.latest.starters,
        transferSubs: state.players.transferring.subs,
        transferStarters: state.players.transferring.starters,
        puJoiners: state.joiners.puJoiners,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        pickTeamUpdate: (team, subs) => dispatch(pickTeamUpdate(team, subs)),
        subIn: player => dispatch(subIn(player)),
        subOut: player => dispatch(subOut(player)),
        setTransferringBackToLatest: () => dispatch(setTransferringBackToLatest()),
        setLatestToTransferring: () => dispatch(setLatestToTransferring())
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(PickTeamScreen);