import React, { Component } from 'react';
import PlayerGraphic from '../PlayerGraphic/playerGraphic';
import { View, Text, StyleSheet, Button, TouchableHighlightBase, ScrollView, ImageBackground } from 'react-native';
import {vw, vh} from 'react-native-expo-viewport-units';
import { CheckBox } from 'react-native-elements';
import MyModal from '../Modal/myModal';
import { connect } from 'react-redux';
import PitchHead from '../PitchHead/pitchHead';
import { pitch, pitchContainer, starters, subs, positionRow, pitchImage, pitchClassContainer } from './style';
import { fullName, getPuJ, positionString } from '../../functions/reusable';
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

    playerPG = (playerId) => this.props.type==="points" ? this.props.pgJoiners.filter(pg=>pg.player_id===playerId)[0] : false;

    renderPlayers = (position, j) => {
        return this.props.team[position].map((player, i) => 
        <PlayerGraphic player={player} key={i} num={i+j}
        clickFcn={this.props.clickFcn}
        openModal={this.openModal}
        captain={this.props.captain===player}
        vCaptain={this.props.vCaptain===player}
        playerPG={this.playerPG(player.player_id)}
        />)
    }

    renderSubs = j => {
        return this.props.subs.map((player, i) => 
        <PlayerGraphic player={player} key={i} num={i+j} 
        clickFcn={this.props.clickFcn} 
        openModal={this.openModal}
        captain={this.props.captain===player}
        vCaptain={this.props.vCaptain===player}
        />)
    }

    openModal = player => 
        this.setState({
            modal: {
                active: true, 
                player
            }
        });

    modalJSX = () => {
        const player = this.state.modal.player;
        const sub = getPuJ(player, this.props.puJoiners).sub;
    return <View style={modalTextContainer}>
        <Text style={standardText}>{fullName(player)}</Text>
        <Text style={standardText}>{positionString(player.position)}</Text>
        <Text style={standardText}>£{player.price}m</Text>
        <Text style={standardText}>MAYBE SOME STATS AT SOME POINT</Text>
        {(this.props.type==="pickTeam" && !sub) ?
        <View>
            <TouchableOpacity style={this.props.captain===player ? {...captainBox, backgroundColor: $zaGreen} : {...captainBox, backgroundColor: $standardWhite}} onPress={()=>this.props.setCaptain(player)}>
                <Text style={this.props.captain===player ? {...checkBox, color: $arylideYellow} : {...checkBox, color: $chocolateBlack}}>Captain</Text>
            </TouchableOpacity>
            <TouchableOpacity style={this.props.vCaptain===player ? {...captainBox, backgroundColor: $zaGreen} : {...captainBox, backgroundColor: $standardWhite}} onPress={()=>this.props.setVCaptain(player)}>
                <Text style={this.props.vCaptain===player ? {...checkBox, color: $arylideYellow} : {...checkBox, color: $chocolateBlack}}>Vice Captain</Text>
            </TouchableOpacity>
        </View>
        : null}
    </View>
    }

    render() { 
        const pitchImg = require('../../images/kisspng-ball-game-football-pitch-corner-kick-football-stadium-5ac96cf3827065.1735532915231500675343.png');
        return ( 
            <View style={pitchClassContainer}>
                <PitchHead
                budget={this.props.budget}
                type={this.props.type}
                update={this.props.update}
                />
                <View style={pitchContainer}>
                        <ImageBackground source={pitchImg} imageStyle={{resizeMode: 'stretch'}} style={pitchImage}>
                            <View style={{flex: 1, flexDirection: 'row'}}>
                                <View style={pitch}>
                                    <View style={starters}>
                                        <View style={{...positionRow, width: vw(60)}}>
                                            {this.props.team[4].length>0 ? this.renderPlayers('4', 10) : null}
                                        </View>
                                        <View style={{...positionRow, width: vw(70)}}>
                                            {this.props.team[3].length>0 ? this.renderPlayers('3', 6) : null}
                                        </View>
                                        <View style={{...positionRow, width: vw(80)}}>
                                            {this.props.team[2].length>0 ? this.renderPlayers('2', 2) : null}
                                        </View>
                                        <View style={positionRow}>
                                            {this.props.team[1].length>0 ? this.renderPlayers('1', 1) : null}
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
                        jsx={this.modalJSX()}
                        buttonOptions={[]}
                        />
                </View>
                {this.props.subs ? <View style={subs}>
                        {this.renderSubs(12)}
                </View> : null}
            </View>
         );
    }
}

const mapStateToProps = state => {
    return {
        pgJoiners: state.joiners.pgJoiners,
        puJoiners: state.joiners.puJoiners
    }
}
 
export default connect(mapStateToProps)(Pitch);