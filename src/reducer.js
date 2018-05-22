import * as actions from "./actions";


export default function reducer(state={
    episodes : [ ],
    gameInfo: {}
}, action) {
    // case statements here
    console.log(action);
    switch (action.type){
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
        case actions.INIT_GAME: {
            return {
                ...state,
                gameInfo: action.gameInfo,
            }
        }
        default: {
            return state;
        }
    }   
}