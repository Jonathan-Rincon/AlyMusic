import React, { Component, Fragment } from "react";
import Header from "./components/Header";
import Song from "./components/Song";
import ListSongs from "./components/ListSongs";
import "./components/song.css";
//import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      listSongs: []
    }
  }
  componentDidMount(){
    const songList = new ListSongs();
    const songs = songList.getSongs();
    this.setState({listSongs: songs});
    console.log("Se han cargado todas las canciones disponibles");
  }

  render(){
  return (
    <div className="App">
      <Header appName="AlyMusic"></Header>
      <div className="listsongs">
      {this.state.listSongs.map((song, index) => (
        <Song 
          key={index}
          songTitle={song.songTitle}
          songAuthor={song.songAuthor}
          songAlbum={song.songAlbum}
          songDuration={song.songDuration}
        />
      ))}
      </div>
    </div>
 
  );
}
}

export default App;
