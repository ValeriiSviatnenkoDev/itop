import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./contextUser";

const OutputAllUsers = (props) => {
    const [users, setUsers] = useState([]);
    const { setUserNick, setUserEmail, setUserRole, setUId } = useContext(UserContext);

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

            setUserNick(user.username);
            setUserEmail(user.useremail);
            setUserRole(user.userrole);
            setUId(user.userid);

        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect(() => {
        outputUsers();
    }, []);

    return (
        <>
            {
                users.map(user => (
                    <div data-testid="user-card" onClick={e => openUser(e, user)} className="user-card">
                        <div className="user-info">
                            <p data-testid="name" className="pTitle">{user.username}</p>
                            <p>{user.useremail}</p>
                             {/* <p>{contextProfiles.filter(x => x.profileuserid == user.userid).length} Profiles</p> */}
                        </div>
                    </div>
                ))
            }
        </>
    );
}

export default OutputAllUsers;
