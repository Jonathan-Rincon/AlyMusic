import React from 'react';
import './styles.css'; // Importa el archivo CSS

const SearchBar = ({ form, handleInputChange, handleSubmit, handleKeyDown }) => {
    return (
        <div className="search-bar">
            <form onSubmit={handleSubmit}>
                <label htmlFor="artistSearched">Nombre del artista:</label>
                <input
                    id="artistSearched"
                    type="text"
                    name="artistSearched"
                    value={form.artistSearched}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                />
                <button type="submit">Buscar</button>
            </form>
        </div>
    );
};

export default SearchBar;
