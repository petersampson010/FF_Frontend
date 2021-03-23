import React, { Component } from 'react';
import { Image, Text, StyleSheet, View, Button, Modal, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { isCaptain, isVCaptain, fullName, subOrTransfer } from '../../functions/reusable';
import Svg, { Ellipse } from "react-native-svg";
import Shirt from '../Shirt/shirt';
import { box, container, playerImage, playerName, subContainer, subImage, subTransferBtn } from './style';
import { TouchableHighlightBase } from 'react-native';
import { ImageBackground } from 'react-native';
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

    componentDidMount()  {
        // console.log(this.props.captain);
        // console.log(this.props.vCaptain);
    }

    render() {
        const playerImg = require('../../images/profile.jpg');
        const subImg = require('../../images/subIcon.png');
        const { player, openModal, type, clickFcn } = this.props;
      return ( 
            <View style={container}>
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