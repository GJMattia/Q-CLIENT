import './Loading.css';
import { useState } from 'react';
import DeadLift from '../../assets/pictures/Deadlift.png';

export default function Loading() {
    let [load, setLoad] = useState(true);

    function cancelLoad() {
        setLoad(false);
    }
    return (
        load && (
            <div className='LoadingBox'>
                <div className='Loading'>
                    <img className='DeadLift' src={DeadLift} />
                    <div className="middle">
                        <div className="bar bar1"></div>
                        <div className="bar bar2"></div>
                        <div className="bar bar3"></div>
                        <div className="bar bar4"></div>
                        <div className="bar bar5"></div>
                        <div className="bar bar6"></div>
                        <div className="bar bar7"></div>
                        <div className="bar bar8"></div>
                    </div>
                    <h3>Loading...</h3>
                    <h5 onClick={cancelLoad} >Cancel?</h5>
                </div>
            </div>
        )
    )
}