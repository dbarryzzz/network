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
        case actions.UPDATE_EPISODE_ARRAY: {
            var updatedIds = action.updatedEpisodeArray.map((e) => e.episodeId);
            return {
                ...state,
                episodes: state.episodes
                    .filter((ep) => !updatedIds.includes(ep.episodeId))
                    .concat(action.updatedEpisodeArray),
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
        case actions.UPDATE_SERIES_ARRAY: {
            var updatedSeriesIds = action.updatedSeriesArray.map((s) => s.id);
            return {
                ...state,
                episodes: state.allSeries
                    .filter((s) => !updatedSeriesIds.includes(s.id))
                    .concat(action.updatedSeriesArray),
            }
        }
        default: {
            return state;
        }
    }   
}