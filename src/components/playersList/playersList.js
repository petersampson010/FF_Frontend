import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { connect } from 'react-redux';
import { fullName, positionString } from '../../functions/reusable';
import {vw, vh} from 'react-native-expo-viewport-units';
import { filter, itemPositionPicker, pickerItem, playersListContainer, positionPicker, slidable, tableHead, tableText } from './style';
import { TouchableOpacity } from 'react-native';
import { labelText, standardText } from '../../styles/textStyle';
import { tableElement3, tableRow } from '../../styles/table';



class PlayersList extends Component {
    state = { 
        positionFilter: '0'
    }

    playerSelected = player => this.props.allSelectedPlayerIds.includes(player.player_id);

    table = () => {
        switch(this.state.positionFilter) {
            case '0': 
                return this.props.clubPlayers.map((player, index) => this.tableRow(player, index))
            case '1': 
                return this.props.clubPlayers.filter(x=>x.position==='1').map((player, index) => this.tableRow(player, index))
            case '2': 
                return this.props.clubPlayers.filter(x=>x.position==='2').map((player, index) => this.tableRow(player, index))
            case '3': 
                return this.props.clubPlayers.filter(x=>x.position==='3').map((player, index) => this.tableRow(player, index))
            case '4': 
                return this.props.clubPlayers.filter(x=>x.position==='4').map((player, index) => this.tableRow(player, index));
            default: 
                break;
        }
    }

    tableRow = (player, key) => {
    return this.playerSelected(player) ? 
    <TouchableOpacity key={key}
    style={{...tableRow, opacity: 0.3}}>
        <Text style={{...tableElement3, ...standardText}}>{fullName(player)}</Text>
        <Text style={{...tableElement3, ...standardText}}>{positionString(player.position)}</Text>
        <Text style={{...tableElement3, ...standardText}}>£{player.price}m</Text>
    </TouchableOpacity>
    :
    <TouchableOpacity key={key} onPress={()=>this.props.clickFcn(player)}
    style={{...tableRow, opacity: 1}}>
        <Text style={{...tableElement3, ...standardText}}>{fullName(player)}</Text>
        <Text style={{...tableElement3, ...standardText}}>{positionString(player.position)}</Text>
        <Text style={{...tableElement3, ...standardText}}>£{player.price}m</Text>
    </TouchableOpacity>
    }

    render() { 
        return ( 
            <View style={playersListContainer}>
                <View style={filter}>
                    <Picker
                    itemStyle={itemPositionPicker}
                    selectedValue={this.state.positionFilter} 
                    onValueChange={value=>this.setState({...this.state, positionFilter: value})}>
                        <Picker.Item color="white" label="ANY" value='0'/>
                        <Picker.Item color="white" label="GK" value='1'/>
                        <Picker.Item color="white" label="DEF" value='2'/>
                        <Picker.Item color="white" label="MID" value='3'/>
                        <Picker.Item color="white" label="FWD" value='4'/>
                    </Picker>
                </View>
                <View >
                    <View>
                        <View style={tableRow}>
                            <Text style={{...tableElement3, ...labelText}}>Name</Text>
                            <Text style={{...tableElement3, ...labelText}}>Position</Text>
                            <Text style={{...tableElement3, ...labelText}}>Price</Text>
                        </View>
                        {this.table()}
                    </View>
                </View>
            </View>
         );
    }
}

const mapStateToProps = state => {
    return {
        clubPlayers: state.players.clubPlayers
    }
}
 
export default connect(mapStateToProps)(PlayersList);