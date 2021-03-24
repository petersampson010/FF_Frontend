import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, SectionList, ScrollView, Picker } from 'react-native';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { Table, Row, Rows } from 'react-native-table-component';
import { postPlayer } from '../functions/APIcalls';
import  { validatePlayer } from '../functions/validity';
import { capitalize } from '../functions/reusable';


class ClubSetupScreen extends Component {

    state = {
        tableHeaders: ['Name', 'Position', 'Price, £m, 0-99'],
        totalPrice: 0,
        players: {
            0: {name: '', position:'1', price: ''},
            1: {name: '', position:'1', price: ''},
            2: {name: '', position:'1', price: ''},
            3: {name: '', position:'1', price: ''},
            4: {name: '', position:'1', price: ''},
            5: {name: '', position:'1', price: ''},
            6: {name: '', position:'1', price: ''},
            7: {name: '', position:'1', price: ''},
            8: {name: '', position:'1', price: ''},
            9: {name: '', position:'1', price: ''},
            10: {name: '', position:'1', price: ''},
            11: {name: '', position:'1', price: ''},
            12: {name: '', position:'1', price: ''},
            12: {name: '', position:'1', price: ''},
            13: {name: '', position:'1', price: ''},
            14: {name: '', position:'1', price: ''},
            15: {name: '', position:'1', price: ''},
            16: {name: '', position:'1', price: ''},
            17: {name: '', position:'1', price: ''},
            18: {name: '', position:'1', price: ''},
            19: {name: '', position:'1', price: ''},
            21: {name: '', position:'1', price: ''},
            20: {name: '', position:'1', price: ''},
            22: {name: '', position:'1', price: ''},
            23: {name: '', position:'1', price: ''}
        }
    }

    updatePosition = (i, selectedValue) => {
        this.setState({...this.state, players: {...this.state.players, [i]: {...this.state.players[i], position: selectedValue}}})
    }

    updatePrice = (text, i) => {
        if (text.match('(^[0-9]{1,2}$|^$)')) {
            this.setState({...this.state, averagePrice: this.state.totalPrice, players: {...this.state.players, [i]: {...this.state.players[i], price: text}}})
        // } else if (text.match('^[0-9]{3,}$')) {
            // this.setState({...this.state, players: {...this.state.players, [i]: {...this.state.players[i], price: text.substring(0,2)}}})
        // } else {
        //     this.setState({...this.state, players: {...this.state.players, [i]: {...this.state.players[i], price: ''}}})
        }
    }

    updateName = (name, i) => {
        this.setState({...this.state, players: {...this.state.players, [i]: {...this.state.players[i], name}}})
    }


    renderRows = () => {
        return Object.keys(this.state.players).map((i) => {
            return <Row key={i} style={styles.row} data={
                [<TextInput 
                    value={this.state.players[i].name} 
                    onChange={el=>this.updateName(el.nativeEvent.text, i)}
                    autoCapitalize = 'words'
                    />, 
                <Picker style={styles.picker} key={i} selectedValue={this.state.players[i].position} onValueChange={value=>this.updatePosition(i, value)}>
                    <Picker.Item label="GK" value='1'/>
                    <Picker.Item label="DEF" value='2'/>
                    <Picker.Item label="MID" value='3'/>
                    <Picker.Item label="FWD" value='4'/>
                </Picker>,
                <TextInput 
                placeholder='£1m - £99m'
                value={this.state.players[i].price} 
                onChange={el=>this.updatePrice(el.nativeEvent.text, i)}
                />]
            }/>
        })
    }


    submitPlayers = () => {
        if (this.countPlayers()>1) {
            this.postPlayers();
        } else {
            console.warn('not enough players ya get me')
        }
    }

    postPlayers = async() => {
        try {
            for (let i=0;i<24;i++) {
                let entry = this.state.players[i];
                if (validatePlayer(entry)) {
                    await postPlayer(entry, this.props.aUserId);
                } else {
                    console.warn('invalid entry: ' + i);
                }
            }
            this.props.navigation.navigate('AdminHome');
        } catch(e)  {
            console.warn(e);
        }
    }

    countPlayers = () => {
        let { players } = this.state;
        let noOfPlayers = 0;
        for (let i=0;i<24;i++) {
            if (players[i].name!==''&&players[i].price!==0) {
                noOfPlayers++;
            }
        }
        return noOfPlayers;
    }

    render() {
        return (
          <ScrollView >
            <View style={styles.topBar}>
                <Text>Club Setup</Text>
                <Button title="Submit Club Players" onPress={this.submitPlayers}/>
            </View>
            <Text>Average Player Price: £{this.state.averagePrice}m</Text>
            <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                <Row style={styles.head} data={this.state.tableHeaders}/>
                {this.renderRows()}
            </Table>
          </ScrollView>
        );
    }
  }

const mapStateToProps = state => {
    return {
        aUserId: state.endUser.adminUser.aUser.admin_user_id
    }
}

export default connect(mapStateToProps)(ClubSetupScreen)

const styles = StyleSheet.create({
    head: { height: 20 },
    row: { height: 34 },
    picker: {transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }] },
    topBar: {flexDirection: 'row', justifyContent: "space-between"}
})