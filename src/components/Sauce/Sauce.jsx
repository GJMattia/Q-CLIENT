import './Sauce.css';
import { useRef, useEffect } from 'react';

export default function Sauce() {
    const music = useRef(null);
    const songFolder = 'src/assets/music';

    const playSong = () => {
        if (music.current) {
            music.current.src = `${songFolder}/menu.mp3`;
            music.current.play();
        }
    };

    useEffect(() => {
        // Call playSong when the component mounts
        playSong();
    }, []); // The empty dependency array ensures this effect runs only once on mount

    return (
        <div className='Black'>
            <audio ref={music} />
            <h1>adsjfkalsdfj</h1>
        </div>
    );
}
