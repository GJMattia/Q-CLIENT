import { useState } from 'react';
import './EditMotto.css';
import { editMotto, getAccount } from '../../../utilities/accounts-api';

export default function EditMotto({ motto, setMotto, account, setAccount }) {
    const [area, setArea] = useState('');

    function handleTextareaChange(event) {
        setArea(event.target.value);
    }

    function toggleMotto() {
        setMotto(!motto);
    }

    async function submitMotto() {
        try {
            await editMotto({ motto: area });
            toggleMotto();
            const updatedAccount = await getAccount();
            setAccount(updatedAccount);
        } catch (error) {
            console.error('There has been a huge error'.error)
        }
    }

    return (
        <div className='EditMottoBox'>

            <div className='EditMotto'>
                <h1>Edit Motto</h1>
                <h5>Write a little somethin about yourself dog</h5>
                <textarea maxLength="100"
                    placeholder="What's up doc?"
                    value={area}
                    onChange={handleTextareaChange} />
                <div className='MottoBtnBox'>
                    <button onClick={toggleMotto}>Cancel</button>
                    <button onClick={submitMotto}>Update</button>
                </div>
            </div>
        </div>
    )
}