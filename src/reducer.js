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
        default: {
            return state;
        }
    }   
}