import { createSlice } from '@reduxjs/toolkit';

const librarySlice = createSlice({
    name: 'library',
    initialState: {
        songs: [],
    },
    reducers: {
        addSong: (state, action) => {
            // Verifica si la canción ya existe
            if (!state.songs.some(song => song.songid === action.payload.songid)) {
                state.songs.push(action.payload); // Agrega la canción si no existe
            }
        },
        removeSong: (state, action) => {
            state.songs = state.songs.filter(song => song.songid !== action.payload.songid);
        }
    }
})

export const {addSong, removeSong} = librarySlice.actions;
const {reducer: songsReducer} = librarySlice;
export default songsReducer;