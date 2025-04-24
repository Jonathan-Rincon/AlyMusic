import searchReducer, { resetResults, fetchSongs } from "../redux/slices/searchSlice";
import axios from "axios";
import { configureStore } from "@reduxjs/toolkit";

// Mock de Axios
jest.mock("axios", () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
}));

describe("searchSlice reducer and actions", () => {
  let initialState;
  let store;

  beforeEach(() => {
    initialState = {
      results: [],
      loading: false,
      error: null,
      message: "",
    };

    jest.clearAllMocks(); // Limpia los mocks antes de cada prueba

    // Configura un store real para las pruebas
    store = configureStore({
      reducer: {
        search: searchReducer,
      },
      preloadedState: {
        search: initialState,
      },
    });
  });

  it("Debería retornar el estado inicial por defecto", () => {
    const result = searchReducer(undefined, { type: undefined });
    expect(result).toEqual(initialState);
  });

  describe("resetResults action", () => {
    it("Debería reiniciar los resultados, el mensaje y los errores", () => {
      const stateWithData = {
        results: [{ idTrack: "1", strTrack: "Yellow" }],
        loading: false,
        error: "Error previo",
        message: "Mensaje previo",
      };

      const result = searchReducer(stateWithData, resetResults());
      expect(result).toEqual(initialState);
    });
  });

  describe("fetchSongs thunk", () => {
    
    it("Debería manejar el caso donde no se encuentran artistas", async () => {
      const mockArtistsResponse = {
        data: { artists: null },
      };

      // Mockea la respuesta de Axios para artistas
      axios.get.mockResolvedValueOnce(mockArtistsResponse);

      // Ejecuta el thunk directamente en el store real
      await store.dispatch(fetchSongs("NonExistentArtist"));

      // Obtén el estado después de ejecutar el thunk
      const state = store.getState().search;

      // Verifica los cambios en el estado
      expect(state.loading).toBe(false); // `loading` debe ser false
      expect(state.results).toEqual([]); // Sin resultados
      expect(state.message).toBe("No se encontraron artistas."); // Mensaje de "No se encontraron artistas"
    });

    it("Debería manejar errores y disparar la acción rejected", async () => {
      // Mockea un error de Axios
      axios.get.mockRejectedValueOnce(new Error("Error al buscar canciones"));

      // Ejecuta el thunk directamente en el store real
      await store.dispatch(fetchSongs("Coldplay"));

      // Obtén el estado después de ejecutar el thunk
      const state = store.getState().search;

      // Verifica los cambios en el estado
      expect(state.loading).toBe(false); // `loading` debe ser false
      expect(state.error).toBe("Error al buscar canciones"); // Mensaje de error
      expect(state.message).toBe("Hubo un problema al buscar las canciones."); // Mensaje de fallback
    });
  });
});