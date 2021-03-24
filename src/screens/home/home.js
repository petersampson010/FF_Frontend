import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import Header from '../../components/header/header';
import { Table, Row, Rows } from 'react-native-table-component';
import { topPlayer, topUser } from '../../functions/reusable';
import BottomNav from '../../components/bottomNav/bottomNav';
import { screenContainer } from '../../styles/global';
import { topPerformers, topPlayerStyle } from './style';
import PlayerGWProfile from '../../components/profile/playerGWProfile';
import UserGWProfile from '../../components/profile/userGWProfile';
import GwScore from '../../components/gwScore/gwScore';


class HomeScreen extends Component {
    state = {  }

    componentDidMount() {
        // console.log(this.props.gwLatest);
    }

    renderRows = () => {
        return this.props.league.sort((a,b)=>b.total_points-a.total_points).map((team, i)=>
            <Row key={i} style={''} data={[team.team_name, team.total_points, team.gw_points]}/>);
    }


    render() { 
        return ( 
            <View style={screenContainer}>
                {this.props.gwLatest ? 
                <View>
                    <GwScore />
                    <View style={topPerformers}>
                        <View style={topPlayer}>
                            <PlayerGWProfile player={this.props.topPlayer}/>
                        </View>
                        <View style={topPlayerStyle}>
                            <UserGWProfile user={this.props.topUser}/>
                        </View>
                    </View>
                </View> : null}
                <ScrollView style={''}>
                    <Table>
                        <Row style={''} data={['Team', 'Total Points', 'GW Points']} />
                        {this.renderRows()}
                    </Table>
                </ScrollView>
                <BottomNav navigate={this.props.navigation.navigate}/>
            </View>
         );
    }
}

const mapStateToProps = state => {
    return {
        user: state.endUser.user,
        league: state.homeGraphics.league,
        topPlayer: state.homeGraphics.topPlayer,
        topUser: state.homeGraphics.topUser,
        gwLatest: state.gameweek.gwLatest
    }
}

const mapDispatchToProps = dispatch => {
    return {
        
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
