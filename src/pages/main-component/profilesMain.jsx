import React, { useState } from "react";

/* profiles components */
import LoadingScreen from "./profile-components/loadScreen.jsx";
import OutputProfiles from "./profile-components/outputProfiles.jsx";
import EditProfile from "./profile-components/editProfile.jsx";
import CreateProfile from "./profile-components/createProfile.jsx";

/* profile context comp */
import { ProfileProvider } from "./profile-components/contextProfile.js";

const ProfileMain = () => {
    const [showEdit, setShowEdit] = useState(false);
    const [showCreate, setShowCreate] = useState(false);
    const [isLoading, setLoading] = useState(true);

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
            <div data-testid="list-profiles" className="main__container-profiles">
                <ProfileProvider>
                    <OutputProfiles setShowEdit={setShowEdit} setLoading={setLoading}/>

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
                            <EditProfile />
                    :
                        null                
                }
                {
                    showCreate ?
                        <CreateProfile />
                    :
                        null
                }
            </ProfileProvider>
            </div>
        </div>
    );
}

export default ProfileMain;