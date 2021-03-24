import React, { Component } from 'react';
import { Modal, TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import {vw, vh} from 'react-native-expo-viewport-units';
import { labelText, standardText } from '../../styles/textStyle';
import { button, buttons, closeModalContainer, modal, modalText } from './style';


class MyModal extends Component {
    state = {  }

    renderButtons = () => {
        return this.props.buttonOptions.map((x,i)=>{
        return <TouchableOpacity key={i} onPress={x.fcn} style={button}>
            <Text style={{...labelText, textAlign: 'center'}}>{x.text}</Text>
        </TouchableOpacity>})
    }
    // componentDidMount() {

    // }
    render() { 
        return ( 
            <Modal visible={this.props.visible} 
            transparent={true}>
                <View style={{...modal, height:this.props.height, width:this.props.width, left:(vw(100)-(this.props.width))/2}}>
                <View>
                    {this.props.jsx}
                </View>
                <View style={buttons}>
                    {this.renderButtons()}
                </View>
                <TouchableOpacity style={closeModalContainer} onPress={this.props.closeModalFcn}>
                    <Text style={standardText}>Close Modal</Text>
                </TouchableOpacity>
                </View>
            </Modal>
         );
    }
}
 
export default MyModal;


// props we need: 
// visible
// closeModalFcn
// jsx: 
// array of button options at bottom, each element needs text and an onPress fcn