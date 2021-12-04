import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/* utils for client */
import { statusNavigate } from "../client-utils/util-auth-navigate.js";

/* custom hooks */
import useInput from "../customHooks/inputHook.js";

const CreateAccount = () => {

    const _username = useInput('', true);
    const _useremail = useInput('', true);
    const _userpassword = useInput('', true);

    const [UserRole, setURole] = useState('User');
    const [validAccount, setValidAccount] = useState('');

    let navigate = useNavigate();

    const createAccount = async (e) => {
        e.preventDefault();
        try {
            if(_useremail.value.length <= 0 || _username.value.length <= 0 || _userpassword.value.length <= 0) {
                return;
            }

            const data = { "UserName": _username.value, "UserEmail": _useremail.value, "UserPassword": _userpassword.value, "UserRole": UserRole };
            const response = await fetch("http://localhost:5000/user-register", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const jsonData = await response.json();
            setValidAccount(jsonData.message);

            const result = statusNavigate(jsonData.status);
            navigate(result, { replace: true });
            window.location.reload();
        
        } catch (error) {
        console.error(error);
    }
}

return (
    <div className="main__container-signUp">
        <div className="signUp-title">
            Create your account
        </div>
        <div className="signUp-error">
            {validAccount}
        </div>

        <div className="signUp-form">
            <form onSubmit={createAccount}>
                <label htmlFor="userName">Username</label>
                <input data-testid="username" type="text" id="userName" {..._username} style={_username.value.length <= 0 ? { borderBottom: _username.errStyle } : { borderBottom: '1px solid #14142B' }}></input>
                <p>{_username.errMsg}</p>
                <label htmlFor="userEmail">Email</label>
                <input data-testid="email" type="email" id="userEmail" {..._useremail} style={_useremail.value.length <= 0 ? { borderBottom: _useremail.errStyle } : { borderBottom: '1px solid #14142B' }}></input>
                <p>{_useremail.errMsg}</p>
                <label htmlFor="userPassword">Password</label>
                <input data-testid="password" type="password" id="userPassword" {..._userpassword} style={_userpassword.value.length <= 0 ? { borderBottom: _userpassword.errStyle } : { borderBottom: '1px solid #14142B' }}></input>
                <p>{_userpassword.errMsg}</p>
                <div className="signUp-checkBtn">
                    <input type="checkbox" name="radioAdmin" id="checkBox" value='User' onChange={e => e.target.checked && setURole('Admin')}></input>
                    <label htmlFor="checkBox">is admin</label>
                </div>
                <div className="signUp-Btn">
                    <button type="submit">Sign Up</button>
                </div>
            </form>
        </div>
    </div>
);
}

export default CreateAccount;