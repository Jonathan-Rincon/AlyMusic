import styled from 'styled-components';

const LibraryList = styled.div`
    max-width: 1200px;
    margin: 20px auto;
    padding: 20px;
    background: ${props =>props.theme.colors.background.libraryList};
    border-radius: 12px;
    box-shadow: 0 4px 10px #0000001a;
    font-family: ${props=>props.theme.fonts.base};
    color: #2c3e50;
`;
const LibraryTitle = styled.h2`
    font-size: 26px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 20px;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #34495e;
`;
const LibrarySongSaved = styled.div`
    background: #ffffff;
    border: 1px solid #00000033;
    border-radius: 12px;
    padding: 15px 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 15px;
    transition: transform 0.2s ease, box-shadow 0.2s ease;

    &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
    background: #f7f9fc;
    }
`;

const LibrarySongSavedTitleSong = styled.span`
    display: block;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
    color: #2c3e50;
    text-align: center;
    text-transform: capitalize;
`;

const LibrarySongSavedTitles = styled.span`
    font-size: 15px;
    font-weight: bold;
    color: #34495e;
`;
const LibrarySongSavedContents = styled.span`
    font-size: 15px;
    color: #2c3e50;
    margin-left: 5px;
`;
const RemoveButton = styled.button`
    background-color: #e74c3c; /* Color rojo para resaltar eliminación */
    color: #ffffff; /* Color blanco para el texto */
    border: none;
    border-radius: 8px;
    padding: 8px 15px;
    font-size: 14px;
    font-weight: bold;
    text-transform: uppercase;
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;

    &:hover {
        transform: translateY(-3px); /* Animación al pasar el mouse */
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        background-color: #c0392b; /* Color más oscuro al hacer hover */
    }

    &:active {
        transform: translateY(0); /* Sin movimiento al hacer clic */
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
`;
export {
    LibraryList,
    LibraryTitle,
    LibrarySongSaved,
    LibrarySongSavedTitleSong,
    LibrarySongSavedTitles,
    LibrarySongSavedContents,
    RemoveButton
}