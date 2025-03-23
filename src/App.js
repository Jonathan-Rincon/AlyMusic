import React, { useState, useEffect} from "react";
import Header from "./components/Header/Header";
import SearchResults from "./components/SearchResults";
import LibraryMusic from "./components/LibraryMusic";
import "./styles.css";
import { Routes, Route } from "react-router-dom";
import SearchBar from "./components/SearchBar";
import useFetch from "./hooks/useFetch";
import axios from 'axios';
import SongDetail from "./components/SongDetail";
import { ThemeProvider } from "styled-components";
import Theme from "./theme";
import GlobalStyles from "./theme/GlobalStyles";



function App() {

  const [form, setForm] = useState({artistSearched:''});
  const [searchSinger, setSearchSinger] = useState('');
  const [albums, setAlbums] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [artistIds, setArtistIds] = useState([]);
  const [albumIds, setAlbumIds] = useState([]);
  const [reload, setReload] = useState(0); 
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  


  // Obtener id del cantante
  const { data: artists, isLoading: loadingArtists, error: errorArtists } = useFetch(
    `https://www.theaudiodb.com/api/v1/json/2/search.php?s=${searchSinger}`,
    reload
  );

  // Obtener los IDs de los cantantes cuando `artists` esté disponible
  useEffect(() => {
    if (artists?.artists) {
        const ids = artists.artists.map((artist) => artist.idArtist);
        setArtistIds(ids);
    }
    else {
      // Limpia los estados si no se encontraró el cantante
        setArtistIds([]);
        setAlbums([]);
        setTracks([]);
        setListSongs([]);
    }
  }, [artists]);

  // Obtener álbumes basados en los IDs de los artistas
  useEffect(() => {
    const fetchAlbums = async () => {
      setTracks([]);
      setAlbums([]);
      if (artistIds.length > 0) {
        try {
          const albumPromises = artistIds.map((idArtist) =>
            axios.get(`https://www.theaudiodb.com/api/v1/json/2/album.php?i=${idArtist}`)
          );
          const albumResponses = await axios.all(albumPromises);
          const allAlbums = albumResponses.flatMap((res) => res.data.album || []);
          setAlbums(allAlbums);

          // Extraer los IDs de los álbumes para luego obtener canciones
          const albumIds = allAlbums.map((album) => album.idAlbum);
          setAlbumIds(albumIds);
        } catch (error) {
          console.error("Error al obtener álbumes:", error);
          setTracks([]);
          setAlbums([]);
        }
      }
      else{
        setTracks([]);
        setAlbums([]);
      }
    };

    fetchAlbums();
  }, [artistIds]);

  // Obtener canciones basadas en los IDs de los álbumes
  useEffect(() => {
    const fetchTracks = async () => {
      setIsDataLoaded(false); 
      if (albumIds.length > 0) {
        try {
          const trackPromises = albumIds.map((idAlbum) =>
            axios.get(`https://www.theaudiodb.com/api/v1/json/2/track.php?m=${idAlbum}`)
          );
          const trackResponses = await axios.all(trackPromises);
          const allTracks = trackResponses.flatMap((res) => res.data.track || []);
          setTracks(allTracks);
        } catch (error) {
          console.error("Error al obtener canciones:", error);
          setTracks([]);
        }
          finally {
            setIsDataLoaded(true); // Indica que los datos están listos
          }
      }
      else {
        setTracks([]); // Limpia las canciones si no hay álbumes
        setIsDataLoaded(true);
      }
    };

    fetchTracks();
  }, [albumIds]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchSinger(form.artistSearched);
    console.log("Artista buscado:", form.artistSearched);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") { 
      e.preventDefault();
      handleSubmit(e); 
    }
  };
    const [listSongs, setListSongs] = useState([]);
    // Sincronizar listSongs con tracks
    useEffect(() => {
      if (isDataLoaded && tracks.length > 0) {
        setListSongs(tracks); // Actualizar listSongs cuando los datos estén cargados
      } else if (isDataLoaded) {
        setListSongs([]); // Limpiar listSongs si no hay tracks y la carga terminó
      }
    }, [isDataLoaded, tracks]);
    
    useEffect(() => {
      if (errorArtists || !artists?.artists) {
        setListSongs([]); // Limpia listSongs si ocurre un error o no hay resultados
      }
    }, [errorArtists, artists]);

    const [songsAdded, setSongsAdded] = useState([]);//vacío inicialmente

    const addSongToLibrary = (song) => {
      setSongsAdded((prev) => {
          if (!prev.some((s) => s.songTitle === song.songTitle)) //investigué sobre como hacer para que no se repita la cancion en la bibloteca
            {
              return [...prev, song];
          }
          return prev;
      });
    };
    useEffect(() => {
      if(songsAdded.length >0){ //comprueba que al menos haya una cancion agregada a la playlist, sino la agrega directamente
          const songAdded = songsAdded[songsAdded.length -1];//definimos una variable que nos traera la ultima cancion usando el index (por eso se evalua el largo y se resta 1)
          console.log(`Se ha agregado "${songAdded.songTitle}" a la bibloteca`);//habiendo identificado la ultima cancion, extraemos el parametro songTitle y lo mostramos.
        }
    },[songsAdded]);

  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyles />
    <div className="App">
      <Routes>
        <Route path="/"
        element={
          <>
          <Header appName="AlyMusic"></Header>
            <SearchBar form={form} handleInputChange={handleInputChange} handleSubmit={handleSubmit} handleKeyDown={handleKeyDown}/>
          <div className="main-split">
            <LibraryMusic songsSaved={songsAdded}/>
            {/* Verifica primero que la carga esté completa antes de renderizar SearchResults */}
            {!loadingArtists && isDataLoaded ? (
              <SearchResults songs={listSongs} addSong={addSongToLibrary}>
                {/* Mostrar "Cargando canciones..." mientras isLoading sea true */}
                {loadingArtists && <p>Cargando canciones...</p>}

                {/* Mostrar mensaje de error solo si hay un error */}
                {errorArtists && (
                  <div>
                    <p>
                      Error al cargar canciones: {errorArtists.response?.status === 404
                        ? "Artista no encontrado."
                        : errorArtists.message || "Ocurrió un error inesperado."}
                    </p>
                    <button 
                      onClick={() => {
                        setReload((prev) => prev + 1);
                        setAlbums([]);
                        setTracks([]);
                        setListSongs([]);
                        setArtistIds([]);
                      }}
                    >
                      Realiza nuevamente la búsqueda
                    </button>
                  </div>
                )}

                {/* Mostrar mensaje "No se encontraron canciones" solo si la búsqueda no es vacía, la carga terminó, y no hay canciones */}
                {!loadingArtists && !errorArtists && artists?.artists && searchSinger.trim() !== "" && listSongs.length === 0 && (
                  <p>No se encontraron canciones para el artista "{searchSinger}".</p>
                )}

                {/* Mostrar mensaje "No se encontraron artistas" solo si isLoading es false y no hay artistas */}
                {!loadingArtists && !errorArtists && searchSinger.trim() !== "" && (!artists?.artists || artists.artists.length === 0) && (
                  <p>No se encontraron artistas con el nombre "{searchSinger}".</p>
                )}
              </SearchResults>
            ) : (
              <p>Cargando información...</p> // Mostrar mensaje genérico mientras se carga todo
            )}
          </div>
          </>
        } 
        />
        <Route path="/song/:songId" element={<SongDetail />}></Route>
      </Routes>
    </div>
    </ThemeProvider>  
  )
}
export default App;




