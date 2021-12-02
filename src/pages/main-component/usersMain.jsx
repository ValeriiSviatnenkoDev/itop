import React, { useState } from "react";

/* profile components */
import LoadingScreen from "../main-component/profile-components/loadScreen.jsx";

/* user components */
import EditUser from "./user-components/editUser.jsx";
import OutputUser from "../main-component/user-components/outputUser.jsx";
import OutputAllUsers from "./user-components/outputAllUsers.jsx";

/* user context comp */
import UserContext from "./user-components/contextUser.js";

const UsersMain = () => {

    const [showUser, setShowUser] = useState(false);
    const [showEditUser, setEditUser] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const [userNick, setUserNick] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userRole, setUserRole] = useState('');

    const [userId, setUId] = useState('');
    const [profiles, setProfiles] = useState([]);

    return (
        <div>
            {
                showEditUser ?
                    <UserContext.Provider value={userId}>
                        <EditUser />
                    </UserContext.Provider>
                    :
                    null
            }
            {
                showUser ?
                    <div>
                        <UserContext.Provider value={userId, userNick, userEmail, userRole}>
                            <OutputUser setUId={setUId} setEditUser={setEditUser} />
                        </UserContext.Provider>
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
                            <LoadingScreen />
                        }
                        <UserContext.Provider value={profiles}>
                            <OutputAllUsers setUserEmail={setUserEmail} setUserRole={setUserRole} setUserNick={setUserNick} setProfiles={setProfiles} setShowUser={setShowUser} setLoading={setLoading}/>
                        </UserContext.Provider>
                    </div>
            }

        </div>
    );
}

export default UsersMain;