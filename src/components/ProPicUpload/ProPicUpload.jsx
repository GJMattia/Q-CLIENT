import React, { useState } from 'react';
import axios from 'axios';
import { updatePicture } from '../../../utilities/accounts-api';
import { getAccount } from '../../../utilities/accounts-api';
import './ProPicUpload.css';



export default function ProPicUpload({ setAccount, pic, setPic }) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewURL, setPreviewURL] = useState(null);

    function handleFileChange(event) {
        const file = event.target.files[0];
        setSelectedFile(file);
        setPreviewURL(file ? URL.createObjectURL(file) : null);
    };

    async function handleUpload() {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('profilePicture', selectedFile);

            try {
                const response = await axios.post('http://localhost:4741/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                if (response.data.success) {
                    console.log('File uploaded successfully!');
                    try {
                        await updatePicture({ pic: response.data.imageUrl });
                        const updatedAccount = await getAccount();
                        setAccount(updatedAccount);
                        togglePic();
                    } catch (error) {
                        console.error('There has been a huge error', error);
                    }
                } else {
                    console.error('Error uploading file:', response.data.message);
                }
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        } else {
            console.log('No file selected');
        }
    }

    function togglePic() {
        setPic(!pic);
        setPreviewURL(null);
        document.body.style.overflow = pic ? 'auto' : 'hidden';
    }

    return (
        <div className='EditMottoBox'>
            <div className='EditPic'>
                <h1>Change Profile Picture</h1>
                <input className='ChoosePic' type="file" accept="image/*" onChange={handleFileChange} />
                {previewURL && <img src={previewURL} alt="Preview" className="PicPreview" />}
                <div className='PicBtnBox'>
                    <button onClick={togglePic}>Cancel</button>
                    <button onClick={handleUpload}>Upload</button>
                </div>
            </div>
        </div>
    );
}
