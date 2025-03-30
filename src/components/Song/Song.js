import React from "react";
import { SongCard, SongCardTitle, SongCardInfo, SongCardLabel, SongCardActions, SongCardButton, SongCardLink} from "./styles.js";
import { useDispatch } from 'react-redux';
import {addSongs} from '../../redux/actions';
const Song = ({ idTrack, songTitle, songAuthor, songAlbum, songDuration }) => {

  const dispatch = useDispatch();

const addSongToLibrary = (song) => {
  dispatch(addSongs(
    song.songid,
    song.songTitle,
    song.songAuthor,
    song.songAlbum,
    song.songDuration
  ));
};
  return (  
    <SongCard key={idTrack}>
      <SongCardTitle>{songTitle}</SongCardTitle>
      <SongCardInfo>
        <p>
          <SongCardLabel>Autor:</SongCardLabel> {songAuthor}
        </p>
        <p>
          <SongCardLabel>Álbum:</SongCardLabel> {songAlbum}
        </p>
        <p>
          <SongCardLabel>Duración:</SongCardLabel> {songDuration}
        </p>
      </SongCardInfo>
      <SongCardActions>
        <SongCardButton
          onClick={() => addSongToLibrary({ 
            songid: idTrack,
            songTitle,
            songAuthor,
            songAlbum,
            songDuration 
          })}
        >
          Agregar a PlayList
        </SongCardButton>
        <SongCardLink to={`/song/${idTrack}`}>Ver Detalles</SongCardLink>
      </SongCardActions>
    </SongCard>
  );
};

export default Song;
