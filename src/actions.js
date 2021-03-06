import * as constants from './constants';

import * as RatingsService from './services/RatingsService';
import * as SeriesService from './services/SeriesService';

export const INIT_GAME = "INIT_GAME";
export const UPDATE_BOARD ="UPDATE_BOARD";
export const UPDATE_EPISODES = "UPDATE_EPISODE_ARRAY";
export const RUN_WEEK = "RUN_WEEK";
export const CHANGE_WEEK = "CHANGE_WEEK";
export const REMOVE_EPISODE = "REMOVE_EPISODE";
export const ADD_EPISODE = "ADD_EPISODE";


export function initGame(playerId, year, numOpponents){
    var playerId = constants.networks[Math.floor(Math.random() * constants.networks.length)];
    var year = 2000;
    var money = 200000;
    var activeWeek = 1;

    var gameInfo = {playerId: playerId, year: year, money: money, activeWeek: activeWeek, totalWeeks: 1};

    // build series/episodes
    var initialEpisodes = {};
    var initialSeries = {};
    var seriesCounter = 0;

    var duration = 0;
    var series = null;
    // generate bench
    for(var i = 0; i < 5; i++){
        duration = generateDuration(0);
        series = SeriesService.buildRandomSeries(playerId, seriesCounter++, duration);
        initialSeries[series.id] = series;
    }

    // generate initial schedule
    for(var d in constants.weekdays){
        var t = 0;
        while(t < constants.times.length) {
            duration = generateDuration(t);
            series = SeriesService.buildRandomSeries(playerId, seriesCounter++, duration);
            initialSeries[series.id] = series;

            var episode = buildEmptyEpisode(series.id, d, t, duration, 1, 1);
            series.episodesAired++;
            initialEpisodes[episode.id] = episode;
            t += duration;
        }
    }

    var initialWeekInfo = {1 : {id: 1, aired: false, episodes: Object.keys(initialEpisodes)} };

    return {
        type: INIT_GAME,
        gameInfo: gameInfo,
        initialWeekInfo: initialWeekInfo,
        episodesById: initialEpisodes,
        seriesById: initialSeries,
    }
}

export function updateBoard(newBoard){
    return {
        type: UPDATE_BOARD,
        newBoard: newBoard
    }
}

export function runWeek(activeEpisodeArray, allSeries, week){
    var updatedEpisodes = RatingsService.runWeek(activeEpisodeArray, allSeries, week);
    var updatedSeriesById = {};
    
    // TODO: update series stats

    // build the next week
    var newEpisodes = {};
    Object.values(updatedEpisodes).forEach(ep => {
        var newEp = buildEmptyEpisode(ep.seriesId, ep.dayOfWeek, ep.time, ep.duration, ep.weekAired + 1, ep.number + 1);
        newEp.prevRating = ep.rating;
        newEp.prevShare = ep.share;

        newEpisodes[newEp.id] = newEp;

        var series = allSeries[ep.seriesId];
        updatedSeriesById[series.id] = Object.assign({}, series, {episodesAired: series.episodesAired + 1});
    });

    return {
        type: RUN_WEEK,
        weekRun: week,
        updatedEpisodesById: updatedEpisodes,
        newEpisodesById: newEpisodes,
        updatedSeriesById: updatedSeriesById,
    }
}

export function changeWeek(newWeek){
    return {
        type: CHANGE_WEEK,
        week: newWeek,
    }
}

export function removeEpisode(episode, week){
    return {
        type: REMOVE_EPISODE,
        episode: episode,
        week: week,
    }
}

export function addEpisode(series, week, day, time, fullWeekEpisodes){
    // add new episode
    var newEpisode = buildEmptyEpisode(series.id, day, time, series.duration, week, series.episodesAired + 1);
    // TODO:  remove episode
    var removedEpisodeArray = [];
    var dailyEpisodes = fullWeekEpisodes.filter(e => e.dayOfWeek == day);
    dailyEpisodes.forEach(e => {
        if(!(
            ( (e.time + e.duration) <= newEpisode.time )
            || 
            (e.time >= (newEpisode.time + newEpisode.duration))
            )){
                removedEpisodeArray.push(e);
        }
    });

    return {
        type: ADD_EPISODE,
        episode: newEpisode,
        removedEpisodeArray: removedEpisodeArray, 
        week: week
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

function buildEmptyEpisode(seriesId, dayOfWeek, time, duration, weekAired, number){
    return {seriesId: seriesId, 
        number: number, 
        id: seriesId + "_" + number,
        weekAired: weekAired,
        prevRating: null, 
        prevShare: null, 
        rating: null,
        share: null,
        dayOfWeek: dayOfWeek, 
        time: time, 
        duration: duration};
}