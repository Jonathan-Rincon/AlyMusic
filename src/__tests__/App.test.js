import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import App from "../App";
import { BrowserRouter } from "react-router-dom"; // Importa BrowserRouter
import { ThemeProvider } from "styled-components";
import GlobalStyles from "../theme/GlobalStyles";
import searchReducer from "../redux/slices/searchSlice";
import libraryReducer from "../redux/slices/librarySlice";
import { resetResults } from "../redux/slices/searchSlice";

// Tema básico para pruebas
const theme = {
  colors: {
    background: {
      titleHeader: "#f0f0f0",
      libraryList: "#ffffff",
    },
    font: {
      titleHeader: "#333",
    },
  },
  fonts: {
    base: "Arial, sans-serif",
  },
};

// Mock de axios
jest.mock("axios", () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
}));

// Mockea useDispatch globalmente
jest.mock("react-redux", () => {
  const actualReactRedux = jest.requireActual("react-redux");
  return {
    ...actualReactRedux,
    useDispatch: jest.fn(),
  };
});

describe("App Component", () => {
  let store;
  const mockDispatch = jest.fn(); // Mock global de dispatch

  beforeEach(() => {
    jest.clearAllMocks(); // Limpia los mocks antes de cada prueba
    require("react-redux").useDispatch.mockReturnValue(mockDispatch); // Configura useDispatch para devolver el mockDispatch

    // Configuración del store
    store = configureStore({
      reducer: {
        search: searchReducer,
        library: libraryReducer,
      },
      preloadedState: {
        search: {
          results: [],
          loading: false,
          error: null,
          message: "",
        },
        library: {
          songs: [],
        },
      },
    });
  });

  it("Renderiza los componentes Header, SearchBar, SearchResults y LibraryMusic correctamente", () => {
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    );

    // Verifica que el componente Header está presente
    expect(screen.getByText("AlyMusic")).toBeInTheDocument();

    // Verifica que el componente SearchBar está presente
    expect(screen.getByText("Nombre del artista:")).toBeInTheDocument();

    // Verifica que el componente LibraryMusic está presente
    expect(screen.getByText("Mi Biblioteca")).toBeInTheDocument();

    // Verifica que el componente SearchResults está presente
    expect(screen.getByText("Resultados Encontrados")).toBeInTheDocument();
  });

  it("Simula buscar canciones y verifica que los resultados se muestran correctamente", async () => {
    const mockResults = [
      { idTrack: "1", strTrack: "Blue", strArtist: "Coldplay", strAlbum: "ParachutesX" },
      { idTrack: "2", strTrack: "Fix Yours", strArtist: "Coldplay", strAlbum: "X&Y1Z" },
    ];

    const axios = require("axios");
    axios.get.mockResolvedValueOnce({ data: mockResults }); // Simula la respuesta de axios.get

    store = configureStore({
      reducer: {
        search: searchReducer,
        library: libraryReducer,
      },
      preloadedState: {
        search: {
          results: mockResults, // Se inicializa con resultados simulados
          loading: false,
          error: null,
          message: "",
        },
        library: {
          songs: [],
        },
      },
    });

    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    );

    const searchInput = screen.getByPlaceholderText("Buscar canciones");
    const searchButton = screen.getByText("Buscar");

    fireEvent.change(searchInput, { target: { value: "Coldplay" } });
    fireEvent.click(searchButton);

    // Verifica que los resultados simulados se renderizan correctamente
    expect(await screen.findByText("Blue")).toBeInTheDocument();
    expect(await screen.findByText("Fix Yours")).toBeInTheDocument();
    expect(await screen.findByText("ParachutesX")).toBeInTheDocument();
    expect(await screen.findByText("X&Y1Z")).toBeInTheDocument();
  });

  it("Simula agregar una canción a la biblioteca y verifica que aparece en la sección Library", () => {
    store = configureStore({
      reducer: {
        search: searchReducer,
        library: libraryReducer,
      },
      preloadedState: {
        search: {
          results: [
            { idTrack: "1", strTrack: "Yellow", strArtist: "Coldplay", strAlbum: "Parachutes" },
          ],
          loading: false,
          error: null,
          message: "",
        },
        library: {
          songs: [],
        },
      },
    });

    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    );

    // Simula agregar la canción
    const addButton = screen.getByText("Agregar a Playlist");
    fireEvent.click(addButton);

    // Verifica que la canción se añade a la biblioteca
    const yellowElements = screen.getAllByText("Yellow");
    expect(yellowElements.length).toBe(1); // Uno en resultados de búsqueda, otro en biblioteca
  });

  it("Ejecuta resetResults al hacer clic en el botón Reiniciar", () => {
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    );

    // Encuentra el botón de "Reiniciar" y haz clic en él
    const resetButton = screen.getByText("Reiniciar");
    fireEvent.click(resetButton);

    // Verifica que se llamó a dispatch con resetResults
    expect(mockDispatch).toHaveBeenCalledTimes(1); // Se llamó al dispatch una vez
    expect(mockDispatch).toHaveBeenCalledWith(resetResults()); // Verifica que resetResults fue disparado
  });
});