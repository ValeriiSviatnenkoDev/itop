import React, { useEffect, useState } from "react";
import CreateProfile from "./createProfile";


const ProfileMain = () => {
    const [profiles, setProfiles] = useState([]);
    const [userId, setUId] = useState(0);
    const [profileId, setProfileId] = useState('');

    const [border, setBorderColor] = useState('1px solid #14142B');
    const [error, setErrorMsg] = useState('');

    const [showEdit, setEdit] = useState(false);
    const [showCreate, setShowCreate] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const [uName, setUName] = useState('');
    const [uSurname, setUSurname] = useState('');
    const [gender, setGender] = useState('');
    const [uBd, setUBd] = useState('');
    const [uCity, setUCity] = useState('');

    const outputProfiles = async(e) => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:5000/get-profiles');
            const jsonData = await response.json();
            setProfiles(jsonData.profiles);

            const uId = JSON.parse(localStorage.getItem('user')); 
            setUId(uId.userid);

            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error.message);
        }
    }

    const createProfile = async(e) => {
        try {
            setShowCreate(true);
        } catch (error) {
            console.error(error.message);
        }
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

    const editProfile = async(e, id) => {
        try {
            setEdit(true);
            setProfileId(id)
        } catch (error) {
            console.error(error);
        }
    }

    const sendUpdateProfile = async(e) => {
        e.preventDefault();
        try {
           if(uName.length <= 0 || uSurname.length <= 0 || gender.length <= 0 || uBd.length <= 0 || uCity.length <= 0) {
                setBorderColor('1px solid #EB0055');
                setErrorMsg('Please, enter new info for profile or close edit form!');
           } else {
                if(gender === '') {
                    return alert('Please, select profile gender!');
                }

                const data = { "ProfileId": profileId, "ProfileName": uName, "ProfileSurname": uSurname, "ProfileGender": gender, "ProfileBd": uBd, "ProfileCity": uCity };
                const response = await fetch('http://localhost:5000/up-profile/:id', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },    
                    body: JSON.stringify(data)
                });
                const jsonData = await response.json();
                
                window.location.reload();
           }
        } catch (error) {
            console.error(error)
        }
    }

    const closeCreate = () => {
        setEdit(false);
        window.location.reload();
    }

    useEffect(() => {
        outputProfiles();
    }, []);

    return(
        <div>
            <div className="main__container-title">
                Profiles:
            </div>
            {
                isLoading && 
                <div className="main__container-load">
                    <div className="lds-dual-ring"></div>
                </div>
            }
            <div className="main__container-profiles">
                {
                    profiles.filter(x => x.profileuserid === userId).map(profile => (
                        <div className="profile-card">
                            <div className="profile-info">
                                <p className="pTitle">{profile.profilename} {profile.profilesurname}</p>
                                <p>{profile.profilegender}</p>
                                <p>{profile.profilebd}</p>
                                <p>{profile.profilecity}</p>
                            </div>
                            <div className="profile-btn">
                                <button onClick={e => editProfile(e, profile.profileid)} className="btn-edit">edit <i className="fas fa-pencil-alt"></i></button>
                                <button onClick={e => deleteProfile(e, profile.profileid)} className="btn-delete">delete <i className="far fa-trash-alt"></i></button>
                            </div>
                        </div>
                    ))
                }
                {
                    isLoading ? 
                        null 
                    : 
                        <div onClick={createProfile} className="profile-card profiles-createCard">
                            <div className="plus-profile">+</div>
                            <p>Create new profile</p>
                        </div>
                }
                {
                    showEdit ? 
                    <div className="main__container-edit">
                        <div className="container-edit">
                            <form onSubmit={sendUpdateProfile}>
                                <label htmlFor="name">name:</label>
                                <input type="text" id="name" value={uName} onChange={e => setUName(e.target.value)} style={{borderBottom: border}}></input>                        
                                <label htmlFor="surname">surname:</label>
                                <input type="text" id="surname" value={uSurname} onChange={e => setUSurname(e.target.value)} style={{borderBottom: border}}></input>
                                <label>gender:</label>
                                <div className="radio-gender">
                                    <div className="male">
                                        <input type="radio" name="gender" id="male" value="male" onChange={e => e.target.checked && setGender('Male')}></input>
                                        <label htmlFor="male">male</label>
                                    </div>
                                    <div className="male">
                                        <input type="radio" name="gender" id="female" value="female" onChange={e => e.target.checked && setGender('Female')}></input>
                                        <label htmlFor="female">female</label>
                                    </div>
                                </div>
                                <label htmlFor="profiledb">birthdate:</label>
                                <input type="text" name="profilebd" id="profiledb" value={uBd} onChange={e => setUBd(e.target.value)} style={{borderBottom: border}}></input>
                                <label htmlFor="profilec">city:</label>
                                <input type="text" name="profilec" id="profilec" value={uCity} onChange={e => setUCity(e.target.value)} style={{borderBottom: border}}></input>
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
                    :
                    null
                }
                {
                    showCreate ? <CreateProfile /> : null
                }
            </div>
        </div>
    );
}

export default ProfileMain;