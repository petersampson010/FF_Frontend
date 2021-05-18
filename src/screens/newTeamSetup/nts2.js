import React, { Component } from 'react';
import Header from '../../components/header/header';
import { ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { patchUserBUDGET, postPlayerUserJoiner } from '../../functions/APIcalls';
import { nts2Login } from '../../actions';
import Pitch from '../../components/Pitch/pitch';
import PlayersList from '../../components/playersList/playersList';
import { showMessage } from 'react-native-flash-message';
import { PlayerIds, allSelectedPlayers } from '../../functions/reusable';
import pitchHead from '../../components/PitchHead/pitchHead';

class ntsScreen2 extends Component {
    state = { 
        budget: 600,
        num: 1,
        team: {
            '1': [],
            '2': [],
            '3': [],
            '4': []
        }
    }

    clickFcn = player => {
        if (PlayerIds(this.state.team).includes(player.player_id)) {
            this.deSelect(player);
        } else {
            this.select(player);
        }
    }

    select = player => {
        const { team } = this.state;
        let newBudget = this.state.budget - player.price;
        if (team.length>7) {
            showMessage({
                message: "too many players, please deselect a player before adding anymore",
                type: "danger"
            });
        } else {
            switch(player.position) {
                case '1':
                    if (team[1].length>0) {
                        showMessage({
                            message: "Keeper already selected",
                            description: "If you need a sub-section of error",
                            type: "warning"
                        })
                    } else {
                        this.setState({...this.state, team: {...this.state.team, 1: [...this.state.team[1], player]}, budget: newBudget})
                    };
                    break;
                case '2':
                    if (team[2].length>3) {
                        showMessage({
                            message: "Too many defenders already selected",
                            description: "If you need a sub-section of error",
                            type: "warning"
                        })
                    } else {
                        this.setState({...this.state, team: {...this.state.team, 2: [...this.state.team[2], player]}, budget: newBudget})
                    };
                    break;
                case '3':
                    if (team[3].length>3) {
                        showMessage({
                            message: "Too many midfielders already selected",
                            description: "If you need a sub-section of error",
                            type: "warning"
                        })
                    } else {
                        this.setState({...this.state, team: {...this.state.team, 3: [...this.state.team[3], player]}, budget: newBudget})
                    };
                    break;
                case '4':
                    if (team[4].length>2) {
                        showMessage({
                            message: "Too many forwards already selected",
                            description: "If you need a sub-section of error",
                            type: "warning"
                        })
                    } else {
                        this.setState({...this.state, team: {...this.state.team, 4: [...this.state.team[4], player]}, budget: newBudget})
                    };
                    break;
                default: 
                    break; 
            }
        }
    }

    deSelect = player => {
        let { team } = this.state
        this.setState({...this.state, budget: this.state.budget + player.price, team: {...team, [player.position]: team[player.position].filter(x=>x.player_id!==player.player_id)}});
    }

    submitTeam = async() => {
        let team = allSelectedPlayers(this.state.team);
        try {
            if (team.length===8) {
                if (this.state.budget>=0) {
                    if (this.state.team['1'].length===1) {
                        let puJoiners = []
                        for (let i=0;i<8;i++) {
                            let puJoiner = await postPlayerUserJoiner(team[i], this.props.user.user_id, i)
                            puJoiners.push(puJoiner);
                        }
                        let teamPlayers = Object.values(this.state.team).flat(Infinity);
                        let user = await patchUserBUDGET(this.state.budget, this.props.user.user_id);
                        this.props.nts2Login(user, teamPlayers.slice(0,6), teamPlayers.slice(-2), puJoiners);
                        this.props.navigation.navigate('Home');
                    } else {
                        showMessage({
                            message: "You need 1 Goalkeeper selected",
                            type: "danger"
                        });
                    }
                } else {
                    showMessage({
                        message: "Not enough funds",
                        type: "danger"
                    });
                }
            } else {
                showMessage({
                    message: "You need 8 players in your team!",
                    type: "danger"
                });
            }
        } catch(e) {
            console.warn(e);
        }
    }

    render() { 
        return ( 
            <ScrollView style={styles.container}>
                <Header style={styles.header} title='Team Selection'/>
                <Pitch
                update={this.submitTeam}
                budget={this.state.budget}
                team={this.state.team}
                subs={false}
                clickFcn={this.clickFcn}
                captain={false}
                vCaptain={false}
                type='transfers'
                />
                <PlayersList
                allSelectedPlayerIds={allSelectedPlayerIds(this.state.team)}
                clickFcn={this.clickFcn}
                />
            </ScrollView>
        );
    }
}

const mapStateToProps = state => {
    return {
        clubPlayers: state.players.clubPlayers,
        user: state.endUser.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        nts2Login: (user, starters, subs, puJoiners) => dispatch(nts2Login(user, starters, subs, puJoiners)),
        setTeamPlayers: players => dispatch(setTeamPlayers(players))
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(ntsScreen2);

const styles = StyleSheet.create({
    
})