import * as constants from './constants';
import * as nameparts from './randomNames';

import * as RatingsService from './services/RatingsService';

export const INIT_GAME = "INIT_GAME";
export const UPDATE_EPISODES = "UPDATE_EPISODE_ARRAY";


export function initGame(){
    var playerId = constants.networks[Math.floor(Math.random() * constants.networks.length)];
    var year = 2000;
    var money = 200000;
    var activeWeek = 1;

    var gameInfo = {playerId: playerId, year: year, money: money, activeWeek: activeWeek};

    // build series/episodes
    var initialEpisodes = {};
    var initialSeries = {};
    var seriesCounter = 0;

    var duration = 0;
    var series = null;
    // generate bench
    for(var i = 0; i < 5; i++){
        duration = generateDuration(0);
        series = buildRandomSeries(playerId, seriesCounter++, duration);
        initialSeries[series.id] = series;
    }

    // generate initial schedule
    for(var d in constants.weekdays){
        var t = 0;
        while(t < constants.times.length) {
            duration = generateDuration(t);
            series = buildRandomSeries(playerId, seriesCounter++, duration);
            initialSeries[series.id] = series;

            var episode = buildEmptyEpisode(series, d, t, duration, 1, 1);
            initialEpisodes[episode.id] = episode;
            t += duration;
        }
    }

    var initialWeekInfo = {1 : {id: 1, episodes: Object.keys(initialEpisodes)} };

    return {
        type: INIT_GAME,
        gameInfo: gameInfo,
        initialWeekInfo: initialWeekInfo,
        episodesById: initialEpisodes,
        seriesById: initialSeries,
    }
}

export function runWeek(activeEpisodeArray, allSeries, week){
    var updatedEpisodes = RatingsService.runWeek(activeEpisodeArray, allSeries, week);

    return {
        type: UPDATE_EPISODES,
        updatedEpisodesById: updatedEpisodes,
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

function buildEmptyEpisode(series, dayOfWeek, time, duration, weekAired, number){
    return {seriesId: series.id, 
        number: number, 
        id: series.id + "_" + number,
        weekAired: weekAired,
        prevRating: null, 
        prevShare: null, 
        rating: null,
        share: null,
        dayOfWeek: dayOfWeek, 
        time: time, 
        duration: duration};
}

function buildRandomSeries(networkId, counter, duration){
    var id = networkId + counter;
    var firstYear = 1950 + Math.floor(Math.random() * 70);
    var episodeCount = 22;
    var seasons = Math.ceil(Math.random() * 10);
    var name = nameparts.partA[Math.floor(Math.random() * nameparts.partA.length)] 
        + nameparts.partB[Math.floor(Math.random() * nameparts.partB.length)];
    var stats = generateSeriesStats();
    return {name: name, 
        id: id, 
        year: firstYear,
        seasons: seasons,
        duration: duration,
        networkId: networkId, 
        episodeCount: episodeCount,
        stats: stats}
}

function generateSeriesStats(){
    // all on 1-100 scale
    var buzz = random1to100();  
    var awareness = random1to100();
    var fandom = Math.ceil(awareness * random1to100() / 100);  // fandom rating should always be less than general awareness

    var writing = random1to100();
    var cast = random1to100();
    var production = random1to100();

    var totalQuality = Math.floor((writing + cast + production) /3);  //TODO: weight this?
    
    var flavors = [randomFlavor(), randomFlavor(), randomFlavor()];

    return{
        buzz: buzz,
        awareness: awareness,
        fandom: fandom,
        writing: writing,
        cast: cast,
        production: production,
        totalQuality: totalQuality,
        flavors: flavors
    };
}

function random1to100(){
    return Math.ceil(Math.random() * 100);
}

function randomFlavor(){
    var icon = constants.flavorIcons[(Math.floor(Math.random() * constants.flavorIcons.length))];
    var color = constants.flavorColors[(Math.floor(Math.random() * constants.flavorColors.length))];

    return {icon: icon, color: color};
}

