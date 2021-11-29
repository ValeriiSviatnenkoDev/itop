import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateAccount = () => {

    const[UserName, setUName] = useState('');
    const[UserEmail, setUEmail] = useState('');
    const[UserPassword, setUPassword] = useState('');
    const[UserRole, setURole] = useState('User');

    const[validNick, setValidNick] = useState('');
    const[validEmail, setValidEmail] = useState('');
    const[validPass, setValidPass] = useState('');
    const[validAccount, setValidAccount] = useState('');

    const [border, setBorderColor] = useState('1px solid #14142B');

    let navigate = useNavigate();

    const createAccount = async (e) => {
        e.preventDefault();

        try {
            if(UserName.length <= 0) {
                setValidNick('Please enter username');
            } else if(UserEmail.length <= 0) {
                setValidEmail('Please enter email');
            }  else if(UserPassword.length <= 0) {
                setValidPass('Please enter password (must be at least 8 symbols)');
            } else {
                if(UserName.length < 4) {
                    setValidNick('Username must be at least 4 symbols');
                } else if(UserPassword.length < 8) {
                    setValidPass('Password must be at least 8 symbols');
                } else {
                    const data = { "UserName": UserName, "UserEmail": UserEmail, "UserPassword": UserPassword, "UserRole": UserRole };
                    const response = await fetch("http://localhost:5000/user-register", {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },    
                        body: JSON.stringify(data)
                    });
            
                    const jsonData = await response.json();

                    if(jsonData.status) {
                        navigate('/user-login', {replace: true});
                        window.location.reload();
                    } else {
                        setValidAccount(jsonData.message);
                    }
                }
            }
        } catch (error) {
            console.error(error);
        }
    }
    
    return(
        <div class="main__container-signUp">
            <div class="signUp-title">
                Create your account
            </div>
            <div class="signUp-error">
                {validAccount}
            </div>

            <div class="signUp-form">
                <form onSubmit={createAccount}>
                    <label for="userName">Username</label>
                    <input type="text" id="userName" value={UserName} onChange={e => setUName(e.target.value)} style={UserName.length <= 0 ? {borderBottom: border} : null}></input>
                    <p>{validNick}</p> 
                    <label for="userEmail">Email</label>
                    <input type="email" id="userEmail" value={UserEmail} onChange={e => setUEmail(e.target.value)} style={UserEmail.length <= 0 ? {borderBottom: border} : null}></input>
                    <p>{validEmail}</p> 
                    <label for="userPassword">Password</label>
                    <input type="password" id="userPassword" value={UserPassword} onChange={e => setUPassword(e.target.value)} style={UserPassword.length <= 0 ? {borderBottom: border} : null}></input>
                    <p>{validPass}</p> 
                    <div class="signUp-checkBtn">
                        <input type="checkbox" name="radioAdmin" id="checkBox" value='User' onChange={e => e.target.checked && setURole('Admin')}></input>
                        <label for="checkBox">is admin</label>
                    </div>
                    <div class="signUp-Btn">
                        <button type="submit">Sign Up</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateAccount;