import React, { useContext, useEffect, useState } from "react";
import UserContext from "./contextUser";

const OutputAllUsers = (props) => {
    const [users, setUsers] = useState([]);
    const profiles = useContext(UserContext);

    const outputUsers = async (e) => {
        try {
            props.setLoading(true);
            const response = await fetch('http://localhost:5000/get-users');
            const jsonData = await response.json();
            setUsers(jsonData.users);

            props.setLoading(false);
        } catch (error) {
            props.setLoading(false);
            console.error(error.message);
        }
    };

    const openUser = async (e, user) => {
        try {
            props.setShowUser(true);

            props.setUserNick(user.username);
            props.setUserEmail(user.useremail);
            props.setUserRole(user.userrole);
            props.setUId(user.userid);

        } catch (error) {
            console.error(error.message)
        }
    }


    useEffect(() => {
        outputUsers();
    }, []);

    return(
        <div className="main__container-users">
        {
            users.map(user => (
                <div onClick={e => openUser(e, user)} className="user-card">
                    <div className="user-info">
                        <p className="pTitle">{user.username}</p>
                        <p>{user.useremail}</p>
                        <p>{profiles.filter(x => x.profileuserid == user.userid).length} Profiles</p>
                    </div>
                </div>
            ))
        }
    </div>
    );
}

export default OutputAllUsers;
