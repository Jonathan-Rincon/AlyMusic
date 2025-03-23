import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import {SongDetailContainer, SongDetailTitle, SongDetailInfo, SongDetailLabel, SongDetailLink, SongDetailMessage,
} from "./styles.js";

const SongDetail = () => {
  const { songId } = useParams();
  const { data, isLoading, isError } = useFetch(
    `https://www.theaudiodb.com/api/v1/json/2/track.php?h=${songId}`
  );

  // Manejo de estados de carga y error
  if (isLoading) {
    return <SongDetailMessage>Cargando detalles de la canción...</SongDetailMessage>;
  }

  if (isError) {
    return <SongDetailMessage>Ocurrió un error al cargar los detalles de la canción.</SongDetailMessage>;
  }

  if (!data?.track || data.track.length === 0) {
    return (
      <SongDetailMessage>
        No se encontraron detalles para la canción con ID: {songId}.
      </SongDetailMessage>
    );
  }

  const songDetails = data.track[0];
  return (
    <SongDetailContainer>
      <SongDetailTitle>Detalles de la Canción</SongDetailTitle>
      <SongDetailInfo>
        <p>
          <SongDetailLabel>Título de la canción:</SongDetailLabel> {songDetails.strTrack}
        </p>
        <p>
          <SongDetailLabel>Nombre del artista:</SongDetailLabel> {songDetails.strArtist}
        </p>
        <p>
          <SongDetailLabel>Álbum:</SongDetailLabel> {songDetails.strAlbum}
        </p>
        <p>
          <SongDetailLabel>Género:</SongDetailLabel> {songDetails.strGenre}
        </p>
      </SongDetailInfo>
      <SongDetailLink to="/">Volver a la página inicial</SongDetailLink>
    </SongDetailContainer>
  );
};

export default SongDetail;
