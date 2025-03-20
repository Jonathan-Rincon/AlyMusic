import React from 'react';
import Song from '../Song/Song';
import "./styles.css";

const SearchResults = ({ songs, addSong, songDetails, children }) => {
    // Función para formatear la duración en milisegundos a "minutos:segundos"
    const formatDuration = (milliseconds) => {
        const totalSeconds = Math.floor(milliseconds / 1000); // Convertir milisegundos a segundos
        const minutes = Math.floor(totalSeconds / 60); // Obtener los minutos
        const seconds = totalSeconds % 60; // Obtener los segundos restantes
        return `${minutes}:${seconds.toString().padStart(2, '0')}`; // Formato MM:SS
    };

    return (
        <div className="search-results">
            <div> 
                <h2 className="search-results__title">Resultados Encontrados</h2>
            </div>
            <div className="search-results__children">
                {children}
            </div>
            <div className="search-results__list">
                {songs.map((song) => (
                    <Song 
                        key={song.idTrack}
                        idTrack={song.idTrack}
                        songTitle={song.strTrack}
                        songAuthor={song.strArtist}
                        songAlbum={song.strAlbum}
                        songDuration={formatDuration(song.intDuration)}
                        addSong={addSong}
                    />
                ))}
            </div>
        </div>
    );
};

export default SearchResults;
