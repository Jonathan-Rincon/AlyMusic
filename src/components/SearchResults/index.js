import React from 'react';
import Song from '../Song/Song';
import "./styles.css";


const SearchResults = ({songs, addSong}) => {
    return (
        <div className="main">
            <div> 
                <h2 className="search__title">Resultados Encontrados</h2>
            </div>
            <div className="listsongs">
            {songs.map((song, id) => (
                <Song 
                key={id}
                songTitle={song.songTitle}
                songAuthor={song.songAuthor}
                songAlbum={song.songAlbum}
                songDuration={song.songDuration}
                addSong={addSong}
                />
            ))}
            </div>
        </div>
    )
}
export default SearchResults;