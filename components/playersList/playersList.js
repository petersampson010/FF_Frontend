import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { connect } from 'react-redux';
import { positionString } from '../../functions/reusable';
import { Table, Row } from 'react-native-table-component';
import {vw, vh} from 'react-native-expo-viewport-units';
import { itemPositionPicker, pickerItem, positionPicker, slidable, tableHead, tableText } from './style';



class PlayersList extends Component {
    state = { 
        positionFilter: '0'
    }

    playerSelected = player => {
        return this.props.allSelectedPlayerIds.includes(player.player_id);
    };

    playerList = () => {

        switch(this.state.positionFilter) {
            case '0': 
                return this.props.clubPlayers.map((player, i) => 
                <Row 
                textStyle={tableText}
                key={i}
                data={[`${player.first_name} ${player.last_name}`, positionString(player.position), player.price]}
                onPress={this.playerSelected(player) ? null : ()=>this.props.clickFcn(player)}
                style={{opacity: (this.playerSelected(player) ? 0.3 : 1)}}
                />)
            case '1': 
                return this.props.clubPlayers.filter(x=>x.position==='1').map((player, i) => 
                <Row 
                textStyle={tableText}
                key={i}
                data={[ , `${player.first_name} ${player.last_name}`, positionString(player.position), player.price]}
                onPress={this.playerSelected(player) ? null : ()=>this.props.clickFcn(player)}
                style={{opacity: (this.playerSelected(player) ? 0.3 : 1)}}
                />)
            case '2': 
                return this.props.clubPlayers.filter(x=>x.position==='2').map((player, i) => 
                <Row 
                textStyle={tableText}
                key={i}
                data={[`${player.first_name} ${player.last_name}`, positionString(player.position), player.price]}
                onPress={this.playerSelected(player) ? null : ()=>this.props.clickFcn(player)}
                style={{opacity: (this.playerSelected(player) ? 0.3 : 1)}}
                />)
            case '3': 
                return this.props.clubPlayers.filter(x=>x.position==='3').map((player, i) => 
                <Row 
                textStyle={tableText}
                key={i}
                data={[`${player.first_name} ${player.last_name}`, positionString(player.position), player.price]}
                onPress={this.playerSelected(player) ? null : ()=>this.props.clickFcn(player)}
                style={{opacity: (this.playerSelected(player) ? 0.3 : 1)}}
                />)
            case '4': 
                return this.props.clubPlayers.filter(x=>x.position==='4').map((player, i) => 
                <Row 
                textStyle={tableText}
                key={i}
                data={[`${player.first_name} ${player.last_name}`, positionString(player.position), player.price]}
                onPress={this.playerSelected(player) ? null : ()=>this.props.clickFcn(player)}
                style={{opacity: (this.playerSelected(player) ? 0.3 : 1)}}
                />)   
            default: 
                break;
        }
    }

    render() { 
        return ( 
            <View>
                <View style={styles.filter}>
                    <Picker style={positionPicker} 
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
                <View style={styles.playersList}>
                    <Table>
                        <Row 
                        textStyle={tableHead} 
                        data={['Name', 'Position', 'Price']}
                        />
                        {this.playerList()}
                    </Table>
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

const styles = StyleSheet.create({
    playersList: {
        paddingBottom: vh(15),
        color: 'white'
    }
})