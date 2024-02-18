import './MusicPlayer.css';
import { useRef, useEffect, useState } from 'react';

export default function MusicPlayer({ song }) {

    //Ref variable
    const music = useRef(null);

    //State Variables
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.5);

    const songFolder = 'src/assets/music';


    const playPauseToggle = () => {
        if (music.current) {
            if (music.current.paused) {
                music.current.play();
            } else {
                music.current.pause();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (music.current) {
            music.current.volume = newVolume;
        }
    };

    const playSong = () => {
        if (music.current) {
            music.current.src = `${songFolder}/${song}.mp3`;
            music.current.play();
            setIsPlaying(true);
        }
    };

    useEffect(() => {
        playSong();
    }, [song]);

    return (
        <div className='MusicPlayer'>
            <audio ref={music} />
            <button onClick={playPauseToggle}>{isPlaying ? '⏸️' : '▶️'}</button>
            <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
            />
        </div>
    );
};
