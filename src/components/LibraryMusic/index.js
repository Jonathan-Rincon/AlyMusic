import React from 'react';
import { LibraryList, LibraryTitle, LibrarySongSaved, LibrarySongSavedTitleSong, LibrarySongSavedTitles, LibrarySongSavedContents } from './styles';

const LibraryMusic = ({songsSaved}) => {
    return (
        <LibraryList> 
        <LibraryTitle>Mi Bibloteca</LibraryTitle>
        {songsSaved.map((song, index) => (
            <LibrarySongSaved key={index}>
            <LibrarySongSavedTitleSong>{song.songTitle}</LibrarySongSavedTitleSong>
            <div><LibrarySongSavedTitles>Autor: </LibrarySongSavedTitles><LibrarySongSavedContents>{song.songAuthor}</LibrarySongSavedContents></div>
            <div><LibrarySongSavedTitles>Album: </LibrarySongSavedTitles><LibrarySongSavedContents className="songSaved__contents">{song.songAlbum}</LibrarySongSavedContents></div>
            <div><LibrarySongSavedTitles>Duración: </LibrarySongSavedTitles><LibrarySongSavedContents className="songSaved__contents">{song.songDuration}</LibrarySongSavedContents></div>
            </LibrarySongSaved>
        ))}
        </LibraryList>
    )
}

export default LibraryMusic;