import React, { useEffect, useState } from "react";

const DashboardMain = () => {
    const[users, SetUsers] = useState('');
    const[profiles, SetProfiles] = useState('');
    const[profilesYo, SetProfilesYo] = useState('');

    const[countProfilesYo, setCountProfiles] = useState('')

    const countUsers = async(e) => {
        try {
            const response = await fetch('http://localhost:5000/get-users');
            const jsonData = await response.json();
            SetUsers(jsonData.users.length)
        } catch (error) {
            console.log(error.message);
        }
    }

    const countProfiles = async(e) => {
        try {
            const response = await fetch('http://localhost:5000/get-profiles');
            const jsonData = await response.json();
            SetProfiles(jsonData.profiles.length);
            SetProfilesYo(jsonData);

            let j = 0;
            for(let i= 0; i < profiles; i++) {
                if(parseInt(profilesYo[i].profilebd.split('.')[2]) <= 2003) {
                    j++;
                }
            }

            setCountProfiles(j)            
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        countUsers();
        countProfiles();
    })

    return (
        <div class="main__container-dashboard">

            <div class="dashboard__title"> 
                Dashboard:
            </div>

            <div class="dashboard__cards">
                <div class="cards dashboard__cards-users">
                    <p>Users:</p>
                    <p class="format count__users">{users}</p>
                </div>

                <div class="cards dashboard__cards-profiles">
                    <p>Profiles</p>
                    <p class="format count__profiles">{profiles}</p>
                </div>

                <div class="cards dashboard__cards-yo">
                    <p>Profiles over 18 years old:</p>
                    <p class="format count__yo">{countProfilesYo}</p>
                </div>
            </div>
        </div>

    );

}

export default DashboardMain;