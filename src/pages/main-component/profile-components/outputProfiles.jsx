import React, { useContext, useEffect, useState } from "react";

/* utils for client */
import { getLocaleStorage } from "../../../client-utils/util-locale-storage";

/* profiles context comp */
import { ProfileContext } from "./contextProfile.js";

const OutputProfiles = (props) => {
    const [profiles, setProfiles] = useState([]);
    const [userId, setUId] = useState('')

    const { profileId, setProfileId} = useContext(ProfileContext);

    const outputProfiles = async (e) => {
        try {
            props.setLoading(true);
            const response = await fetch('http://localhost:5000/get-profiles');
            const jsonData = await response.json();
            setProfiles(jsonData.profiles);

            const uId = getLocaleStorage('user', true);
            setUId(uId.userid);

            console.log(profiles)

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
        props.setShowEdit(true);
        console.log(id)

        setProfileId(id);
    }

    useEffect(() => {
        outputProfiles();
    }, [])

    return (
        <>
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
                            <button data-testid="edit-btn" onClick={e => editProfile(e, profile.profileid)} className="btn-edit">edit <i className="fas fa-pencil-alt"></i></button>
                            <button onClick={e => deleteProfile(e, profile.profileid)} className="btn-delete">delete <i className="far fa-trash-alt"></i></button>
                        </div>
                    </div>
                ))
            }
        </>
    );
}

export default OutputProfiles;