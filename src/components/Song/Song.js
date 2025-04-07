import React from "react";
import { SongCard, SongCardTitle, SongCardInfo, SongCardLabel, SongCardActions, SongCardButton, SongCardLink, SongDuration } from "./styles.js";
import { useDispatch } from "react-redux";
import { addSong } from "../../redux/slices/librarySlice.js";

const Song = ({ idTrack, songTitle, songAuthor, songAlbum, songDuration, isLong }) => {
  const dispatch = useDispatch();

  const addSongToLibrary = () => {
    dispatch(
      addSong({
        songid: idTrack,
        songTitle,
        songAuthor,
        songAlbum,
        songDuration, // Este es ahora un string serializable como "MM:SS"
      })
    );
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
          <SongCardLabel>Duración:</SongCardLabel>{" "}
          <SongDuration $isLong={isLong}>{songDuration}</SongDuration>
        </p>
      </SongCardInfo>
      <SongCardActions>
        <SongCardButton onClick={addSongToLibrary}>
          Agregar a Playlist
        </SongCardButton>
        <SongCardLink to={`/song/${idTrack}`}>Ver Detalles</SongCardLink>
      </SongCardActions>
    </SongCard>
  );
};

export default Song;
