import React, { useState, useRef } from "react";
import "./styles/app.scss";
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";
import Nav from "./components/Nav";
import data from "./data"; //contains song data

function App() {
    // State
    const [songs, setSongs] = useState(data());
    const [currentSong, setCurrentSong] = useState(songs[0]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration: 0,
        animationPerc: 0,
    });
    const [libraryStatus, setLibraryStatus] = useState(false);

    // Ref
    const audioRef = useRef(null);

    // Event handlers
    const updateSongInfo = (target) => {
        const current = target.currentTime;
        const duration = target.duration;
        const animationPerc = Math.round(
            (Math.round(current) * 100) / Math.round(duration)
        );
        setSongInfo({
            ...songInfo,
            currentTime: current,
            duration,
            animationPerc,
        });
    };
    const timeUpdateHandler = (e) => {
        updateSongInfo(e.target);
    };
    const loadSongHandler = (e) => {
        updateSongInfo(e.target);
        if (isPlaying) audioRef.current.play();
    };
    const songEndHandler = () => {
        let currIndex = songs.indexOf(currentSong);
        let nextIndex = (currIndex + 1) % songs.length;
        currentSong.active = false;
        setCurrentSong(songs[nextIndex]);
        songs[nextIndex].active = true;
    };
    return (
        <div className={`App ${libraryStatus ? "library-active" : ""}`}>
            <Library
                songs={songs}
                setCurrentSong={setCurrentSong}
                currentSong={currentSong}
                libraryStatus={libraryStatus}
            ></Library>
            <div className="wrapper">
                <Nav
                    libraryStatus={libraryStatus}
                    setLibraryStatus={setLibraryStatus}
                    audioRef={audioRef}
                ></Nav>
                <Song currentSong={currentSong}></Song>
                <Player
                    audioRef={audioRef}
                    currentSong={currentSong}
                    setCurrentSong={setCurrentSong}
                    isPlaying={isPlaying}
                    setIsPlaying={setIsPlaying}
                    songInfo={songInfo}
                    setSongInfo={setSongInfo}
                    songs={songs}
                ></Player>
            </div>
            <audio
                onTimeUpdate={timeUpdateHandler}
                onLoadedMetadata={loadSongHandler}
                onEnded={songEndHandler}
                ref={audioRef}
                src={currentSong.audio}
            ></audio>
        </div>
    );
}

export default App;
