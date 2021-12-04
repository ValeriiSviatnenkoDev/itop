import React, { useEffect, useState } from "react";

const DashboardMain = () => {
    const [users, setUsers] = useState('');
    const [profiles, setProfiles] = useState([]);

    const countUsers = async(e) => {
        try {
            const response = await fetch('http://localhost:5000/get-users');
            const jsonData = await response.json();
            setUsers(jsonData.users.length)
        } catch (error) {
            console.log(error.message);
        }
    }

    const countProfiles = async(e) => {
        try {
            const response = await fetch('http://localhost:5000/get-profiles');
            const jsonData = await response.json();
            setProfiles(jsonData.profiles);
 
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        countProfiles();
        countUsers();
    }, [])

    return (
        <div className="main__container-dashboard">

            <div className="dashboard__title"> 
                Dashboard:
            </div>

            <div className="dashboard__cards">
                <div className="cards dashboard__cards-users">
                    <p>Users:</p>
                    <p className="format count__users">{users}</p>
                </div>

                <div className="cards dashboard__cards-profiles">
                    <p>Profiles</p>
                    <p className="format count__profiles">{profiles.length}</p>
                </div>

                <div className="cards dashboard__cards-yo">
                    <p>Profiles over 18 years old:</p>
                    <p className="format count__yo">
                        {
                            profiles.filter(x => x.profilebd.split('.')[2] <= 2003).length
                        }
                    </p>
                </div>
            </div>
        </div>

    );

}

export default DashboardMain;