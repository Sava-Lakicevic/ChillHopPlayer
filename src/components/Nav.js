import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
import VolumeAdjuster from "./VolumeAdjuster";

const Nav = ({ libraryStatus, setLibraryStatus, audioRef }) => {
    return (
        <nav>
            <button onClick={() => setLibraryStatus(!libraryStatus)}>
                Library
                <FontAwesomeIcon icon={faMusic}></FontAwesomeIcon>
            </button>
            <VolumeAdjuster audioRef={audioRef}></VolumeAdjuster>
        </nav>
    );
};

export default Nav;
