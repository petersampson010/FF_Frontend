// USER

import { showMessage } from "react-native-flash-message";

export const fetchAllUsers = () => {
    return fetch('http://localhost:3000/users')
    .then(res=>res.json());
}
export const fetchUserById = id => {
    return fetch(`http://localhost:3000/users/${id}`)
    .then(res=>res.json())
}
export const fetchAllUsersByAdminUserId = id => {
    return fetchAllUsers()
    .then(x=>x.filter(x=>x.admin_user_id===id))
}
export const fetchUserByEmail = userObj => {
    return fetchAllUsers()
    .then(users=>users.find(x=>x.email===userObj.email))
}
export const postUser = (userObj) => {
    let configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            email: userObj.email,
            teamname: userObj.teamName,
            password: userObj.password,
            transfers: 0,
            budget: userObj.budget,
            admin_user_id: userObj.clubId
        })
    };
    return fetch('http://localhost:3000/users', configObj)
    .then(res=>res.json())
}
export const patchUserBUDGET = (budget, userId) => {
    let configObj = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            budget
        })
    };
    return fetch(`http://localhost:3000/users/${userId}`, configObj)
    .then(res=>res.json())
}

export const getUserTotalPoints = (userId) => {
    return fetch(`http://localhost:3000/users/${userId}/total_points`)
    .then(res => res.json())
}

// ADMIN_USER

export const fetchAllAdminUsers = () => {
    return fetch('http://localhost:3000/admin_users')
    .then(res=>res.json());
}

export const fetchAdminUserById = id => {
    return fetch(`http://localhost:3000/admin_users/${id}`)
    .then(res=>res.json());
}
export const fetchAdminUserByEmail = aUser => {
    return fetchAllAdminUsers()
    .then(aUsers=>aUsers.find(x=>x.email===aUser.email))
}
export const postAdminUser = aUser => {
    let configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            email: aUser.email,
            password: aUser.password,
            club_name: aUser.email
        })
    };
    return fetch('http://localhost:3000/admin_users', configObj)
    .then(res=>res.json())
}
export const fetchLeague = id => {
    return fetch(`http://localhost:3000/admin_users/${id}/league`) 
    .then(res=>res.json())

}

//PLAYER

export const fetchAllPlayers = () => {
    return fetch('http://localhost:3000/players')
    .then(res => res.json())
}
export const fetchPlayerById = id => {
    return fetch(`http://localhost:3000/players/${id}`)
    .then(res => res.json())
}
export const fetchAllPlayersByAdminUserId = id => {
    return fetch(`http://localhost:3000/admin_users/${id}/players`)
    .then(res => res.json())
}
export const fetchLatestStartersByUserId = id => {
    return fetch(`http://localhost:3000/users/${id}/latest_starters`)
    .then(res => res.json())
}
export const fetchGwStartersByUserId = (id, gameweekId) => {
    return fetch(`http://localhost:3000/users/${id}/${gameweekId}/last_gw_starters`)
    .then(res => res.json())
}
export const fetchLatestSubsByUserId = id => {
    return fetch(`http://localhost:3000/users/${id}/latest_subs`)
    .then(res => res.json())
}
export const fetchGwSubsByUserId = (id, gameweekId) => {
    return fetch(`http://localhost:3000/users/${id}/${gameweekId}/last_gw_subs`)
    .then(res => res.json())
}
export const postPlayer = (player, aUserId) => {
    let configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            first_name: player.name.split(' ')[0],
            last_name: player.name.split(' ')[1],
            position: player.position,
            price: (player.price),
            availability: 'a',
            admin_user_id: aUserId
        })
    };
    return fetch('http://localhost:3000/players', configObj)
    .then(res=>res.json())
}
export const patchPlayer = player => {
    let configObj = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            first_name: player.first_name,
            last_name: player.last_name,
            position: player.position,
            price: (player.price),
            availability: player.availability
        })
    }
    fetch(`http://localhost:3000/players/${player.admin_user_id}`, configObj) 
    .then(res=>res.json())
}

//PLAYER_USER_JOINER

