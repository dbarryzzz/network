import * as constants from './constants';
import * as nameparts from './randomNames';

export const ADD_EPISODE = "ADD_EPISODE";
export const ADD_EPISODE_ARRAY = "ADD_EPISODE_ARRAY";
export const INIT_GAME ="INIT_GAME";

export function initGame(){
    var playerId = constants.networks[Math.floor(Math.random() * constants.networks.length)];
    var year = 2000;
    var money = 200000;
    var activeWeek = 1;

    var gameInfo = {playerId: playerId, year: year, money: money, activeWeek: activeWeek};

    return {
        type: INIT_GAME,
        gameInfo: gameInfo,
    }
}

export function buildWholeNetwork(){
    var networkId = constants.networks[Math.floor(Math.random() * constants.networks.length)];
    var episodeList = [];
    for(var d in constants.weekdays){
        var t = 0;
        while(t < constants.times.length) {
            var series = buildRandomSeries(networkId);
            var duration = generateDuration(t);

            var episode = buildEmptyEpisode(series, d, t, duration);
            episodeList.push(episode);
            t += duration;
        }
    }
    return {
        type: ADD_EPISODE_ARRAY,
        episodeArray: episodeList
    }

}

function generateDuration(t){
    // the 8pm and 9pm blocks can be divided in 1 unit duration, others 2 for now
    // 1 duration unit == 30 minutes
    if(t === 0 || t === 2){
        return Math.ceil(Math.random() * 2);
    }else if (t === 1 || t === 3){
        return 1;
    }else{
        return 2;
    }
}

function buildEmptyEpisode(series, dayOfWeek, time, duration){
    return {series: series, number: series.episodes, prevRating: null, prevShare: null, dayOfWeek: dayOfWeek, time: time, duration: duration};
}

function buildRandomSeries(networkId){
    var firstYear = 1950 + Math.floor(Math.random() * 70);
    var episodes = 0;
    var name = nameparts.partA[Math.floor(Math.random() * nameparts.partA.length)] 
        + nameparts.partB[Math.floor(Math.random() * nameparts.partB.length)];
    console.log(name);
    return {name: name, year: firstYear, networkId: networkId, episodes: episodes}
}

