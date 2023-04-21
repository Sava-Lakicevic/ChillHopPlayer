import React from "react";
import LibrarySong from "./LibrarySong";

const Library = ({ songs, setCurrentSong, currentSong, libraryStatus }) => {
    return (
        <div className={`library ${libraryStatus ? "active-library" : ""}`}>
            <h2>Library</h2>
            <div className="library-songs">
                {songs.map((song) => (
                    <LibrarySong
                        setCurrentSong={setCurrentSong}
                        currentSong={currentSong}
                        song={song}
                        key={song.id}
                    ></LibrarySong>
                ))}
            </div>
        </div>
    );
};

export default Library;
