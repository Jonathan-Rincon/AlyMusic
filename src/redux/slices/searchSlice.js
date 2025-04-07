import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk asíncrono para buscar canciones
export const fetchSongs = createAsyncThunk(
    'search/fetchSongs',
    async (searchSinger, { rejectWithValue }) => {
        try {
            // Paso 1: Obtener los artistas
            const artistsResponse = await axios.get(
                `https://www.theaudiodb.com/api/v1/json/2/search.php?s=${searchSinger}`
            );
            const artists = artistsResponse.data.artists;

            if (!artists) {
                return { results: [], message: 'No se encontraron artistas.' };
            }

            // Extraer los IDs de los artistas
            const artistIds = artists.map((artist) => artist.idArtist);

            // Paso 2: Obtener los álbumes basados en los IDs de los artistas
            const albumPromises = artistIds.map((idArtist) =>
                axios.get(`https://www.theaudiodb.com/api/v1/json/2/album.php?i=${idArtist}`)
            );
            const albumResponses = await axios.all(albumPromises);
            const allAlbums = albumResponses.flatMap((res) => res.data.album || []);

            if (allAlbums.length === 0) {
                return { results: [], message: 'No se encontraron álbumes.' };
            }

            // Extraer los IDs de los álbumes
            const albumIds = allAlbums.map((album) => album.idAlbum);

            // Paso 3: Obtener las canciones basadas en los IDs de los álbumes
            const trackPromises = albumIds.map((idAlbum) =>
                axios.get(`https://www.theaudiodb.com/api/v1/json/2/track.php?m=${idAlbum}`)
            );
            const trackResponses = await axios.all(trackPromises);
            const allTracks = trackResponses.flatMap((res) => res.data.track || []);

            if (allTracks.length === 0) {
                return { results: [], message: 'No se encontraron canciones.' };
            }

            // Devolver todas las canciones
            return { results: allTracks, message: 'Canciones encontradas.' };
        } catch (error) {
            return rejectWithValue(error.message || 'Error al buscar canciones.');
        }
    }
);

// Slice de búsqueda
const searchSlice = createSlice({
    name: 'search',
    initialState: {
        results: [], // Array para canciones
        loading: false, // Indica si está cargando
        error: null, // Mensaje de error
        message: '', // Mensaje descriptivo del estado
    },
    reducers: {
        resetResults: (state) => {
            state.results = []; // Reiniciar los resultados
            state.message = ''; // Limpia el mensaje
            state.error = null; // Limpia errores
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSongs.pending, (state) => {
                state.loading = true; // Cambiar loading a true
                state.error = null; // Limpiar cualquier error previo
                state.message = 'Cargando...'; // Mensaje temporal
            })
            .addCase(fetchSongs.fulfilled, (state, action) => {
                state.results = action.payload.results; // Guardar canciones encontradas
                state.loading = false; // Cambiar loading a false
                state.message = action.payload.message; // Mensaje del resultado
            })
            .addCase(fetchSongs.rejected, (state, action) => {
                state.error = action.payload || 'Error desconocido'; // Guardar el mensaje de error
                state.loading = false; // Cambiar loading a false
                state.message = 'Hubo un problema al buscar las canciones.';
            });
    },
});

// Exportar acciones y reducer
export const { resetResults } = searchSlice.actions;
export default searchSlice.reducer;
