import React, { useEffect, useState } from "react";
import CreateProfile from "./createProfile";
import EditProfile from "./profile-components/editProfile";

/* profiles components */
import LoadingScreen from "./profile-components/loadScreen";
import OutputProfiles from "./profile-components/outputProfiles";


const ProfileMain = (props) => {
    const [showEdit, setShowEdit] = useState(false);
    const [showCreate, setShowCreate] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const [profileId, setProfileId] = useState('');
    setProfileId(props.profileid);

    const createProfile = () => {

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
                <OutputProfiles />
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
                        <EditProfile profileid={profileId} />
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