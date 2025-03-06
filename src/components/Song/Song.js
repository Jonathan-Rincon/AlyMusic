import React  from 'react';
import "./song.css";

const Song = ({songTitle, songAuthor, songAlbum, songDuration, addSong}) => {
    return (
    <div className="song">
        <h2 className="song__titleSong">{songTitle}</h2>
        <div><span className="song__titles">Autor: </span><span className="song__contents">{songAuthor}</span></div>
        <div><span className="song__titles">Album: </span><span className="song__contents">{songAlbum}</span></div>
        <div><span className="song__titles">Duración: </span><span className="song__contents">{songDuration}</span></div>
        <div><button className="song__add" onClick={()=> addSong({songTitle, songAuthor, songAlbum, songDuration})}>Agregar a PlayList</button></div>
    </div>
    )
}
export default Song;