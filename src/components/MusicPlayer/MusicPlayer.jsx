import './MusicPlayer.css';
import { useRef, useEffect, useState } from 'react';

export default function MusicPlayer({ song }) {

    //Ref variable
    const music = useRef(null);

    //State Variables
    const [isPlaying, setIsPlaying] = useState(false);

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
            <button onClick={playPauseToggle}>{isPlaying ? 'Turn off Music' : 'Turn On Music'}</button>
        </div>
    );
};
