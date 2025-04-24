import songsReducer, { addSong, removeSong } from "../redux/slices/librarySlice";

describe("librarySlice reducer", () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      songs: [],
    };
  });

  it("Debería retornar el estado inicial por defecto", () => {
    const result = songsReducer(undefined, { type: undefined });
    expect(result).toEqual(initialState);
  });

  describe("addSong action", () => {
    it("Debería agregar una nueva canción al estado cuando no existe previamente", () => {
      const newSong = {
        songid: "1",
        songTitle: "Yellow",
        songAuthor: "Coldplay",
        songAlbum: "Parachutes",
      };

      const result = songsReducer(initialState, addSong(newSong));
      expect(result.songs).toHaveLength(1);
      expect(result.songs[0]).toEqual(newSong);
    });

    it("No debería agregar una canción si ya existe en el estado", () => {
      const existingSong = {
        songid: "1",
        songTitle: "Yellow",
        songAuthor: "Coldplay",
        songAlbum: "Parachutes",
      };

      const stateWithSong = {
        songs: [existingSong],
      };

      const result = songsReducer(stateWithSong, addSong(existingSong));
      expect(result.songs).toHaveLength(1); // La canción no se agrega nuevamente
      expect(result.songs[0]).toEqual(existingSong);
    });
  });

  describe("removeSong action", () => {
    it("Debería eliminar una canción del estado por su songid", () => {
      const songToRemove = {
        songid: "1",
        songTitle: "Yellow",
        songAuthor: "Coldplay",
        songAlbum: "Parachutes",
      };

      const initialStateWithSongs = {
        songs: [songToRemove],
      };

      const result = songsReducer(initialStateWithSongs, removeSong({ songid: "1" }));
      expect(result.songs).toHaveLength(0); // La canción se elimina
    });

    it("No debería cambiar el estado si la canción no existe en el estado", () => {
      const nonExistingSongId = "2";
      const initialStateWithSongs = {
        songs: [
          {
            songid: "1",
            songTitle: "Yellow",
            songAuthor: "Coldplay",
            songAlbum: "Parachutes",
          },
        ],
      };

      const result = songsReducer(initialStateWithSongs, removeSong({ songid: nonExistingSongId }));
      expect(result.songs).toHaveLength(1); // El estado permanece igual
      expect(result.songs[0].songid).toEqual("1");
    });
  });
});