import React, { useState, useEffect} from "react";
import Header from "./components/Header/Header";
import "./components/Song/song.css";
import ListSongs from "./components/ListSongs";
import SearchResults from "./components/SearchResults";
import LibraryMusic from "./components/LibraryMusic";
import "./styles.css";


function App() {
    
    const [listSongs, setListSongs] = useState(() =>{
          const songList = new ListSongs();
          return songList.getSongs();
    });//Cargamos las canciones directamente desde una base de datos del archivo ListSongs.js

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
    <div className="App">
      <Header appName="AlyMusic"></Header>
      <div className="main-split">
        <LibraryMusic songsSaved={songsAdded}/>
        <SearchResults songs={listSongs} addSong={addSongToLibrary}/>
      </div>
    </div>
  )
}

export default App;


