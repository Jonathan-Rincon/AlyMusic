import React from 'react';
import "./song.css";
import { Link } from 'react-router-dom';

const Song = ({ idTrack, songTitle, songAuthor, songAlbum, songDuration, addSong }) => {
    return (
        <div className="song-card" key={idTrack}>
            <h2 className="song-card__title">{songTitle}</h2>
            <div className="song-card__info">
                <p><span className="song-card__label">Autor:</span> {songAuthor}</p>
                <p><span className="song-card__label">Álbum:</span> {songAlbum}</p>
                <p><span className="song-card__label">Duración:</span> {songDuration}</p>
            </div>
            <div className="song-card__actions">
                <button 
                    className="song-card__button" 
                    onClick={() => addSong({ songTitle, songAuthor, songAlbum, songDuration })}
                >
                    Agregar a PlayList
                </button>
                <Link to={`/song/${idTrack}`} className="song-card__link">Ver Detalles</Link>
            </div>
        </div>
    );
};

export default Song;
