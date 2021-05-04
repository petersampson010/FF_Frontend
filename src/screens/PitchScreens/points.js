import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Header from '../../components/header/header';
import Pitch from '../../components/Pitch/pitch';
import { getCaptain, getVCaptain, playersArrayToObj, getNameOfNavPage } from '../../functions/reusable';
import BottomNav from '../../components/bottomNav/bottomNav';


class PointsScreen extends Component {
    state = {  }

    getNavState = () => this.props.navigation.dangerouslyGetState();

    render() { 
        return ( 
            <ScrollView>
                <Header title='Points' navigate={page=>this.props.navigation.navigate(page)}/>
                {this.props.gwLatest ? 
                <Pitch
                type="points"
                update={()=>console.log('do nothing')}
                budget={false}
                team={playersArrayToObj(this.props.starters)}
                subs={this.props.subs}
                clickFcn={()=>console.log('do nothing')}
                captain={getCaptain(this.props.starters, this.props.puJoiners)}
                vCaptain={getVCaptain(this.props.starters, this.props.puJoiners)}
                /> : <Text>No Games played yet, come back soon!</Text>}
                <BottomNav navigation={this.props.navigation}/>
            </ScrollView>
         );
    }
}

const mapStateToProps = state => {
    return {
        gwLatest: state.gameweek.gwLatest,
        subs: state.players.subs,
        starters: state.players.starters,
        puJoiners: state.joiners.puJoiners,
        league: state.homeGraphics.league
    }
}
 
export default connect(mapStateToProps)(PointsScreen);