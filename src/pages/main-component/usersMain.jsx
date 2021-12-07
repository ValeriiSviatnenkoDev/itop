import React, { useState } from "react";

/* profile components */
import LoadingScreen from "../main-component/profile-components/loadScreen.jsx";

/* user components */
import EditUser from "./user-components/editUser.jsx";
import OutputUser from "../main-component/user-components/outputUser.jsx";
import OutputAllUsers from "./user-components/outputAllUsers.jsx";

/* user context comp */
import { UserProvider } from "./user-components/contextUser.js";

const UsersMain = () => {
    const [showUser, setShowUser] = useState(false);
    const [showEditUser, setEditUser] = useState(false);
    const [isLoading, setLoading] = useState(false);

    return (
        <div>
            <UserProvider>
            {
                showEditUser ?
                        <EditUser />
                    :
                    null
            }
            {
                showUser ?
                    <div>
                        <OutputUser setEditUser={setEditUser} />
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
                            <OutputAllUsers setShowUser={setShowUser} setLoading={setLoading}/>
                    </div>
            }
            </UserProvider>
        </div>
    );
}

export default UsersMain;