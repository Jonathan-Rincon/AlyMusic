import React, {Component} from 'react';
import "./song.css";

class Song extends Component {
    constructor(props){
        super(props)
    }
    render (){
        return(
            <div className="song">
                <h2 className="song__titleSong">{this.props.songTitle}</h2>
                <div><span className="song__titles">Autor: </span><span className="song__contents">{this.props.songAuthor}</span></div>
                <div><span className="song__titles">Album: </span><span className="song__contents">{this.props.songAlbum}</span></div>
                <div><span className="song__titles">Duración: </span><span className="song__contents">{this.props.songDuration}</span></div>
            </div>
        )
    }
}
export default Song;