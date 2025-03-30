import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeSong } from '../../redux/actions';
import { LibraryList, LibraryTitle, LibrarySongSaved, LibrarySongSavedTitleSong, LibrarySongSavedTitles, LibrarySongSavedContents, RemoveButton } from './styles';

const LibraryMusic = () => {

    const dispatch = useDispatch();
    const songsSaved = useSelector(state => state.songs.songs || []);
    const handleRemoveSong = (id) => {
        dispatch(removeSong(id)); // Despacha la acción
    };
    
    return (
        <LibraryList> 
        <LibraryTitle>Mi Bibloteca</LibraryTitle>
        {songsSaved.map((song) => (
            <LibrarySongSaved key={song.songid}>
            <LibrarySongSavedTitleSong>{song.songTitle}</LibrarySongSavedTitleSong>
            <div><LibrarySongSavedTitles>Autor: </LibrarySongSavedTitles><LibrarySongSavedContents>{song.songAuthor}</LibrarySongSavedContents></div>
            <div><LibrarySongSavedTitles>Album: </LibrarySongSavedTitles><LibrarySongSavedContents className="songSaved__contents">{song.songAlbum}</LibrarySongSavedContents></div>
            <div><LibrarySongSavedTitles>Duración: </LibrarySongSavedTitles><LibrarySongSavedContents className="songSaved__contents">{song.songDuration}</LibrarySongSavedContents></div>
            <RemoveButton onClick={() => handleRemoveSong(song.songid)}>Eliminar</RemoveButton>
            </LibrarySongSaved>
        ))}
        </LibraryList>
    )
}

export default LibraryMusic;