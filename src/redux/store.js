import { configureStore } from '@reduxjs/toolkit';
import libraryReducer from '../redux/slices/librarySlice';
import searchReducer from '../redux/slices/searchSlice';

// Configurar el store con los reducers combinados
const store = configureStore({
    reducer: {
        library: libraryReducer, // Reducer de librarySlice
        search: searchReducer,  // Reducer de searchSlice
    },
});

export default store;
