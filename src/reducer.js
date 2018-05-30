import * as actions from "./actions";


export default function reducer(state={
    episodes : [],
    allSeries: {byId: {}},
    weekInfo: {id: null, episodes: []},
    gameInfo: {}
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
        default: {
            return state;
        }
    }   
}