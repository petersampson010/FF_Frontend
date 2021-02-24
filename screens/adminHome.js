import React, { Component } from 'react';
import { ListItem } from 'react-native-elements';
import { Button, ScrollView, View, StyleSheet, Text } from 'react-native';
import { Input } from 'react-native-elements';  
import { connect } from 'react-redux';
import {vw, vh} from 'react-native-expo-viewport-units';
import { validateGame } from '../functions/validity';
import DateTimePicker from '@react-native-community/datetimepicker';
import { postGame, patchGame } from '../functions/APIcalls';
import { showMessage } from 'react-native-flash-message';
import TouchableScale from 'react-native-touchable-scale'
import { setGwSelectId, addGameState } from '../actions';
import { displayDate } from '../functions/reusable';
import MyModal from '../components/Modal/myModal';

class AdminHomeScreen extends Component {
    state = { 
        modal: {
            active: false,
            update: false,
            game: {
                opponent: '',
                date: new Date(),
                complete: false
            }
        },
        modal2: {
            active: false,
            game: {
                opponent: '',
                date: new Date(),
                complete: false
            }
        }
     }

    renderGames = () => {
        let sortedArr = this.props.games.sort((a,b)=>Date.parse(b.date)-Date.parse(a.date));
        return sortedArr.map((game,i) => 
        <ListItem key={i} style={styles.listItem}
        onPress={()=>{
            this.setState({...this.state, modal2: {active: true, game}})
            this.props.setGwSelectId(game.gameweek_id)}}
        Component={TouchableScale}
        friction={90} //
        tension={100} // These props are passed to the parent component (here TouchableScale)
        activeScale={0.95} //
        linearGradientProps={{
            colors: game.complete ? ['grey', 'black'] : ['#FF9800', '#F44336'],
            start: { x: 1, y: 0 },
            end: { x: 0.2, y: 0 },
        }}
        >
            <ListItem.Content>
                <ListItem.Title style={styles.listTitle}>{game.opponent}</ListItem.Title>
                <ListItem.Subtitle style={styles.listSub}>{displayDate(game.date)}</ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
        )
    }

    formChange = (id, value) => {
        this.setState({...this.state, 
        modal: {...this.state.modal,
            game: {...this.state.modal.game,
                [id]: value
            }
        }})
    }

    addGame = async() => {
        try {
            let res = await postGame(this.state.modal.game, this.props.aUser.admin_user_id);
            if (res.date) {
                this.props.addGameState(res);
                this.setState({
                    modal: {
                        active: false,
                        game: {
                            opponent: '',
                            date: new Date()
                        }
                    }
                });
                showMessage({
                    message: "Game/Event added",
                    type: 'success'
                })
            }
        } catch(e) {
            console.warn(e);
        }
    }   

    updateGame = async() => {
        try {
            let res = await patchGame(this.state.modal.game);
            if (res.date) {
                this.setState({
                    modal: {
                        active: false,
                        game: {
                            opponent: '',
                            date: new Date()
                        }
                    }
                })
                showMessage({
                    message: "Game/Event updated",
                    type: 'success'
                })
            }
        } catch(e) {
            console.warn(e);
        }
    }

    render() { 
        return ( 
            <ScrollView>
                <Button title="Add Event/Game" onPress={()=>this.setState({...this.state, modal: {...this.state.modal, active: true}})}/>
                <Button title="Add/Remove/Edit Player(s)" onPress={()=>this.props.navigation.navigate('AdminPlayerEdit')} />
                <ScrollView>
                    {this.renderGames()}
                </ScrollView>
                <MyModal
                visible={this.state.modal.active}
                height={vh(60)}
                width={vw(80)}
                closeModalFcn={()=>
                    this.setState({...this.state, modal: {...this.state.modal, 
                        active: false
                    }})}
                jsx={<View><Input value={this.state.modal.game.opponent} 
                onChange={(el)=>this.formChange('opponent', el.nativeEvent.text)}
                placeholder="Fantasy FC"
                label="Opposition"
                />
                    <Text>Please select the date the game will be played</Text>
                    <DateTimePicker
                    value={this.state.modal.game.date}
                    onChange={(event, date)=>this.formChange('date', date)}
                    />
                </View>}
                buttonOptions={[{text: this.state.modal.update ? "Update Game" : "Submit Game", fcn: this.state.modal.update ? this.updateGame : this.addGame}]}
                />
                <MyModal 
                visible={this.state.modal2.active}
                height={vh(60)}
                width={vw(70)}
                closeModalFcn={()=>
                    this.setState({...this.state, modal2: {active: false,
                    game: {
                        opponent: '',
                        date: new Date(),
                    }
                    }})
                }
                jsx={this.state.modal2.game.complete ? <Text>This game has been completed, you are unable to edit the player statistics</Text> 
                    : 
                    <View><Text>Edit game or update stats</Text><Text>Remember... when entering player stats and completing a game, all changes are final so be sure to double check your entries!</Text></View>}
                buttonOptions={this.state.modal2.game.complete ? [] : [{text: 'Submit Game Stats', fcn: ()=>{this.setState({...this.state, modal2: {...this.state.modal2, active: false}});this.props.navigation.navigate('GameEditor')}},
                {text: 'Edit Game', fcn: ()=>this.setState({...this.state, modal: {active: true, update: true,
                    game: this.state.modal2.game}, modal2: {...this.state.modal2, active: false}})}]}
                    />
            </ScrollView>
         );
    }
}

const mapStateToProps = state => {
    return {
        games: state.gameweek.games,
        aUser: state.endUser.adminUser.aUser
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setGwSelectId: id => dispatch(setGwSelectId(id)),
        addGameState: game => dispatch(addGameState(game))
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(AdminHomeScreen);

const styles = StyleSheet.create({
    
    listItem: {
        borderRadius: 17,
        marginBottom: 10,
    },
    listTitle: {
        color: 'white',
        fontWeight: 'bold'
    },
    listSub: {
        color: 'white',

    },
    
})