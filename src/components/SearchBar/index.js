import React, { useState } from "react";
import {
  SearchBarContainer,
  SearchBarForm,
  SearchBarLabel,
  SearchBarInput,
  SearchBarButton,
} from "./styles.js";

const SearchBar = ({ onSearch, onReset }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchValue); // Llama a `handleSearch` pasado como prop
  };

  const handleReset = () => {
    setSearchValue("");
    onReset(); // Llama a `handleReset` pasado como prop
  };

  return (
    <SearchBarContainer>
      <SearchBarForm onSubmit={handleSubmit}>
        <SearchBarLabel htmlFor="searchValue">Nombre del artista:</SearchBarLabel>
        <SearchBarInput
          id="searchValue"
          type="text"
          value={searchValue}
          onChange={handleInputChange}
          placeholder="Buscar canciones"
        />
        <SearchBarButton type="submit">Buscar</SearchBarButton>
        <SearchBarButton type="button" onClick={handleReset}>
          Reiniciar
        </SearchBarButton>
      </SearchBarForm>
    </SearchBarContainer>
  );
};

export default SearchBar;
