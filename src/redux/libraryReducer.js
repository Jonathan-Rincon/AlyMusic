
import { combineReducers } from "redux";

const initialState = {
    songs: []
};

const songsReducer = (state = initialState, action) => {
    switch(action.type){
        case "ADD_SONG":
            if (state.songs.some(song => song.songid === action.payload.songid)) { //para no agregarla repetida
                return state; 
            }
            return {
                ...state,
                songs: [...state.songs, action.payload]
            };
        case "REMOVE_SONG":
            return {
                ...state,
                songs: state.songs.filter(song => song.songid !== action.payload)
            };
            default:
                return state;
    }

}
const rootReducer = combineReducers({
    songs: songsReducer
  });
  
export default rootReducer;


