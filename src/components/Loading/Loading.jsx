import './Loading.css';
import DeadLift from '../../assets/pictures/Deadlift.png';

export default function Loading() {
    return (
        <div className='Loading'>
            <img className='DeadLift' src={DeadLift} />
            <div class="middle">
                <div class="bar bar1"></div>
                <div class="bar bar2"></div>
                <div class="bar bar3"></div>
                <div class="bar bar4"></div>
                <div class="bar bar5"></div>
                <div class="bar bar6"></div>
                <div class="bar bar7"></div>
                <div class="bar bar8"></div>
            </div>
            <h1>Loading...</h1>
        </div>
    )
}