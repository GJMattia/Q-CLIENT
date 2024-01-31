import './ProPicUpload.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { updatePicture } from '../../../utilities/accounts-api';

export default function ProPicUpload({ account }) {

    const [selectedFile, setSelectedFile] = useState(null);


    function handleFileChange(event) {
        const file = event.target.files[0];
        setSelectedFile(file);
    };



    async function handleUpload() {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('profilePicture', selectedFile);

            try {
                const response = await axios.post('http://localhost:4741/upload-profile-picture', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                if (response.data.success) {
                    console.log('File uploaded successfully!');
                    try {
                        await updatePicture({ pic: response.data.imageUrl });

                        // const updatedAccount = await getAccount();
                        // setAccount(updatedAccount);
                    } catch (error) {
                        console.error('There has been a huge error'.error)
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
    };


    return (
        <>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
        </>

    )
}