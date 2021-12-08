import React, { useState, useContext } from "react";

/* user context component */
import { UserContext } from "./contextUser";

/* custom hooks */
import useInput from "../../../customHooks/inputHook";

const EditUser = () => {
    const _usernick = useInput('', true);
    const _useremail = useInput('', true);

    const [message, setMsg] = useState('');
    const [role, setRole] = useState('');

    const { userNick, userEmail, userRole, userId } = useContext(UserContext);  

    const sendUpdateUser = async(e) => {
        e.preventDefault();
        try {
            if(role === '') {
                return setMsg('Please, select user role!');
            }

            if(_usernick.value.length <= 0) {
                _usernick.value = userNick;
            }

            if(_useremail.value.length <= 0) {
                _useremail.value = userEmail;
            }

            const data = { "UserId": userId, "UserName": _usernick.value, "UserRole": role, "UserEmail": _useremail.value };
            await fetch('http://localhost:5000/up-user/:id', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },    
                body: JSON.stringify(data)
            });
            
            setMsg("User updated successfully!");    
            window.location.reload();
        } catch (error) {
            console.error(error)
        }
    }

    const closeCreate = () => {
        window.location.reload();
    }


    return (
        <div className="main__container-edit">
            <div className="container-edit-user">
                <form onSubmit={sendUpdateUser}>
                    <label htmlFor="name">nick name:</label>
                    <input data-testid="username" type="text" id="nickname" {..._usernick} placeholder={userNick} style={_usernick.value.length <= 0 ? { borderBottom: _usernick._errorstyle } : { borderBottom: '1px solid #14142B' }}></input>
                    <label htmlFor="surname">email:</label>
                    <input data-testid="useremail" type="email" id="useremail" {..._useremail} placeholder={userEmail} style={_useremail.value.length <= 0 ? { borderBottom: _useremail._errorstyle } : { borderBottom: '1px solid #14142B' }}></input>
                    <label>role:</label>
                    <div data-testid="radio-roles" className="radio-roles">
                        <div data-testid="role" className="role">
                            <input data-testid="role-user" type="radio" name="role" id="user" value="user" defaultChecked={userRole === 'User' ? true : false} onChange={e => e.target.checked && setRole('User')}></input>
                            <label htmlFor="user">user</label>
                        </div>
                        <div data-testid="role" className="role">
                            <input data-testid="role-admin" type="radio" name="role" id="admin" value="admin" defaultChecked={userRole === 'Admin' ? true : false} onChange={e => e.target.checked && setRole('Admin')}></input>
                            <label htmlFor="admin">admin</label>
                        </div>
                    </div>
                    <div data-testid="control" className="edit-btns">
                        <button data-testid="accept" type='submit' className="accept-change"><i className="fas fa-check"></i></button>
                        <button onClick={closeCreate} type='submit' className="reject-change"><i className="fas fa-times"></i></button>
                    </div>
                </form>
            </div>
            <div className="container-error">
                <p>{message}</p>
            </div>
        </div>
    )
}

export default EditUser;