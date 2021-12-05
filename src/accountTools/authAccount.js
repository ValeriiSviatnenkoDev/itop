import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/* utils for client */
import { setLocaleStorage, getLocaleStorage } from "../client-utils/util-locale-storage.js";
import { rolesNavigate } from "../client-utils/util-auth-navigate.js";

/* custom hooks */
import useInput from "../customHooks/inputHook.js";

const AuthAccount = () => {
    const _useremail = useInput('', true);
    const _userpassword = useInput('', true);

    const [authStatus, setStatus] = useState('');

    let navigate = useNavigate();

    const authAccount = async (e) => {
        e.preventDefault();
        try {
            const data = { "UserEmail": _useremail.value, "UserPassword": _userpassword.value };
            const response = await fetch('http://localhost:5000/user-login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const jsonData = await response.json();
            setStatus(jsonData.message);

            if (jsonData.token !== getLocaleStorage('token', false)) {
                setLocaleStorage('token', jsonData.acsessToken);
                setLocaleStorage('user', JSON.stringify(jsonData.user));
                setLocaleStorage('status', jsonData.auth);

                const result = rolesNavigate(jsonData.auth, jsonData.user.userrole);
                navigate(result, { replace: true });
                window.location.reload();
            } else {
                setStatus('User has been authorization!');
            }

        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className="main__container-signIn">
            <div className="signIn-title">
                Sign in
            </div>
            <div className="signIn-error">
                {authStatus}
            </div>

            <div className="signIn-form">
                <form onSubmit={authAccount}>
                    <label htmlFor="uEmail">Email</label>
                    <input data-testid="email" type="email" id="uEmail" {..._useremail} style={_useremail.value.length <= 0 ? { borderBottom: _useremail.errStyle } : { borderBottom: '1px solid #14142B' }}></input>
                    <p>{_useremail.errMsg}</p>
                    <label htmlFor="uPassword">Password</label>
                    <input data-testid="password" type="password" id="uPassword" {..._userpassword} style={_userpassword.value.length <= 0 ? { borderBottom: _userpassword.errStyle } : { borderBottom: '1px solid #14142B' }}></input>
                    <p>{_userpassword.errMsg}</p>
                    <div className="signIn-Btn">
                        <button type='submit'>Sign In</button>
                    </div>
                </form>
                <a href='/user-register'>Sign Up</a>
            </div>
        </div>
    );
}

export default AuthAccount;