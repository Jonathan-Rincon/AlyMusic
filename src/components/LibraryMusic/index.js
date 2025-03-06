import React from 'react';
import "./styles.css";

const LibraryMusic = ({songsSaved}) => {
    return (
        <div className="library-list"> 
        <h2 className="library__title">Mi Bibloteca</h2>
        {songsSaved.map((song, index) => (
            <div className="songSaved" key={index}>
            <span className="songSaved__titleSong">{song.songTitle}</span>
            <div><span className="songSaved__titles">Autor: </span><span className="songSaved__contents">{song.songAuthor}</span></div>
            <div><span className="songSaved__titles">Album: </span><span className="songSaved__contents">{song.songAlbum}</span></div>
            <div><span className="songSaved__titles">Duración: </span><span className="songSaved__contents">{song.songDuration}</span></div>
            </div>
        ))}
        </div>
    )
}

export default LibraryMusic;