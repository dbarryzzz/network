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

export function addRandomEpisode(){
    var totalViewers = 80;  
    var rating = (Math.random() * 100).toFixed(1);
    var share = (rating * 100 / totalViewers).toFixed(1);
    var series = getRandomSeries();
    var dayOfWeek = Math.floor(Math.random() * constants.weekdays.length);
    var time = Math.floor(Math.random() * constants.times.length);
    var episode = {series: series, number: series.episodes, prevRating: rating, prevShare: share, dayOfWeek: dayOfWeek, time: time};
    return {
        type: ADD_EPISODE,
        newEpisode: episode,
    }
}

export function buildWholeNetwork(){
    var networkId = constants.networks[Math.floor(Math.random() * constants.networks.length)];
    var episodeList = [];
    for(var d in constants.weekdays){
        for(var t in constants.times){
            var series = buildRandomSeries(networkId);
            var episode = buildEmptyEpisode(series, d, t);
            episodeList.push(episode);
        }
    }
    return {
        type: ADD_EPISODE_ARRAY,
        episodeArray: episodeList
    }

}


function buildEmptyEpisode(series, dayOfWeek, time){
    return {series: series, number: series.episodes, prevRating: null, prevShare: null, dayOfWeek: dayOfWeek, time: time};
}

// var cheers = {name: "Cheers", year: 1981, network:  "NBC", episodes: 0}
// var friends = {name: "Friends", year: 1995, network: "NBC", episodes: 0 }
// var buffy = {name: "Buffy the Vampire Slayer", year: 1999, network : "WB", episodes: 0}
//let seriesList = [cheers, friends, buffy];

function getRandomSeries() {
    //var seriesCount = seriesList.length;
    // var id = Math.floor(Math.random() * seriesCount);
    // var randomSeries = seriesList[id];
    var randomSeries = buildRandomSeries();
    randomSeries.episodes++;
    return randomSeries;
}

function buildRandomSeries(networkId){
    var firstYear = 1950 + Math.floor(Math.random() * 70);
    var episodes = 0;
    var name = nameparts.partA[Math.floor(Math.random() * nameparts.partA.length)] 
        + nameparts.partB[Math.floor(Math.random() * nameparts.partB.length)];
    console.log(name);
    return {name: name, year: firstYear, networkId: networkId, episodes: episodes}
}