export const fetchAllPlayerUserJoinersByUserId = id => {
    return fetch(`http://localhost:3000/users/${id}/player_user_joiners`)
    .then(res=>res.json())
}
export const fetchPlayerUserJoinerByUserIdAndPlayerId = (userId, playerId) => {
    return fetchAllPlayerUserJoinersByUserId(userId)
    .then(data=>data.filter(x=>x.player_id===playerId))
    .then(data=>data[0]);
}
export const postPlayerUserJoiner = (player, userId, count) => {
    let configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            sub: count>5 ? true : false,
            captain: count===2 ? true : false,
            vice_captain: count===5 ? true : false,
            player_id: player.player_id,
            user_id: userId
        })
    };
    return fetch('http://localhost:3000/player_user_joiners', configObj)
    .then(res=>res.json())
}
export const postPlayerUserJoinerTRANSFER = (player, userId, count, captain, vice_captain) => {
    let configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            sub: count>0 ? true : false,
            captain,
            vice_captain,
            player_id: player.player_id,
            user_id: userId
        })
    };
    return fetch('http://localhost:3000/player_user_joiners', configObj)
    .then(res=>res.json())
}

export const patchPlayerUserJoinerSUBS = (sub, pu_id) => {
    let configObj = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            sub,
        })
    };
    return fetch(`http://localhost:3000/player_user_joiners/${pu_id}`, configObj)
    .then(res=>res.json())
}

export const patchPlayerUserJoinerCAPTAINS = (captain, vice_captain, pu_id) => {
    let configObj = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            captain,
            vice_captain
        })
    };
    return fetch(`http://localhost:3000/player_user_joiners/${pu_id}`, configObj)
    .then(res=>res.json())
}

export const deletePlayerUserJoiner = (pu_id) => {
    let configObj = {
        method: "DELETE"
    };
    fetch(`http://localhost:3000/player_user_joiners/${pu_id}`, configObj)
}


// GAMEWEEKS / EVENTS

export const fetchAllGames = () => {
    return fetch('http://localhost:3000/gameweeks')
    .then(res=>res.jsoin())
}
export const fetchAllGamesByAdminUserId = id => {
    return fetch(`http://localhost:3000/gameweeks/admin_user/${id}`)
    .then(res=>res.json())
}
export const postGame = (game, aUserID) => {
    let configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            date: game.date,
            opponent: game.opponent,
            complete: false,
            admin_user_id: aUserID
        })
    };
    return fetch(`http://localhost:3000/gameweeks`, configObj)
    .then(res=>res.json())
}
export const patchGame = (game) => {
    let configObj = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            date: game.date,
            opponent: game.opponent
        })
    };
    return fetch(`http://localhost:3000/gameweeks/${game.gameweek_id}`, configObj)
    .then(res=>res.json())
}
export const completeGame = (id, score) => {
    let configObj = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            score: `${score.team} - ${score.oppo}`,
            complete: true
        })
    };
    return fetch(`http://localhost:3000/gameweeks/${id}`, configObj)
    .then(res=>res.json())
}

export const fetchLatestGameweekFromAdminUserId = auId => {
    return fetchAllGamesByAdminUserId(auId)
    .then(games => games.filter(g=>g.complete===true))
    .then(games => games.sort((a,b)=>Date.parse(b.date)-Date.parse(a.date)))
    .then(games => games[0])
}


// PLAYER-GAMEWEEK-JOINERS

