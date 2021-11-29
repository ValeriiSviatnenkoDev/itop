import React, { useState} from "react";
import { useNavigate } from "react-router-dom";

const AuthAccount = () => {
    const [uEmail, setUEmail] = useState('');
    const [uPass, setUPass] = useState('');
    
    const [error, setErrorMsg] = useState('');
    const [border, setBorderColor] = useState('1px solid #14142B');
    const [authStatus, setStatus] = useState('');

    let navigate = useNavigate();

    const authAccount = async(e) => {
        e.preventDefault();     
        try {
            const data = { "UserEmail": uEmail, "UserPassword": uPass };
            const response = await fetch('http://localhost:5000/user-login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const jsonData = await response.json();
            setStatus(jsonData.message);
            if(uEmail.length <= 0 || uPass.length <= 0) {
                setErrorMsg('Enter email and password for authorization.');
                setBorderColor('1px solid #EB0055');
            } else {
                if(jsonData.token !== localStorage.getItem('token')) {
                    localStorage.setItem('token', jsonData.acsessToken);
                    localStorage.setItem('user', JSON.stringify(jsonData.user));
                    localStorage.setItem('status', jsonData.auth);
        
                    if(jsonData.auth === true && jsonData.user.userrole === 'User') {
                        navigate("/get-profiles", {replace: true});
                        window.location.reload();
                    } else if(jsonData.auth === true && jsonData.user.userrole === 'Admin') {
                        navigate("/get-users", {replace: true});
                        window.location.reload();
                    }
                } else {
                    alert('User has been logging.')
                }
            }
        } catch (error) {
           console.log(error.message);
        }
    }

    return (
        <div class="main__container-signIn">
            <div class="signIn-title">
                Sign in
            </div>
            <div class="signIn-error">
                {authStatus}
            </div>

            <div class="signIn-form">
                <form onSubmit={authAccount}>
                    <label for="uEmail">Email</label>
                    <input type="email" id="uEmail" value={uEmail} onChange={e => setUEmail(e.target.value)} style={{borderBottom: border}}></input>
                    <p>{error}</p>                        
                    <label for="uPassword">Password</label>
                    <input type="password" id="uPassword" value={uPass} onChange={e => setUPass(e.target.value)} style={{borderBottom: border}}></input>
                    <p>{error}</p>                        
                        <div class="signIn-Btn">
                            <button type='submit'>Sign In</button>
                        </div>
                </form>
                <a href='/user-register'>Sign Up</a>
            </div>
        </div>
    );
}

export default AuthAccount;