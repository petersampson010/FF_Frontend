import React, { Component } from 'react';
import { ScrollView, Text, View, StyleSheet, Button, Picker, Modal, TouchableHighlight } from 'react-native';
import { getCaptain, getVCaptain, positionString, fullName, playersObjToArray, getPuId } from '../../functions/reusable';
import { connect } from 'react-redux';
import { pickTeamUpdate } from '../../actions';
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
        team: {
            '1': this.props.starters.filter(x=>x.position==='1'),
            '2': this.props.starters.filter(x=>x.position==='2'),
            '3': this.props.starters.filter(x=>x.position==='3'),
            '4': this.props.starters.filter(x=>x.position==='4')
        },
        subs: this.props.subs,
        captain: getCaptain(this.props.starters, this.props.puJoiners),
        vCaptain: getVCaptain(this.props.starters, this.props.puJoiners),
    }

    transfer = player => {
        if (this.state.subs.includes(player)) {
            this.subIn(player);
        } else {
            this.subOut(player);
        }
    }

    subIn = player => {
        let position = player.position
        this.setState({
            ...this.state, 
            team: {
                ...this.state.team,
                [position]: [...this.state.team[position], player],
            },
            subs: this.state.subs.filter(x=>x!==player)
        })
    }

    subOut = player => {
        let position = player.position
        this.setState({
            ...this.state,
            team: {
                ...this.state.team,
                [position]: this.state.team[position].filter(x=>x!==player),
            },
            subs: [...this.state.subs, player]
        })
    }


    setCaptain = player => {
        if (this.state.vCaptain===player) {
            showMessage({
                message: "Player is already a captain",
                type: 'warning'
            })
        } else {
            this.setState({...this.state, 
                captain: player
            })
        }
    }

    setVCaptain = player => {
        if (this.state.captain===player) {
            showMessage({
                message: "Player is already a captain",
                type: 'warning'
            })
        } else {
            this.setState({...this.state, 
                vCaptain: player
            })
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
        let startToSub = _.difference(this.props.starters, playersObjToArray(this.state.team))
        let subToStart = _.difference(this.props.subs, this.state.subs);
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
                        update={this.validateTeam}
                        budget={false}
                        team={this.state.team}
                        subs={this.state.subs}
                        clickFcn={this.transfer}
                        captain={this.state.captain}
                        vCaptain={this.state.vCaptain}
                        setCaptain={this.setCaptain}
                        setVCaptain={this.setVCaptain}
                        />
                <BottomNav navigation={this.props.navigation}/>
            </View>
         );
    }
}

const mapStateToProps = state => {
    return {
        subs: state.players.subs,
        starters: state.players.starters,
        puJoiners: state.joiners.puJoiners,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        pickTeamUpdate: (team, subs) => dispatch(pickTeamUpdate(team, subs))
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(PickTeamScreen);

const styles = StyleSheet.create({

})