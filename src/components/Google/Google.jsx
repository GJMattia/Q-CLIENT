import './Google.css';
import { jwtDecode } from "jwt-decode";
import { useEffect } from 'react';
import { signUp, login } from '../../../utilities/user-services';
import * as usersAPI from '../../../utilities/user-api';
import { createAccount } from '../../../utilities/accounts-api';

export default function Google({ setUser, log, setLog, setLoading }) {

    function toggleLog() {
        setLog(!log);
        document.body.style.overflow = log ? 'auto' : 'hidden';
    };

    async function googleFunction(response) {
        let googleInfo = jwtDecode(response.credential);
        let data = {
            name: googleInfo.name,
            email: googleInfo.email,
            password: 'slop344'
        };
        try {
            setLoading(true);
            const existingUser = await usersAPI.checkUser({
                email: googleInfo.email
            });
            if (existingUser) {
                const user = await login({
                    email: googleInfo.email,
                    password: 'slop344'
                });
                setUser(user);
                toggleLog();
            } else {
                const user = await signUp(data);
                createAccount({ userID: user._id });
                setUser(user);
                toggleLog();
            }

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        google.accounts.id.initialize({
            client_id: '278472483189-i60q3je7faglbpgr528i81agr29562db.apps.googleusercontent.com',
            callback: googleFunction
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