import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlay,
    faAngleLeft,
    faAngleRight,
    faPause,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({
    currentSong,
    setCurrentSong,
    isPlaying,
    setIsPlaying,
    audioRef,
    songInfo,
    setSongInfo,
    songs,
}) => {
    // Format time function
    const formatTime = (time) => {
        return `${Math.trunc(time / 60)}:${("0" + Math.trunc(time % 60)).slice(
            -2
        )}`;
    };
    // Event Handlers
    const playSongHandler = () => {
        if (!isPlaying) audioRef.current.play();
        else audioRef.current.pause();
        setIsPlaying(!isPlaying);
    };
    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value;
        setSongInfo({ ...songInfo, currentTime: e.target.value });
    };
    const skipTrackHandler = (direciton) => {
        let currIndex = songs.indexOf(currentSong);
        let nextIndex;
        if (direciton === "skip-back") {
            if (currIndex === 0) currIndex += songs.length;
            nextIndex = currIndex - 1;
        } else {
            nextIndex = (currIndex + 1) % songs.length;
        }
        currentSong.active = false;
        setCurrentSong(songs[nextIndex]);
        songs[nextIndex].active = true;
    };
    return (
        <div className="player">
            <div className="time-control">
                <p>{formatTime(songInfo.currentTime)}</p>
                <input
                    type="range"
                    onChange={dragHandler}
                    min={0}
                    max={songInfo.duration || 0}
                    value={songInfo.currentTime}
                />
                <p>
                    {isNaN(songInfo.duration)
                        ? "0:00"
                        : formatTime(songInfo.duration)}
                </p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon
                    className="skip-back"
                    onClick={() => skipTrackHandler("skip-back")}
                    size="2x"
                    icon={faAngleLeft}
                ></FontAwesomeIcon>
                <FontAwesomeIcon
                    className="play"
                    size="2x"
                    onClick={playSongHandler}
                    icon={isPlaying ? faPause : faPlay}
                ></FontAwesomeIcon>
                <FontAwesomeIcon
                    className="skip-forward"
                    onClick={() => skipTrackHandler("skip-forward")}
                    size="2x"
                    icon={faAngleRight}
                ></FontAwesomeIcon>
            </div>
        </div>
    );
};

export default Player;
