import React from "react";
import Song from "../Song/Song";
import { SearchResultsContainer, SearchResultsTitle, SearchResultsChildren, SearchResultsList, SongDuration} from "./styles.js";


const SearchResults = ({ songs, children }) => {
  // Función para formatear la duración en milisegundos a "minutos:segundos"
  const formatDuration = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000); // Convertir milisegundos a segundos
    const minutes = Math.floor(totalSeconds / 60); // Obtener los minutos
    const seconds = totalSeconds % 60; // Obtener los segundos restantes
    return `${minutes}:${seconds.toString().padStart(2, "0")}`; // Formato MM:SS
  };




  return (
    <SearchResultsContainer>
      <div>
        <SearchResultsTitle>Resultados Encontrados</SearchResultsTitle>
      </div>
      <SearchResultsChildren>{children}</SearchResultsChildren>
      <SearchResultsList>
        {songs.map((song) => {
        const isLong = song.intDuration / 1000 / 60 > 5; // Determinar si la duración es mayor a 5 minutos
        return (
          <Song
            key={song.idTrack}
            idTrack={song.idTrack}
            songTitle={song.strTrack}
            songAuthor={song.strArtist}
            songAlbum={song.strAlbum}
            songDuration={
              <SongDuration isLong={isLong}>
                {formatDuration(song.intDuration)}
              </SongDuration>
            }
          />
        )})}
      </SearchResultsList>
    </SearchResultsContainer>
  );
};

export default SearchResults;
