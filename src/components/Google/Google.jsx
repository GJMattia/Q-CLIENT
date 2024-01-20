import './Google.css';
import { jwtDecode } from "jwt-decode";
import { useEffect } from 'react';


export default function Google({ setUser }) {
    function hey(response) {
        console.log('Encoded JWT ID token:' + response.credential);
        let sauce = jwtDecode(response.credential);

        setUser(sauce)
        console.log(sauce)
    }

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: '278472483189-i60q3je7faglbpgr528i81agr29562db.apps.googleusercontent.com',
            callback: hey
        });

        google.accounts.id.renderButton(
            document.getElementById('Google'),
            { theme: 'outline', size: 'large' }
        )
    }, [])


    return (
        <div id='Google'></div>
    )
}