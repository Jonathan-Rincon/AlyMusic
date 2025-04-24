import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeSong } from '../../redux/slices/librarySlice'; // Asegúrate de que el nombre de la acción sea correcto
import {
  LibraryList,
  LibraryTitle,
  LibrarySongSaved,
  LibrarySongSavedTitleSong,
  LibrarySongSavedTitles,
  LibrarySongSavedContents,
  RemoveButton,
} from './styles';

const LibraryMusic = () => {
  const dispatch = useDispatch();

  // Accede a las canciones almacenadas en librarySlice
  const songsSaved = useSelector((state) => state.library.songs || []);

  // Función para manejar la eliminación de una canción
  const handleRemoveSong = (id) => {
    dispatch(removeSong({ songid: id })); // Despacha la acción removeSong con el ID de la canción
  };

  return (
    <LibraryList>
      <LibraryTitle>Mi Biblioteca</LibraryTitle>
      {songsSaved.length === 0 ? (
        <p>No hay canciones en tu biblioteca</p> // Mensaje si no hay canciones
      ) : (
        songsSaved.map((song) => (
          // Usa `song.songid` como valor único para la prop `key`
          <LibrarySongSaved key={song.songid}>
            <LibrarySongSavedTitleSong>{song.songTitle}</LibrarySongSavedTitleSong>
            <div>
              <LibrarySongSavedTitles>Autor: </LibrarySongSavedTitles>
              <LibrarySongSavedContents>{song.songAuthor}</LibrarySongSavedContents>
            </div>
            <div>
              <LibrarySongSavedTitles>Álbum: </LibrarySongSavedTitles>
              <LibrarySongSavedContents>{song.songAlbum}</LibrarySongSavedContents>
            </div>
            <div>
              <LibrarySongSavedTitles>Duración: </LibrarySongSavedTitles>
              <LibrarySongSavedContents>{song.songDuration}</LibrarySongSavedContents>
            </div>
            <RemoveButton onClick={() => handleRemoveSong(song.songid)}>Eliminar</RemoveButton>
          </LibrarySongSaved>
        ))
      )}
    </LibraryList>
  );
};

export default LibraryMusic;