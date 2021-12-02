import React, { useState } from "react";

/* profiles components */
import LoadingScreen from "./profile-components/loadScreen.jsx";
import OutputProfiles from "./profile-components/outputProfiles.jsx";
import EditProfile from "./profile-components/editProfile.jsx";
import CreateProfile from "./profile-components/createProfile.jsx";

/* profile context comp */
import ProfileContext from "./profile-components/contextProfile";



const ProfileMain = () => {
    const [showEdit, setShowEdit] = useState(false);
    const [showCreate, setShowCreate] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [profileId, setProfileId] = useState('');

    const createProfile = () => {
        setShowCreate(true);
    }

    return (
        <div>
            <div className="main__container-title">
                Profiles:
            </div>
            {
                isLoading &&
                <LoadingScreen />
            }
            <div className="main__container-profiles">
                <OutputProfiles setProfileId={setProfileId} setShowEdit={setShowEdit} setLoading={setLoading}/>
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
                        <ProfileContext.Provider value={profileId}>
                            <EditProfile />
                        </ProfileContext.Provider>
                    :
                        null
                }
                {
                    showCreate ?
                        <CreateProfile />
                    :
                        null
                }
            </div>
        </div>
    );
}

export default ProfileMain;