import './Loading.css';
import DeadLift from '../../assets/pictures/Deadlift.png';

export default function Loading() {
    return (
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
            </div>
        </div>
    )
}