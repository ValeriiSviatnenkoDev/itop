import React, { useState, useContext } from "react";
import UserContext from "./contextUser";

const EditUser = () => {
    const [error, setErrorMsg] = useState('');
    const userId = useContext(UserContext);

    const [newUserNick, setNewNick] = useState();
    const [newUserEmail, setNewEmail] = useState();
    const [role, setRole] = useState('');

    const [userNick, setUserNick] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userRole, setUserRole] = useState('');

    const sendUpdateUser = async(e) => {
        e.preventDefault();
        try {
            if(role === ' ') {
                setErrorMsg('Please, select user role!');
            } 
            
            const data = { "UserId": userId, "UserName": newUserNick, "UserRole": role, "UserEmail": newUserEmail };
            const response = await fetch('http://localhost:5000/up-user/:id', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },    
                body: JSON.stringify(data)
            });
            const jsonData = await response.json();
            
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
                    <label for="name">nick name:</label>
                    <input type="text" id="nickname" value={newUserNick} placeholder={userNick} onChange={e => setNewNick(e.target.value)}></input>
                    <label for="surname">email:</label>
                    <input type="email" id="email" value={newUserEmail} placeholder={userEmail} onChange={e => setNewEmail(e.target.value)}></input>
                    <label>role:</label>
                    <div className="radio-roles">
                        <div className="role">
                            <input type="radio" name="role" id="user" value="user" defaultChecked={userRole === 'User' ? true : false} onChange={e => e.target.checked && setRole('User')}></input>
                            <label for="user">user</label>
                        </div>
                        <div className="role">
                            <input type="radio" name="role" id="admin" value="admin" defaultChecked={userRole === 'Admin' ? true : false} onChange={e => e.target.checked && setRole('Admin')}></input>
                            <label for="admin">admin</label>
                        </div>
                    </div>
                    <div className="edit-btns">
                        <button type='submit' className="accept-change"><i className="fas fa-check"></i></button>
                        <button onClick={closeCreate} type='submit' className="reject-change"><i className="fas fa-times"></i></button>
                    </div>
                </form>
            </div>
            <div className="container-error">
                <p>{error}</p>
            </div>
        </div>
    )
}

export default EditUser;