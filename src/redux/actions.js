export const addSongs = (idTrack, songTitle, songAuthor, songAlbum, songDuration) => {
    return {
      type: "ADD_SONG",
      payload: {
        songid: idTrack,
        songTitle,
        songAuthor,
        songAlbum,
        songDuration,
        completed: false
      }
    };
  };
  

export const removeSong = (songid) => {
    return {
        type: "REMOVE_SONG",
        payload: songid,
    }
}