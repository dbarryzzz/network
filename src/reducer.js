import * as actions from "./actions";


export default function reducer(state={
    episodes : [],
    allSeries: [],
    gameInfo: {}
}, action) {
    // case statements here
    console.log(action);
    switch (action.type){
        case actions.INIT_GAME: {
            return {
                ...state,
                gameInfo: action.gameInfo,
                allSeries: state.allSeries.concat(action.seriesArray),
                episodes: state.episodes.concat(action.episodeArray)
            }
        }
        case actions.ADD_EPISODE: {
            return {
                ...state,
                episodes: state.episodes.concat(action.newEpisode),
            }
        }
        case actions.ADD_EPISODE_ARRAY: {
            return {
                ...state,
                episodes: state.episodes.concat(action.episodeArray),
            }
        }
        case actions.ADD_SERIES:{
            return {
                ...state,
                allSeries: state.allSeries.concat(action.series),
            }
        }
        case actions.ADD_SERIES_ARRAY:{
            return {
                ...state,
                allSeries: state.allSeries.concat(action.seriesArray),
            }
        }
        default: {
            return state;
        }
    }   
}