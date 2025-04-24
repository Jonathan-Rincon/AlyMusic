import React from "react";
import { render, screen, within, fireEvent } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import SearchResults from "../components/SearchResults/index";
import songsReducer from "../redux/slices/librarySlice"; // Asegúrate de importar el reducer correcto

describe("SearchResults Component", () => {
    it("La lista de canciones se renderiza correctamente con datos simulados y cada canción muestra el titulo, artista y album", () => {
    const store = configureStore({
      reducer: {
        library: songsReducer, // Se Usa el reducer real
      },
      preloadedState: {
        library: {
          songs: [],
        },
      },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <SearchResults
            songs={[
              {
                idTrack: "1",
                strTrack: "Yellow",
                strArtist: "Coldplay",
                strAlbum: "Parachutes",
                intDuration: 272000, // Duración en milisegundos
              },
              {
                idTrack: "2",
                strTrack: "Fix You",
                strArtist: "Coldplay",
                strAlbum: "X&Y",
                intDuration: 276000, // Duración en milisegundos
              },
            ]}
          >
            <p>Resultados de búsqueda</p>
          </SearchResults>
        </BrowserRouter>
      </Provider>
    );

    // Verifica que los títulos de las canciones se renderizan correctamente. Adicionalmente que se muestre la info de cada canción
    const song1 = screen.getByText("Yellow").closest("div"); //Acá me aseguro que no arroje error por tener un artista igual
    expect(within(song1).getByText("Coldplay")).toBeInTheDocument();

    const song2 = screen.getByText("Fix You").closest("div");//Acá me aseguro que no arroje error por tener un artista igual
    expect(within(song2).getByText("Coldplay")).toBeInTheDocument();

    expect(screen.getByText("Yellow")).toBeInTheDocument();
    expect(screen.getByText("Parachutes")).toBeInTheDocument();

    expect(screen.getByText("Fix You")).toBeInTheDocument();
    expect(screen.getByText("X&Y")).toBeInTheDocument();

    // Verificar que el texto de los `children` se renderiza correctamente
    expect(screen.getByText("Resultados de búsqueda")).toBeInTheDocument();
  });
});