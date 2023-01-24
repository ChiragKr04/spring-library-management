import React, { useState } from 'react';
import "./Login.css"
import { ApiConstants } from "../../constants/ApiConstants"
import { RestApiService } from '../../utils/RestApiService';
import { useNavigate } from 'react-router-dom';

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassw] = useState("");
    const navigate = useNavigate();
    let currentUser = {};

    const navigateToHome = () => {
        navigate('/home', {
            state: {
                currentUser: currentUser
            }
        });
    }

    const loginUser = async () => {
        try {
            await RestApiService.post(
                ApiConstants.login,
                {
                    "Authorization": "any-auth-token"
                },
                {
                    "userEmail": email,
                    "userPass": password
                }
            ).then((result) => {
                currentUser = JSON.parse(JSON.stringify(result["data"]));
                console.log(`current user ${currentUser.userId}`);
                if (currentUser.userId != null) {
                    navigateToHome();
                }
            })
        } catch (e) {

        }
    }
    return (
        <div>
            <form action="" onSubmit={loginUser}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="passw">Password</label>
                    <input type="text" name="passw" id="passw" value={password} onChange={(e) => setPassw(e.target.value)} />
                </div>
                <button type="button" onClick={loginUser}>Login</button>
            </form>
        </div>
    )
}

