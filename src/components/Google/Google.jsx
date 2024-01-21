import './Google.css';
import { jwtDecode } from "jwt-decode";
import { useEffect } from 'react';
import { signUp, login } from '../../../utilities/user-services';
import * as usersAPI from '../../../utilities/user-api';

export default function Google({ setUser }) {

    async function hey(response) {
        let googleInfo = jwtDecode(response.credential);
        let data = {
            name: googleInfo.name,
            email: googleInfo.email,
            password: 'slop344'
        };
        try {
            const existingUser = await usersAPI.checkUser({
                email: googleInfo.email
            });
            if (existingUser) {
                const user = await login({
                    email: googleInfo.email,
                    password: 'slop344'
                });
                setUser(user);
            } else {
                const user = await signUp(data);
                setUser(user);
            }

        } catch (error) {
            console.log(error);
        }
    };

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
        <button id='Google'></button>
    )
}