export const postPGJoiner = async(joiner) => {
    try{
        let newObj = {}
        for (let key in joiner) {
            if (joiner[key]==="") {
                newObj[key] = 0
            } else {
                newObj[key] = parseInt(joiner[key])
            }
        }
        let { minutes, assists, goals, own_goals, y_cards, r_cards, bonus, penalty_miss, goals_conceded } = newObj
        let player = await fetchPlayerById(joiner.player_id);
        let score;
        switch(player.position) {
            case '4': 
            // console.log((Math.floor(minutes/30)) + (assists*3) + (goals*4) + (own_goals*-3) + (y_cards*-1) + (r_cards*-3) + (bonus) + (penalty_miss*-3));
                score = ((Math.floor(minutes/30)) + (assists*3) + (goals*4) + (own_goals*-3) + (y_cards*-1) + (r_cards*-3) + (bonus) + (penalty_miss*-3));
                break;
            case '3':
                // console.log((Math.floor(minutes/30)) + (assists*3) + (goals*5) + (own_goals*-3) + (y_cards*-1) + (r_cards*-3) + (bonus) + (penalty_miss*-3));
                score = ((Math.floor(minutes/30)) + (assists*3) + (goals*5) + (own_goals*-3) + (y_cards*-1) + (r_cards*-3) + (bonus) + (penalty_miss*-3));
                break;
            default:
                if (goals_conceded===0 || goals_conceded===null) {
                    // console.log((Math.floor(minutes/30)) + (assists*3) + (goals*5) + (own_goals*-3) + (y_cards*-1) + (r_cards*-3) + (bonus) + (penalty_miss*-3 + 5));
                    score = ((Math.floor(minutes/30)) + (assists*3) + (goals*5) + (own_goals*-3) + (y_cards*-1) + (r_cards*-3) + (bonus) + (penalty_miss*-3 + 5));
                    break;
                } else {
                    // console.log((Math.floor(minutes/30)) + (assists*3) + (goals*5) + (own_goals*-3) + (y_cards*-1) + (r_cards*-3) + (bonus) + (penalty_miss*-3) + (Math.floor(goals_conceded*-0.5)));
                    score = ((Math.floor(minutes/30)) + (assists*3) + (goals*5) + (own_goals*-3) + (y_cards*-1) + (r_cards*-3) + (bonus) + (penalty_miss*-3) + (Math.floor(goals_conceded*-0.5)));
                    break;
                }
        }
        let configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                minutes: joiner.minutes,
                assists: joiner.assists,
                goals: joiner.goals,
                own_goals: joiner.own_goals,
                y_cards: joiner.y_cards,
                r_cards: joiner.r_cards,
                bonus: joiner.bonus,
                penalty_miss: joiner.penalty_miss,
                goals_conceded: joiner.goals_conceded,
                total_points: score,
                player_id: joiner.player_id,
                gameweek_id: joiner.gameweek_id
            })
        };
        return fetch(`http://localhost:3000/player_gameweek_joiners`, configObj)
        .then(res=>res.json());
    } catch(e) {
        showMessage({
            message: "Fail: Network Issue, please try again later",
            type: "danger"
          });
        console.warn(e);
    }
}

export const fetchPGJoinersFromUserIdAndGameweekId = (userId, gameweekId) => {
    return fetch(`http://localhost:3000/users/${userId}/${gameweekId}/pg_joiners`)
    .then(res=>res.json())
}

export const fetchAllPGJoinersFromGameweekId = (gameweekId) => {
    return fetch(`http://localhost:3000/player_gameweek_joiners/by_gw/${gameweekId}`)
    .then(res=>res.json())
}


// USER-GAMEWEEK JOINERS

export const postUGJoiner = async(userId, gameweekId) => {

    let PGJoiners = await fetchPGJoinersFromUserIdAndGameweekId(userId, gameweekId);
    let score = 0;
    for (let i=0;i<PGJoiners.length;i++) {
        let pu_joiner = await fetchPlayerUserJoinerByUserIdAndPlayerId(userId, PGJoiners[i].player_id)
        if (!pu_joiner.sub) {
            score += PGJoiners[i].total_points
        }
    }
    let configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            total_points: score,
            user_id: userId,
            gameweek_id: gameweekId
        })
    };
    await fetch(`http://localhost:3000/user_gameweek_joiners`, configObj)
    .then(res=>res.json())
}

export const fetchUGJoiner = (userId, gameweekId) => {
    return fetch(`http://localhost:3000/user_gameweek_joiners/${userId}/${gameweekId}`)
    .then(res=>res.json())
}

export const fetchUGJoiners = (auId, gameweekId) => {
    console.log(auId);
    console.log(gameweekId);
    return fetch(`http://localhost:3000/admin_users/ug_joiners/${auId}/${gameweekId}`)
    .then(res=>res.json())
}


// MESSAGES

export const postMessage = (name, email, msg) => {
    let configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            name,
            email,
            msg
        })
    };
    return fetch('http://localhost:3000/messages', configObj)
    .then(res=>res.json())
}
