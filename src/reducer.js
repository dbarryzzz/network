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

            var nextWeekId = ++action.weekRun;
            var nextWeekEpisodeIds = Object.keys(action.newEpisodesById);
            var nextWeek = {[nextWeekId] : {id: nextWeekId, aired: false, episodes : nextWeekEpisodeIds}};

            return {
                ...state,
                gameInfo: Object.assign({}, state.gameInfo, {totalWeeks: nextWeekId}),
                allEpisodes: {byId: Object.assign({}, state.allEpisodes.byId, action.updatedEpisodesById, action.newEpisodesById)},
                weekInfo: Object.assign({}, state.weekInfo, currentWeek, nextWeek),
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
            var updatedWeek = Object.assign({}, state.weekInfo[action.week], {episodes: filteredWeekEpisodes })
            return {
                ...state,
                allEpisodes: {byId: updatedEpisodes},
                weekInfo: Object.assign({}, state.weekInfo, {[action.week]: updatedWeek}),
            }
        }
        default: {
            return state;
        }
    }   
}