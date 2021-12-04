import React, { createContext, useState } from "react";

export const ProfileContext = createContext();

export const ProfileProvider = (props) => {
    const [profileId, setProfileId] = useState('');

    console.log(profileId)


    return(
        <ProfileContext.Provider value={{profileId, setProfileId}}>
            {props.children}
        </ProfileContext.Provider>
    )
}