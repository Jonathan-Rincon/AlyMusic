import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { configureStore } from "@reduxjs/toolkit";
import songsReducer from "../redux/slices/librarySlice";

import LibraryMusic from "../components/LibraryMusic/index";

// Tema básico para pruebas
const mockTheme = {
  colors: {
    background: {
      libraryList: "#f8f9fa",
    },
  },
  fonts: {
    base: "Arial, sans-serif",
  },
};

// Mockea useDispatch una sola vez al inicio
jest.mock("react-redux", () => {
  const actualReactRedux = jest.requireActual("react-redux");
  return {
    ...actualReactRedux,
    useDispatch: jest.fn(), // Mockea useDispatch globalmente
  };
});

describe("LibraryMusic Component", () => {
  const mockDispatch = jest.fn(); // Función mock para dispatch
  const { useDispatch } = require("react-redux");
  useDispatch.mockReturnValue(mockDispatch); // Configura el mock de useDispatch para devolver mockDispatch

  let store;

  beforeEach(() => {
    mockDispatch.mockClear(); // Limpia las llamadas previas al mockDispatch

    store = configureStore({
      reducer: {
        library: songsReducer,
      },
      preloadedState: {
        library: {
          songs: [], // Estado inicial vacío
        },
      },
    });
  });

  it("La lista de canciones de la biblioteca se muestra correctamente", () => {
    store = configureStore({
      reducer: {
        library: songsReducer,
      },
      preloadedState: {
        library: {
          songs: [
            {
              songid: "1",
              songTitle: "Yellow",
              songAuthor: "Coldplay",
              songAlbum: "Parachutes",
              songDuration: "04:32",
            },
            {
              songid: "2",
              songTitle: "Fix You",
              songAuthor: "Coldplay",
              songAlbum: "X&Y",
              songDuration: "04:36",
            },
          ],
        },
      },
    });

    render(
      <Provider store={store}>
        <ThemeProvider theme={mockTheme}>
          <LibraryMusic />
        </ThemeProvider>
      </Provider>
    );

    // Verifica que los títulos de las canciones se renderizan correctamente
    expect(screen.getByText("Yellow")).toBeInTheDocument();
    expect(screen.getByText("Fix You")).toBeInTheDocument();

    // Verifica que los álbumes también se renderizan
    expect(screen.getByText("Parachutes")).toBeInTheDocument();
    expect(screen.getByText("X&Y")).toBeInTheDocument();
  });
  
  it("Cada canción tiene un botón 'Eliminar' que ejecuta una función al hacer clic", () => {

    const mockDispatch = jest.fn();
    require("react-redux").useDispatch.mockReturnValue(mockDispatch); // Se Simula useDispatch para usar mockDispatch
    store = configureStore({
        reducer: {
          library: songsReducer,
        },
        preloadedState: {
          library: {
            songs: [
              {
                songid: "1",
                songTitle: "Yellow",
                songAuthor: "Coldplay",
                songAlbum: "Parachutes",
                songDuration: "04:32",
              },
              {
                songid: "2",
                songTitle: "Fix You",
                songAuthor: "Coldplay",
                songAlbum: "X&Y",
                songDuration: "04:36",
              },
            ],
          },
        },
      });
  
      render(
        <Provider store={store}>
          <ThemeProvider theme={mockTheme}>
            <LibraryMusic />
          </ThemeProvider>
        </Provider>
      );

            const song1 = screen.getByText("Yellow").closest("div"); //Acá me aseguro que se enfoque solo en el boton renderizado con esta cancion
            expect(within(song1).getByText("Eliminar")).toBeInTheDocument();
            const button1 = within(song1).getByText("Eliminar");
            fireEvent.click(button1);
            expect(mockDispatch).toHaveBeenCalledTimes(1);
            expect(mockDispatch).toHaveBeenCalledWith({
            type: "library/removeSong",
            payload: {
                songid: "1",
             },
            });

            const song2 = screen.getByText("Fix You").closest("div");//Acá me aseguro que se enfoque solo en el boton renderizado con esta cancion
            expect(within(song2).getByText("Eliminar")).toBeInTheDocument();
            const button2 = within(song2).getByText("Eliminar");
            fireEvent.click(button2);
            expect(mockDispatch).toHaveBeenCalledTimes(2);
            expect(mockDispatch).toHaveBeenCalledWith({
            type: "library/removeSong",
            payload: {
                songid: "2",
             },
            });
    });

it("La biblioteca vacía muestra un mensaje 'No hay canciones en tu biblioteca'.", ()=> {
        store = configureStore({
            reducer: {
              library: songsReducer,
            },
            preloadedState: {
              library: {
                songs: [],
              },
            },
          });
      
          render(
            <Provider store={store}>
              <ThemeProvider theme={mockTheme}>
                <LibraryMusic />
              </ThemeProvider>
            </Provider>
          );
      
          // Verifica que los títulos de las canciones se renderizan correctamente
          expect(screen.getByText("No hay canciones en tu biblioteca")).toBeInTheDocument();
    });
  
});