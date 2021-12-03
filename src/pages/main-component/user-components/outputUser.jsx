import React, { useState,useContext, useEffect } from "react";
import OutputProfiles from "../profile-components/outputProfiles.jsx";

import UserContext from "./contextUser";
import OutputUserProfiles from "./outputUserProfiles.jsx";

const OutputUser = (props) => {
    const [isLoading, setLoading] = useState(false);

    const userData = useContext(UserContext);

    const editUser = (e, id) => {
        try {
            props.setEditUser(true);
        } catch (error) {
            console.error(error.message);
        }
    }

    const deleteUser = async(e) => {
        try {
            const data = { "UserId": userData.userid };
            const response = await fetch('http://localhost:5000/del-user/:id', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data) 
            })
            window.location.reload();
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <>
            <div className="main__container-info">
                <div className="container-user">
                    <p>{userData.usernick}</p>
                    <p>{userData.useremail}</p>
                    <p className="userrole">{userData.userrole}</p>
                    <div className="control-btns">
                        <i onClick={e => editUser(e, userData.userid)} className="fas fa-pencil-alt"></i>
                        <i onClick={deleteUser} className="far fa-trash-alt"></i>
                    </div>
                </div>
            </div>
            <div className="main__container-title">
                Profiles:
            </div>
            <div className="main__container-profiles">
                <OutputUserProfiles userId={userData.userid} setLoading={setLoading}/>
            </div>
        </>
    )
}

export default OutputUser;