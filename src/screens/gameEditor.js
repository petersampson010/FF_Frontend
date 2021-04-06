import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Button, ScrollView, TouchableHighlightBase } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import Dialog, { DialogButton, DialogContent } from 'react-native-popup-dialog';
import { Table, Row } from 'react-native-table-component';
import { connect } from 'react-redux';
import { postPGJoiner, completeGame, postUGJoiner } from '../functions/APIcalls';
import { validatePlayerScore } from '../functions/validity';
import { completeGameState } from '../actions';

class GameEditorScreen extends Component {
    state = { 
        players: {},
        dialog: {
            active: false
        },
        score: {
            team: '',
            oppo: ''
        }
     }

    componentDidMount() {
        let players = {};
        for (let i=0;i<this.props.clubPlayers.length;i++) {
            let player = this.props.clubPlayers[i];
            players = {
                ...players,
                [player.player_id]: {
                    name: player.first_name + player.last_name,
                    player_id: player.player_id,
                    gameweek_id: this.props.gwLatest,
                    minutes: '',
                    assists: '',
                    goals: '',
                    own_goals: '',
                    y_cards: '',
                    r_cards: '',
                    bonus: '',
                    penalty_miss: '',
                    goals_conceded: '',
                    valid: true
                }
            };
        };
        this.setState({
            ...this.state, 
            players
        });
    }

    renderRows = () => {
        return Object.keys(this.state.players).map((x,i) => {
            return <Row key={i} data={this.renderRow(x)} style={{...styles.row, backgroundColor: this.state.players[x].valid ? 'green' : 'red'}}/>})
    }

    renderRow = (playerID) => [<Text>{this.state.players[playerID].name}</Text>,
        <TextInput 
        value={this.state.players[playerID].minutes} 
        onChange={el=>this.updateScore(playerID, el.nativeEvent.text, 'minutes')}
        placeholder="0"
        />, <TextInput 
        value={this.state.players[playerID].assists} 
        onChange={el=>this.updateScore(playerID, el.nativeEvent.text, 'assists')}
        placeholder="0"
        />, <TextInput 
        value={this.state.players[playerID].goals} 
        onChange={el=>this.updateScore(playerID, el.nativeEvent.text, 'goals')}
        placeholder="0"
        />, <TextInput 
        value={this.state.players[playerID].own_goals} 
        onChange={el=>this.updateScore(playerID, el.nativeEvent.text, 'own_goals')}
        placeholder="0"
        />, <TextInput 
        value={this.state.players[playerID].y_cards} 
        onChange={el=>this.updateScore(playerID, el.nativeEvent.text, 'y_cards')}
        placeholder="0"
        />, <TextInput 
        value={this.state.players[playerID].r_cards} 
        onChange={el=>this.updateScore(playerID, el.nativeEvent.text, 'r_cards')}
        placeholder="0"
        />, <TextInput 
        value={this.state.players[playerID].bonus} 
        onChange={el=>this.updateScore(playerID, el.nativeEvent.text, 'bonus')}
        placeholder="0"
        />, <TextInput 
        value={this.state.players[playerID].penalty_miss} 
        onChange={el=>this.updateScore(playerID, el.nativeEvent.text, 'penalty_miss')}
        placeholder="0"
        />, <TextInput 
        value={this.state.players[playerID].goals_conceded} 
        onChange={el=>this.updateScore(playerID, el.nativeEvent.text, 'goals_conceded')}
        placeholder="0"
        />];

    updateScore = (playerID, value, attr) => {
        if (value.match('^[0-9]{1,2}$') || value==="") {
            this.setState({...this.state, 
                players: {
                    ...this.state.players,
                    [playerID]: {...this.state.players[playerID],
                        [attr]: value
                    }
                }
            })
        }
    }

    validatePlayerScores = () => {
        let outcome = true;
        let postArr = [];
        let updatedState = this.state
        for (let i=0;i<this.props.clubPlayers.length;i++) {
            let playerID = this.props.clubPlayers[i].player_id
            let { result, post } = validatePlayerScore(this.state.players[playerID])
            if (!result) {
                updatedState = ({...updatedState, 
                    players: {
                        ...updatedState.players,
                        [playerID]: {...updatedState.players[playerID],
                            valid: false
                        }
                    }
                });
                outcome = false;
            } else if (post) {
                postArr.push(this.state.players[playerID]);
            }
        }
        this.setState({...updatedState, dialog: {active: false}});
        if (outcome) {
            this.postPGJoiners(postArr);
        } else {
            showMessage({
                message: "Please update minutes",
                type: "warning"
            })
        }
    }
    
    postPGJoiners = async(postArr) => {
        try{
            await completeGame(this.props.gwLatest, this.state.score);
            for (let i=0;i<postArr.length;i++) {
                await postPGJoiner(postArr[i]);
            }
            await this.postUGJoiners()
            this.props.completeGameState(this.props.gwLatest);
            this.props.navigation.navigate('AdminHome');
        } catch(e) {
            console.warn(e);
        }
    }

    postUGJoiners = async() => {
        let { allUsers, gwLatest } = this.props
        for (let i=0;i<allUsers.length;i++) {
            await postUGJoiner(allUsers[i].user_id, gwLatest);
        }
    }
    
    render() { 
        return ( 
            <ScrollView>
                <View>
                    <Button title="Confirm" onPress={()=>this.setState({...this.state, dialog: {active: true}})}/>
                    <TextInput
                    value={this.state.score.team}
                    onChange={el=>this.setState({...this.state, score: {...this.state.score, team: el.nativeEvent.text}})}
                    placeholder='your team'
                    />
                    <TextInput
                    value={this.state.score.oppo}
                    onChange={el=>this.setState({...this.state, score: {...this.state.score, oppo: el.nativeEvent.text}})}
                    placeholder='their team'
                    />
                    <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                        <Row style={styles.head} data={['Player', 'M', 'A', 'G', 'OG', 'YC', 'RC', "B", 'PM', 'GC']}/>
                        {this.renderRows()}
                    </Table>
                </View>
                <Dialog
                visible={this.state.dialog.active}
                width={0.6}
                height={0.2}
                onTouchOutside={()=>this.setState({...this.state, dialog:{active: false}})}
                >
                    <DialogContent>
                        <Text>Please review your stats before submission! Once submitted, stats cannot be changed. Clicking confirm will submit these stats and set this 'Game' to complete.</Text>
                    </DialogContent>
                    <DialogButton
                    text="SUBMIT STATS"
                    onPress={this.validatePlayerScores}
                    />
                </Dialog>
            </ScrollView>
        );
    }
}

const mapStateToProps = state => {
    return {
        clubPlayers: state.players.clubPlayers,
        gwLatest: state.gameweek.gwLatest,
        aUser: state.endUser.adminUser.aUser,
        allUsers: state.endUser.adminUser.allUsers
    }
}

const mapDispatchToProps = dispatch => {
    return {
        completeGameState: id => dispatch(completeGameState(id))
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(GameEditorScreen);

const styles = StyleSheet.create({
    head: {
        height: 20
    },
    row: {
        height: 35
    }
})