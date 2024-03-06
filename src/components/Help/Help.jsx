import './Help.css';
import Minus from '../../assets/pictures/minus.webp';
import Skip from '../../assets/pictures/skip.webp';
import x4 from '../../assets/pictures/x4.webp';
import Zero from '../../assets/badges/animals_zero.png';
import Bronze from '../../assets/badges/animals_bronze.png';
import Silver from '../../assets/badges/animals_silver.png';
import Gold from '../../assets/badges/animals_gold.png';

export default function Help() {

    return (
        <div className='Help'>
            <h1>Need some help?</h1>
            <div className='HelpBox'>
                <h3>Xp Info</h3>
                <p>XP is earned by answering questions correctly. Upon accumulating 100 XP, a level is gained, and the XP count resets to 0.
                    The distribution of XP varies based on the difficulty of the questions, as outlined below:</p>
                <div className='DifficultyHelp'>
                    <p className='EasyHelp'>Easy: 5xp</p>
                    <p className='MediumHelp'>Medium: 10xp</p>
                    <p className='HardHelp'>Hard: 15xp</p>
                </div>
            </div>

            <div className='HelpBox'>
                <h3>Power-up Info</h3>
                <p>Quiz Kingpin offers three distinct types of power-ups. Each power-up can be utilized once per question and is acquired through daily logins. Their effects are detailed below:</p>
                <div className='PowerupHelp'>
                    <div className='PowerupInfo'>
                        <h1>Skip</h1>
                        <img src={Skip} />
                        <p>The Skip power-up allows you to skip the current question, saving you from potential damage to your overall average.</p>
                    </div>
                    <div className='PowerupInfo'>
                        <h1>x4</h1>
                        <img src={x4} />
                        <p>The x4 power-up multiplies the XP you gain by 4. However, you will still receive 0xp if you answer the question incorrectly.</p>
                    </div>
                    <div className='PowerupInfo'>
                        <h1>Minus</h1>
                        <img src={Minus} />
                        <p>The Minus Power-up removes one wrong answer from the choices, improving your odds from 1/4 to 1/3.</p>
                    </div>
                </div>
            </div>

            <div className='HelpBox'>
                <h3>Badges Info</h3>
                <p>As you answer questions correctly, your statistics are tracked. You will unlock different level badges for each category by answering questions accurately. The following outlines the process for earning badges:</p>
                <div className='BadgesInfo'>
                    <div className='BadgeInfo'>
                        <h1>Nothing</h1>
                        <img src={Zero} />
                        <p>0-19 correct answers</p>
                    </div>
                    <div className='BadgeInfo'>
                        <h1>Bronze</h1>
                        <img src={Bronze} />
                        <p>20 correct answers</p>
                    </div>
                    <div className='BadgeInfo'>
                        <h1>Silver</h1>
                        <img src={Silver} />
                        <p>50 correct answers</p>
                    </div>
                    <div className='BadgeInfo'>
                        <h1>Gold</h1>
                        <img src={Gold} />
                        <p>100 correct answers</p>
                    </div>
                </div>

            </div>
        </div>
    )
}