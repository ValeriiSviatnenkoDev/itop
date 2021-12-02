import React, { useEffect, useState } from "react";

const UsersMain = () => {
    const [profiles, setProfiles] = useState([]);
    const [users, setUsers] = useState([]);

    const [showUser, setShowUser] = useState(false);
    const [showEditUser, setEditUser] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const [userNick, setUserNick] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userRole, setUserRole] = useState('');

    const [newUserNick, setNewNick] = useState();
    const [newUserEmail, setNewEmail] = useState();
    const [role, setRole] = useState('');

    const [userId, setUId] = useState('');
    const [editUserId, setEditId] = useState('');

    const outputUsers = async(e) => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:5000/get-users');
            const jsonData = await response.json();
            setUsers(jsonData.users);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error(error.message);
        }

        try {
            const response = await fetch('http://localhost:5000/get-profiles');
            const jsonData = await response.json();
            setProfiles(jsonData.profiles);
        } catch (error) {
            console.error(error.message);
        }
    }

    const openUser = async(e, user) => {
        try {
            setShowUser(true);

            setUserNick(user.username);
            setUserEmail(user.useremail);
            setUserRole(user.userrole);
            setUId(user.userid);
        } catch (error) {
            console.error(error.message)
        }
    }

    const editUser = (e, id) => {
        try {
            setEditUser(true);
            setEditId(id);
        } catch (error) {
            console.error(error.message);
        }
    }

    const deleteUser = async(e) => {
        try {
            const data = { "UserId": userId };
            const response = await fetch('http://localhost:5000/del-user/:id', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data) 
            })
            window.location.reload();
        } catch (error) {
            console.error(error.message);
        }
    }

    const editProfile = async(e) => {
        alert('Edit profile.');
    }

    const deleteProfile = async(e, id) => {
        try {
            const data = { "ProfileId": id }
            const response = await fetch(`http://localhost:5000/del-profile/:id`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            
            window.location.reload();

        } catch (error) {
            console.error(error.message);
        }
    }

    const sendUpdateUser = async(e) => {
        e.preventDefault();
        try {
            if(role === ' ') {
                return alert('Please, select user role!');
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

    useEffect(() => {
        outputUsers();
    }, []);


    return(
        <div>
            {
                showEditUser ?
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
                    
                    </div>
                :   
                    null
            }
            {
               showUser ? 
                <div>
                    <div className="main__container-info">
                        <div className="container-user">
                            <p>{userNick}</p>
                            <p>{userEmail}</p>
                            <p className="userrole">{userRole}</p>
                            <div className="control-btns">
                                <i onClick={e => editUser(e, userId)} className="fas fa-pencil-alt"></i>
                                <i onClick={deleteUser} className="far fa-trash-alt"></i>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <div className="main__container-title">
                                Profiles:
                            </div>
                            <div className="main__container-profiles">
                            {
                                profiles.filter(x => x.profileuserid == userId).map(profile => (
                                    <div className="profile-card">
                                        <div className="profile-info">
                                            <p className="pTitle">{profile.profilename} {profile.profilesurname}</p>
                                            <p>{profile.profilegender}</p>
                                            <p>{profile.profilebd}</p>
                                            <p>{profile.profilecity}</p>
                                        </div>
                                        <div className="profile-btn">
                                            <button onClick={editProfile} className="btn-edit">edit <i className="fas fa-pencil-alt"></i></button>
                                            <button onClick={e => deleteProfile(e, profile.profileid)} className="btn-delete">delete <i className="far fa-trash-alt"></i></button>
                                        </div>
                                    </div>
                                ))
                            }
                            </div>
                        </div>
                    </div>
                </div>
            /* TRUE */
                : 
                /* FALSE */
                <div>
                    <div className="main__container-title">
                        Users:
                    </div>
                    {
                    isLoading && 
                    <div className="main__container-load">
                        <div className="lds-dual-ring"></div>
                    </div>
                    }
                    <div className="main__container-users">
                        {
                            users.map(user => (
                                <div onClick={e => openUser(e, user)} className="user-card">
                                    <div className="user-info">
                                        <p className="pTitle">{user.username}</p>
                                        <p>{user.useremail}</p>
                                        <p>{profiles.filter(x => x.profileuserid == user.userid).length} Profiles</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            }
            
        </div>
    );
}

export default UsersMain;