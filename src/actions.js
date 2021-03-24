import { isCaptain, isVCaptain } from "./functions/reusable"

export const loginUser = (user, clubPlayers, starters, subs, puJoiners, league, gameweek, pgJoiners, ugJoiners, latestUG, topPlayer, topUser) => {
    let captain, vCaptain;
    for (let i=0;i<starters.length;i++) {
        if (isCaptain(starters[i], puJoiners)) {
            captain = starters[i];
        } else if (isVCaptain(starters[i], puJoiners)) {
            vCapain = starters[i];
        }
    }
    return {
        type: 'LOGINUSER',
        user,
        clubPlayers, 
        starters, 
        subs,
        puJoiners,
        captain,
        vCaptain,
        league,
        gameweek, 
        pgJoiners,
        ugJoiners,
        latestUG,
        topPlayer, 
        topUser
    }
}

export const loginAdminUser = (aUser, clubPlayers, allUsers, games) => {
    return {
        type: 'LOGINADMINUSER',
        aUser, 
        clubPlayers,
        allUsers,
        games
    }
}

export const setAdminUser = aUser => {
    return {
        type: 'SETADMINUSER',
        aUser
    }
}

export const setClubPlayers = players => {
    return {
        type: 'SETCLUBPLAYERS',
        players
    }
}

export const setUser = user => {
    return {
        type: 'SETUSER',
        user
    }
}

export const setTeamPlayers = players => {
    return {
        type: 'SETTEAMPLAYERS',
        players
    }
}

export const addSub = player => {
    return {
        type: 'ADDSUB',
        player
    }
}

export const addStarter = player => {
    return {
        type: 'ADDSTARTER',
        player
    }
}

export const pickTeamUpdate = (team, subs) => {
    return {
        type: 'PICKTEAMUPDATE',
        team,
        subs
    }
}

export const resetTeamPlayers = () => {
    return {
        type: 'RESETTEAMPLAYERS'
    }
}

export const nts2Login = (user, starters, subs, puJoiners) => {
    return {
        type: 'NTS2LOGIN',
        user,
        starters, 
        subs,
        puJoiners
    }
}

export const setGwSelectId = id =>{
    return {
        type: 'SETGWSELECTID',
        id
    }
}

export const completeGameState = id => {
    return {
        type: 'COMPLETEGAME',
        id
    }
}

export const addGameState = game => {
    return {
        type: 'ADDGAME',
        game
    }
}

export const setTransfers = team => {
    return {
        type: 'SETTRANSFERS',
        team
    }
}

export const updateBudget = budget => {
    return {
        type: 'UPDATEBUDGET',
        budget
    }
}

export  const addSpinner = () => {
    return {
        type: 'ADDSPINNER'
    }
}

export const removeSpinner = () => {
    return {
        type: 'REMOVESPINNER'
    }
}