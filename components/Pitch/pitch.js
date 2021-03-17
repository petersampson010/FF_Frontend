import React, { Component } from 'react';
import PlayerGraphic from '../PlayerGraphic/playerGraphic';
import { View, Text, StyleSheet, Button, TouchableHighlightBase, ScrollView, ImageBackground } from 'react-native';
import {vw, vh} from 'react-native-expo-viewport-units';
import { CheckBox } from 'react-native-elements';
import MyModal from '../Modal/myModal';
import { connect } from 'react-redux';
import PitchHead from '../PitchHead/pitchHead';
import MenuDrawer from 'react-native-side-drawer';
import { defender, ellipse, ellipse2, ellipse2Stack, forward, goalkeeper, menuDrawerContainer, midfielder, pitch, pitchContainer, fullPitch, penBox, smallPenBox, halfwayLine, rect4Stack, rectStack, slideButton, slideButtonContainer, starters, subs, semiCircle, positionRow, scrollContainer, pitchImage } from './style';
import { TouchableOpacity } from 'react-native-gesture-handler';
import playersList from '../playersList/playersList';
import Svg, { Ellipse } from "react-native-svg";
import { fullName, positionString } from '../../functions/reusable';



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
        type={this.props.type}
        toggleSlideDrawer={this.props.toggleSlideDrawer}
        />)
    }

    renderSubs = j => {
        return this.props.subs.map((player, i) => 
        <PlayerGraphic player={player} key={i} num={i+j} 
        clickFcn={this.props.clickFcn} 
        openModal={this.openModal}
        captain={this.props.captain===player}
        vCaptain={this.props.vCaptain===player}
        type={this.props.type}
        />)
    }

    openModal = player => {
        this.setState({...this.state,
            modal: {
                active: true,
                player
            }
        })
    }

    modalJSX = () => 
    <View>
                        <Text>{fullName(this.state.modal.player)}</Text>
                        <Text>{positionString(this.state.modal.player.position)}</Text>
                        <Text>£{this.state.modal.player.price}m</Text>
                        <Text>MAYBE SOME STATS AT SOME POINT</Text>
                        {this.props.type==="pickTeam" ? <CheckBox
                        checked={this.props.captain===this.state.modal.player}
                        title="Captain"
                        onPress={()=>this.props.setCaptain(this.state.modal.player)} 
                        /> : null}
                        {this.props.type==="pickTeam" ? <CheckBox
                        checked={this.props.vCaptain===this.state.modal.player}
                        title="Vice - Captain"
                        onPress={()=>this.props.setVCaptain(this.state.modal.player)} 
                        /> : null}
                    </View>

    render() { 
        const pitchImg = require('../../images/kisspng-ball-game-football-pitch-corner-kick-football-stadium-5ac96cf3827065.1735532915231500675343.png');
        return ( 
            <View>
                <PitchHead
                budget={this.props.budget}
                type={this.props.type}
                update={this.props.update}
                />
                <ScrollView contentContainerStyle={scrollContainer}>
                    <View style={pitchContainer}>
                            <View style={pitch}>
                                <ImageBackground source={pitchImg} imageStyle={{resizeMode: 'stretch'}} style={pitchImage}>
                                    <View style={{flex: 1, flexDirection: 'row'}}>
                                        <View style={pitch} onPress={()=>{console.log('hit');this.setState({...this.state, slideDrawer: false})}}>
                                            <View style={starters}>
                                                <View style={positionRow}>
                                                    {this.props.team[4].length>0 ? this.renderPlayers('4', 10) : null}
                                                </View>
                                                <View style={positionRow}>
                                                    {this.props.team[3].length>0 ? this.renderPlayers('3', 6) : null}
                                                </View>
                                                <View style={positionRow}>
                                                    {this.props.team[2].length>0 ? this.renderPlayers('2', 2) : null}
                                                </View>
                                                <View style={positionRow}>
                                                    {this.props.team[1].length>0 ? this.renderPlayers('1', 1) : null}
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </ImageBackground>

                                    {/* <MyModal 
                                    visible={this.state.modal.active}
                                    height={vh(30)}
                                    width={vw(80)}
                                    closeModalFcn={()=>this.setState({modal: {...this.state.modal, active: false}})}
                                    jsx={this.modalJSX()}
                                    buttonOptions={[]}
                                    /> */}
                                    <View style={slideButtonContainer}>
                                        <TouchableOpacity
                                        onPress={this.props.toggleSlideDrawer}>
                                            <View style={slideButton}></View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                    </View>
                    {this.props.subs ? <View style={subs}>
                        {this.renderSubs(12)}
                    </View> : null}
                </ScrollView>
            </View>
         );
    }
}

const mapStateToProps = state => {
    return {
        pgJoiners: state.joiners.pgJoiners
    }
}
 
export default connect(mapStateToProps)(Pitch);