import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { BrowserRouter } from "react-router-dom";
import Song from "../components/Song/Song";
import songsReducer from "../redux/slices/librarySlice";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(), // Se Mockea useDispatch
}));

describe("Song Component", () => {
  it("El botón 'Agregar a Playlist' ejecuta una función proporcionada por props al hacer clic.", () => {
    const mockDispatch = jest.fn();
    require("react-redux").useDispatch.mockReturnValue(mockDispatch); // Se Simula useDispatch para usar mockDispatch

    const store = configureStore({
      reducer: { library: songsReducer },
      preloadedState: { library: { songs: [] } },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Song
            idTrack="1"
            songTitle="Yellow"
            songAuthor="Coldplay"
            songAlbum="Parachutes"
            songDuration="04:32"
            isLong={false}
          />
        </BrowserRouter>
      </Provider>
    );

    // Encuentra el botón y verifica que está en el DOM
    const buttonElement = screen.getByText(/Agregar a Playlist/i);
    expect(buttonElement).toBeInTheDocument();

    // Simula un clic en el botón
    fireEvent.click(buttonElement);

    // Verifica que se llamó a useDispatch y se disparó la acción con los datos correctos
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "library/addSong",
      payload: {
        songid: "1",
        songTitle: "Yellow",
        songAuthor: "Coldplay",
        songAlbum: "Parachutes",
        songDuration: "04:32",
      },
    });
  });
});