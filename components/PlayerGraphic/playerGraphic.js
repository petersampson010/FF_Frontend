import React, { Component } from 'react';
import { Image, Text, StyleSheet, View, Button, Modal, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { isCaptain, isVCaptain, fullName } from '../../functions/reusable';
import Svg, { Ellipse } from "react-native-svg";
import Shirt from '../Shirt/shirt';
import { container } from './style';
import { TouchableHighlightBase } from 'react-native';


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
      return ( 
        <View style={container}>
          <Shirt
          player={this.props.player}
          openModal={this.props.openModal}
          captain={this.props.captain}
          vCaptain={this.props.vCaptain}/>
          <Button onPress={()=>this.props.clickFcn(this.props.player)} title="SUB/TRANSFER"/>
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