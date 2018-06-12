import * as actions from "./actions";


export default function reducer(state={
    allEpisodes : {byId: {}},
    allSeries: {byId: {}},
    weekInfo: {1: {id: 1, aired: false, episodes: []}},
    gameInfo: {activeWeek: 1}
}, action) {
    // case statements here
    console.log(action);
    switch (action.type){
        case actions.INIT_GAME: {
            return {
                ...state,
                gameInfo: action.gameInfo,
                weekInfo: action.initialWeekInfo,
                allSeries: {byId: Object.assign({}, state.allSeries.byId, action.seriesById)},
                allEpisodes: {byId: Object.assign({}, state.allEpisodes.byId, action.episodesById)}
            }
        }
        case actions.RUN_WEEK: {
            var currentWeekId = action.weekRun;
            var currentWeekEpisodeIds = state.weekInfo[currentWeekId].episodes;
            var currentWeek = {[currentWeekId]: {id: currentWeekId, aired: true, episodes: currentWeekEpisodeIds}};

            var nextWeekId = action.weekRun + 1;
            var nextWeekEpisodeIds = Object.keys(action.newEpisodesById);
            var nextWeek = {[nextWeekId] : {id: nextWeekId, aired: false, episodes : nextWeekEpisodeIds}};

            return {
                ...state,
                gameInfo: Object.assign({}, state.gameInfo, {totalWeeks: nextWeekId}),
                allEpisodes: {byId: Object.assign({}, state.allEpisodes.byId, action.updatedEpisodesById, action.newEpisodesById)},
                weekInfo: Object.assign({}, state.weekInfo, currentWeek, nextWeek),
                allSeries: {byId: Object.assign({}, state.allSeries.byId, action.updatedSeriesById)},
            }
        }
        case actions.CHANGE_WEEK: {
            return {
                ...state,
                gameInfo: Object.assign({}, state.gameInfo, {activeWeek: action.week})
            }
        }
        case actions.REMOVE_EPISODE: {
            const { [action.episode.id]: value, ...updatedEpisodes } = state.allEpisodes.byId;
            console.log(updatedEpisodes);
            var filteredWeekEpisodes = state.weekInfo[action.week].episodes.filter(id => id !== action.episode.id);
            console.log(filteredWeekEpisodes);
            var updatedWeek = Object.assign({}, state.weekInfo[action.week], {episodes: filteredWeekEpisodes });
            var series = state.allSeries.byId[action.episode.seriesId];
            series.episodesAired--;

            return {
                ...state,
                allEpisodes: {byId: updatedEpisodes},
                weekInfo: Object.assign({}, state.weekInfo, {[action.week]: updatedWeek}),
                allSeries: {byId: Object.assign({}, state.allSeries.byId, {[series.id]: series})},
            }
        }
        case actions.ADD_EPISODE: {
            var idsToRemove = action.removedEpisodeArray.map(e => e.id);
            // update week
            var updatedEpisodeIdArray = state.weekInfo[action.week].episodes.concat(action.episode.id);
            var updatedEpisodeIdArray = updatedEpisodeIdArray.filter(id => !idsToRemove.includes(id));
            var updatedWeek = Object.assign({}, state.weekInfo[action.week], {episodes: updatedEpisodeIdArray});

            // update all episodes 
            var allEps = Object.values(state.allEpisodes.byId).reduce((acc, ep, i) => {
                if(!idsToRemove.includes(ep.id)){
                    acc[ep.id] = state.allEpisodes.byId[ep.id];
                }
                return acc;
            }, {} ); 
            allEps[action.episode.id] = action.episode;

            // update series episode counts
            var updatedSeriesObj = {}
            var series = state.allSeries.byId[action.episode.seriesId];
            Object.assign(updatedSeriesObj, {[series.id]: Object.assign({}, series, {episodesAired: series.episodesAired + 1})});
            action.removedEpisodeArray.forEach(ep => {
                var series = state.allSeries.byId[ep.seriesId];
                Object.assign(updatedSeriesObj, {[series.id]: Object.assign({}, series, {episodesAired: series.episodesAired - 1})});
            })

            return {
                ...state,
                allEpisodes: {byId: allEps},
                allSeries: {byId: Object.assign({}, state.allSeries.byId, updatedSeriesObj)},
                weekInfo: Object.assign({}, state.weekInfo, {[action.week]: updatedWeek}),
            }
        }
        default: {
            return state;
        }
    }   
}