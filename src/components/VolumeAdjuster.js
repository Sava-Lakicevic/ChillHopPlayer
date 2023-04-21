import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeUp } from "@fortawesome/free-solid-svg-icons";

const VolumeAdjuster = ({ audioRef }) => {
    // State
    const [displayVolume, setDisplayVolume] = useState(false);
    const [volume, setVolume] = useState(1);

    // Ref
    const volumeRef = useRef(null);

    // Event Handlers
    const volumeChangeHandler = (e) => {
        const volume = e.target.value;
        setVolume(volume);
        audioRef.current.volume = volume;
    };
    const toggleVolumeHandler = () => {
        setDisplayVolume(!displayVolume);
    };
    const clickOutsideHandler = (e) => {
        if (volumeRef.current && !volumeRef.current.contains(e.target)) {
            setDisplayVolume(false);
        }
    };

    React.useEffect(() => {
        document.addEventListener("mousedown", clickOutsideHandler);
        return () => {
            document.removeEventListener("mousedown", clickOutsideHandler);
        };
    }, []);

    return (
        <div ref={volumeRef} className="volume-control">
            <FontAwesomeIcon
                icon={faVolumeUp}
                onClick={toggleVolumeHandler}
                className="volume-icon"
            ></FontAwesomeIcon>
            <div
                className={`volume-slider ${
                    displayVolume ? "active-volume-slider" : ""
                }`}
            >
                <div className="arrow" />
                <div style={{ display: "flex", alignItems: "center" }}>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.02"
                        value={volume}
                        onChange={volumeChangeHandler}
                    />
                </div>
            </div>
        </div>
    );
};

export default VolumeAdjuster;
