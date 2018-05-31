import * as actions from "./actions";


export default function reducer(state={
    allEpisodes : {byId: {}},
    allSeries: {byId: {}},
    weekInfo: {1: {id: 1, episodes: []}},
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
        case actions.UPDATE_EPISODES: {
            return {
                ...state,
                allEpisodes: {byId: Object.assign({}, state.allEpisodes.byId, action.updatedEpisodesById)}
            }
        }
        default: {
            return state;
        }
    }   
}