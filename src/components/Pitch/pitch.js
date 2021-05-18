import React, { Component } from 'react';
import PlayerGraphic from '../PlayerGraphic/playerGraphic';
import { View, Text, StyleSheet, Button, TouchableHighlightBase, ScrollView, ImageBackground } from 'react-native';
import {vw, vh} from 'react-native-expo-viewport-units';
import { CheckBox } from 'react-native-elements';
import MyModal from '../Modal/myModal';
import { connect } from 'react-redux';
import PitchHead from '../PitchHead/pitchHead';
import { pitch, pitchContainer, starters, subs, positionRow, pitchImage, pitchClassContainer } from './style';
import { fullName, getPuJ, playersArrayToObj, positionString } from '../../functions/reusable';
import { captainBox, modalTextContainer, nonCaptainBox } from '../Modal/style';
import { checkBox, headers, labelText, standardText } from '../../styles/textStyle';
import { TouchableOpacity } from 'react-native';
import { $arylideYellow, $chocolateBlack, $standardWhite, $zaGreen } from '../../styles/global';



class Pitch extends Component {
    state = { 
        modal: {
            active: false,
            player: {
                player_id: 1,
                first_name: "Steve",
                last_name: "Dunno",
                position: "1",
                price: 80,
                availability: "a",
                admin_user_id: 1
            }
        }
    }

    componentDidMount() {
        // console.log(`****** ${this.props.type} PITCH REACHED *******`);

        // console.log('***** team:');
        // console.log(this.props.team);

        // console.log('***** subs');
        // console.log(this.props.subs);

        // console.log('***** latest starters:');
        // console.log(this.props.latestStaters);

        // console.log('***** latest subs');
        // console.log(this.props.latestSubs);

        // console.log('***** last gw starters');
        // console.log(this.props.lastGwStaters);

        // console.log('***** last gw subs');
        // console.log(this.props.lastGwSubs);

        console.log('***** END OF LOGS ******');
    }

    playerPG = (playerId) => this.props.type==="points" ? this.props.pgJoiners.filter(pg=>pg.player_id===playerId)[0] : false;

    team = () => playersArrayToObj(this.props.team);

    renderPlayers = (position) => {
        return this.team()[position].map((player, i) => 
        <PlayerGraphic 
        sub={false}
        player={player} 
        key={i}
        type={this.props.type}
        clickFcn={this.props.clickFcn}
        openModal={this.openModal}
        playerPG={this.playerPG(player.player_id)}
        />)
    }

    renderSubs = () => this.props.subs.map((player, i) => 
            <PlayerGraphic 
            sub={true}
            player={player} 
            key={i}
            type={this.props.type}
            clickFcn={this.props.clickFcn} 
            openModal={this.openModal}
            />)

    openModal = player => 
        this.setState({
            modal: {
                active: true, 
                player
            }
        });

    render() { 
        const pitchImg = require('../../images/kisspng-ball-game-football-pitch-corner-kick-football-stadium-5ac96cf3827065.1735532915231500675343.png');
        const team = this.team();
        return (
            <View style={pitchClassContainer}>
                <PitchHead
                type={this.props.type}
                update={this.props.update}
                />
                <View style={pitchContainer}>
                        <ImageBackground source={pitchImg} imageStyle={{resizeMode: 'stretch'}} style={pitchImage}>
                            <View style={{flex: 1, flexDirection: 'row'}}>
                                <View style={pitch}>
                                    <View style={starters}>
                                        <View style={{...positionRow, width: vw(50)}}>
                                            {team[4].length>0 ? this.renderPlayers('4') : null}
                                        </View>
                                        <View style={{...positionRow, width: vw(65)}}>
                                            {team[3].length>0 ? this.renderPlayers('3') : null}
                                        </View>
                                        <View style={{...positionRow, width: vw(80)}}>
                                            {team[2].length>0 ? this.renderPlayers('2') : null}
                                        </View>
                                        <View style={positionRow}>
                                            {team[1].length>0 ? this.renderPlayers('1') : null}
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </ImageBackground>
                        <MyModal 
                        visible={this.state.modal.active}
                        height={vh(33)}
                        width={vw(80)}
                        closeModalFcn={()=>this.setState({modal: {...this.state.modal, active: false}})}
                        modalType={this.props.modalType}
                        entry={this.state.modal.player}
                        buttonOptions={[]}
                        />
                </View>
                {this.props.type!=='transfers' ? <View style={subs}>
                        {this.renderSubs()}
                </View> : null}
            </View>
         );
    }
}

const mapStateToProps = state => {
    return {
        pgJoiners: state.joiners.pgJoiners,
        puJoiners: state.joiners.puJoiners,
    }
}
 
export default connect(mapStateToProps)(Pitch);