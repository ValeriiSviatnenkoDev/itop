import React, { useEffect, useState } from "react";

import EditProfile from "../profile-components/editProfile";

const OutputUserProfiles = (props) => {
    const [showEditProfile, setShowEdit] = useState(false);
    const [profiles, setProfiles] = useState([])
    const [profileId, setProfileId] = useState('');

    const outputProfiles = async (e) => {
        try {
            props.setLoading(true);
            const response = await fetch('http://localhost:5000/get-profiles');
            const jsonData = await response.json();
            setProfiles(jsonData.profiles);
            props.setLoading(false);
        } catch (error) {
            props.setLoading(false);
            console.log(error.message);
        }
    }

    const deleteProfile = async (e, id) => {
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

    const editProfile = (e, id) => {
        setShowEdit(true);
        setProfileId(id);
    }

    useEffect(() => {
        outputProfiles();
    }, [])

    return (
        <>
            {
                profiles.filter(x => x.profileuserid === props.userId).map(profile => (
                    <div className="profile-card">
                        <div className="profile-info">
                            <p className="pTitle">{profile.profilename} {profile.profilesurname}</p>
                            <p>{profile.profilegender}</p>
                            <p>{profile.profilebd}</p>
                            <p>{profile.profilecity}</p>
                        </div>
                        <div className="profile-btn">
                            <button data-testid="edit-btn" onClick={e => editProfile(e, profile.profileid)} className="btn-edit">edit <i className="fas fa-pencil-alt"></i></button>
                            <button onClick={e => deleteProfile(e, profile.profileid)} className="btn-delete">delete <i className="far fa-trash-alt"></i></button>
                        </div>
                    </div>
                ))
            }
            {
                showEditProfile ?
                    <div className="main__container-edit">
                        <EditProfile profileId={profileId}/>
                    </div>
                :
                    null
            }
        </>
    );
}

export default OutputUserProfiles;