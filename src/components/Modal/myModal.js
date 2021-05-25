import React, { Component } from 'react';
import { Modal, TouchableOpacity, View, Text } from 'react-native';
import {vw, vh} from 'react-native-expo-viewport-units';
import { connect } from 'react-redux';
import { setCaptain } from '../../actions';
import { fullName, getPuJ, positionString } from '../../functions/reusable';
import { $arylideYellow, $chocolateBlack, $standardWhite, $zaGreen } from '../../styles/global';
import { checkBox, labelText, standardText } from '../../styles/textStyle';
import { button, buttons, captainBox, closeModalContainer, modal, modalTextContainer } from './style';


class MyModal extends Component {
    state = {  }

    renderButtons = () => {
        return this.props.buttonOptions.map((x,i)=>{
        return <TouchableOpacity key={i} onPress={x.fcn} style={button}>
            <Text style={{...labelText, textAlign: 'center'}}>{x.text}</Text>
        </TouchableOpacity>})
    }

    setCaptain = player => {
        if (this.props.vCaptain===player) {
            showMessage({
                message: "Player is already a captain",
                type: 'warning'
            })
        } else {
            this.props.setCaptain(player);
        }
    }

    setVCaptain = player => {
        if (this.props.captain===player) {
            showMessage({
                message: "Player is already a captain",
                type: 'warning'
            })
        } else {
            this.props.setVCaptain(player);
        }
    }

    modalJSX = () => {
        const { modalType, entry } = this.props;
        let player;
        switch(modalType) {
            case 'userProfile':
                const { user, ug } = entry;
                return <View style={modalTextContainer}>
                    <Text style={standardText}>{user.teamname}</Text>
                    <Text style={standardText}>GW Points: {ug.total_points}</Text>
                    {/* <Text style={standardText}>Total Points: {totalPoints}</Text> */}
                    <Text style={standardText}>maybe total score</Text>
                </View>
            case 'playerProfile':
                player = entry.pg ? entry.player : entry;
                return <View style={modalTextContainer}>
                    <Text style={standardText}>{fullName(player)}</Text>
                    <Text style={standardText}>{positionString(player.position)}</Text>
                    <Text style={standardText}>£{player.price}</Text>
                    <Text style={standardText}>MAYBE SOME STATS AT SOME POINT</Text>
                </View>
            case 'pickTeam':
                player = entry.pg ? entry.player : entry;
                const sub = getPuJ(player, this.props.puJoiners).sub;
                return <View style={modalTextContainer}>
                    <Text style={standardText}>{fullName(player)}</Text>
                    <Text style={standardText}>{positionString(player.position)}</Text>
                    <Text style={standardText}>£{player.price}m</Text>
                    <Text style={standardText}>MAYBE SOME STATS AT SOME POINT</Text>
                    {(!sub) ?
                    <View>
                        <TouchableOpacity style={this.props.captain===player ? {...captainBox, backgroundColor: $zaGreen} : {...captainBox, backgroundColor: $standardWhite}} onPress={()=>this.setCaptain(player)}>
                            <Text style={this.props.captain===player ? {...checkBox, color: $arylideYellow} : {...checkBox, color: $chocolateBlack}}>Captain</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={this.props.vCaptain===player ? {...captainBox, backgroundColor: $zaGreen} : {...captainBox, backgroundColor: $standardWhite}} onPress={()=>this.setVCaptain(player)}>
                            <Text style={this.props.vCaptain===player ? {...checkBox, color: $arylideYellow} : {...checkBox, color: $chocolateBlack}}>Vice Captain</Text>
                        </TouchableOpacity>
                    </View>
                    : null}
                </View>
            default: 
                return <View></View>
        }
    }
    render() { 
        return ( 
            <Modal visible={this.props.visible} 
            transparent={true}>
                <View style={{...modal, height:this.props.height, width:this.props.width, left:(vw(100)-(this.props.width))/2}}>
                    <View>
                        {this.modalJSX()}
                    </View>
                    <View style={buttons}>
                        {this.renderButtons()}
                    </View>
                    <TouchableOpacity style={closeModalContainer} onPress={this.props.closeModalFcn}>
                        <Text style={standardText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
         );
    }
}
 
const mapStateToProps = state => {
    return {
        puJoiners: state.joiners.puJoiners,
        captain: state.players.latest.captain,
        vCaptain: state.players.latest.vCaptain
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setCaptain: player => dispatch(setCaptain(player)),
        setVCaptain: player => dispatch(setVCaptain(player))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyModal);



// props we need: 
// visible
// closeModalFcn
// jsx: 
// array of button options at bottom, each element needs text and an onPress fcn