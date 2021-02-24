import React, { Component } from 'react';
import { Modal, TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import {vw, vh} from 'react-native-expo-viewport-units';


class MyModal extends Component {
    state = {  }

    renderButtons = () => {
        return this.props.buttonOptions.map((x,i)=>{
        return <TouchableOpacity key={i} onPress={x.fcn} style={styles.button}>
            <Text style={{textAlign: 'center'}}>{x.text}</Text>
        </TouchableOpacity>})
    }
    // componentDidMount() {

    // }
    render() { 
        return ( 
            <Modal visible={this.props.visible} 
            transparent={true}>
                <View style={{...styles.modal, height:this.props.height, width:this.props.width, left:(vw(100)-(this.props.width))/2}}>
                    <Text onPress={this.props.closeModalFcn}>Close Modal</Text>
                    <View>
                        {this.props.jsx}
                    </View>
                    <View style={styles.buttons}>
                        {this.renderButtons()}
                    </View>
                </View>
            </Modal>
         );
    }
}
 
export default MyModal;

const styles = StyleSheet.create({
    modal: {
        position: "absolute",
        top: vh(20),
        backgroundColor: 'red'
    },
    buttons: {
        flex: 1,
        flexDirection: 'row', 
        
    },
    button: {
        width: vw(30),

    }
})

// props we need: 
// visible
// closeModalFcn
// jsx: 
// array of button options at bottom, each element needs text and an onPress fcn