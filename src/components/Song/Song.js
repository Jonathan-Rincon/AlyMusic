import React from "react";
import { SongCard, SongCardTitle, SongCardInfo, SongCardLabel, SongCardActions, SongCardButton, SongCardLink} from "./styles.js";

const Song = ({ idTrack, songTitle, songAuthor, songAlbum, songDuration, addSong }) => {
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
        <SongCardButton onClick={() => addSong({ songTitle, songAuthor, songAlbum, songDuration })}>
          Agregar a PlayList
        </SongCardButton>
        <SongCardLink to={`/song/${idTrack}`}>Ver Detalles</SongCardLink>
      </SongCardActions>
    </SongCard>
  );
};

export default Song;
