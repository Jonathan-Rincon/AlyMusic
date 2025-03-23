import React from "react";
import {SearchBarContainer, SearchBarForm, SearchBarLabel, SearchBarInput, SearchBarButton,} from "./styles";

const SearchBar = ({ form, handleInputChange, handleSubmit, handleKeyDown }) => {
  return (
    <SearchBarContainer>
      <SearchBarForm onSubmit={handleSubmit}>
        <SearchBarLabel htmlFor="artistSearched">Nombre del artista:</SearchBarLabel>
        <SearchBarInput
          id="artistSearched"
          type="text"
          name="artistSearched"
          value={form.artistSearched}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <SearchBarButton type="submit">Buscar</SearchBarButton>
      </SearchBarForm>
    </SearchBarContainer>
  );
};

export default SearchBar;
