import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
    const [userNick, setUserNick] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userRole, setUserRole] = useState('');
    const [userId, setUId] = useState('');

    return(
        <UserContext.Provider value={{userNick, setUserNick, userEmail, setUserEmail, userRole, setUserRole, userId, setUId}}>
            {props.children}
        </UserContext.Provider>
    )
}