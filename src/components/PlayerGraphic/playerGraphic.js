import React, { Component } from 'react';
import { Image, Text, StyleSheet, View, Button, Modal, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { fullName, subOrTransfer } from '../../functions/reusable';
import { box, capText, container, playerImage, playerName, subContainer, subImage, subTransferBtn } from './style';
import { TouchableOpacity } from 'react-native';


class PlayerGraphic extends Component {
    state = {}

    playerNumber = () => {
        const { num } = this.props;
        if (num) {
            return num;
        } else {
            return '';
        }
    }

    renderPoints = () => {
        if (this.props.type!='pickTeam') {
            return <Text>{this.points()}</Text>
        }
    }

    points = () => {
        let PG = this.props.playerPG;
        if (PG===undefined) {
            return '0';
        } else if (!PG)  {
            return '';
        } else {
            return this.props.playerPG.total_points;
        }
    }


    horizontalMargin = player => {
        switch(player.position) {
            case '2':
                return 7;
            case '3':
                return 1;
            case '4':
                return 0;
            default: 
            return 0;
        }
    }

    isCaptain = () => {
        if (this.props.captain) {
            return 'C';
        } else if (this.props.vCaptain) {
            return 'VC';
        }
    }

    render() {
        const playerImg = require('../../images/profile.jpg');
        const subImg = require('../../images/subIcon.png');
        const { player, openModal, type, clickFcn } = this.props;
      return ( 
            <View style={{...container, marginHorizontal: this.horizontalMargin(player)}}>
                <View style={subContainer}>
                    <TouchableOpacity onPress={()=>openModal(player)}>
                        <Image source={playerImg} imageStyle={{resizeMode: 'cover'}} style={playerImage}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>clickFcn(player)}>
                        <Image source={subImg} imageStyle={{resizeMode: 'cover'}} style={subImage}/>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={()=>openModal(player)}>
                    <Text style={playerName}>{fullName(player)}</Text>
                    <Text style={capText}>{this.isCaptain()}</Text>
                </TouchableOpacity>
            </View>
      );
    }
}

const mapStateToProps = state => {
    return {
        puJoiners: state.joiners.puJoiners
    }
}
 
export default connect(mapStateToProps)(PlayerGraphic);