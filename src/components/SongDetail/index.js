import React from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { Link } from 'react-router-dom';
import './styles.css'; // Importa el archivo CSS

const SongDetail = () => {
    const { songId } = useParams();
    const { data, isLoading, isError } = useFetch(`https://www.theaudiodb.com/api/v1/json/2/track.php?h=${songId}`);

    // Manejo de estados de carga y error
    if (isLoading) {
        return <h2 className="song-detail__loading">Cargando detalles de la canción...</h2>;
    }

    if (isError) {
        return <h2 className="song-detail__error">Ocurrió un error al cargar los detalles de la canción.</h2>;
    }

    if (!data?.track || data.track.length === 0) {
        return <h2 className="song-detail__not-found">No se encontraron detalles para la canción con ID: {songId}.</h2>;
    }

    const songDetails = data.track[0];
    return (
        <div className="song-detail">
            <h1 className="song-detail__title">Detalles de la Canción</h1>
            <div className="song-detail__info">
                <p><span className="song-detail__label">Título de la canción:</span> {songDetails.strTrack}</p>
                <p><span className="song-detail__label">Nombre del artista:</span> {songDetails.strArtist}</p>
                <p><span className="song-detail__label">Álbum:</span> {songDetails.strAlbum}</p>
                <p><span className="song-detail__label">Género:</span> {songDetails.strGenre}</p>
            </div>
            <Link to="/" className="song-detail__link">Volver a la página inicial</Link>
        </div>
    );
};

export default SongDetail;