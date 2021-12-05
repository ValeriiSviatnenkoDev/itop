import React, { useEffect, useState } from "react";

/* utils */
import { getLocaleStorage, clearLocaleStorage } from "../../client-utils/util-locale-storage"; 

const AdminHeader = () => {
    const [user, setUser] = useState('');

    const AdminHeader = async (e) => {
        setUser(getLocaleStorage('user', true));
    }

    const logOutAcc = async (e) => {
        clearLocaleStorage('status');
        clearLocaleStorage('token');
        clearLocaleStorage('user');
    }

    useEffect(() => {
        AdminHeader();
    }, []);

    return(
        <header>
                <div className="header__container">
                    <div className="header__container-user">
                        <a href="/get-profiles"><img src="./img/adminAvatar.png" alt="defaultAvatar"></img></a>
                        <a data-testid="username" className="user-link__userName" href="/get-profiles">{user.username}</a>
                    </div>
            
                    <div className="header__container-navigation">
                        <a data-testid="to-profiles" href="/get-profiles">Profiles <i className="fas fa-user-circle"></i></a>
                        <a data-testid="to-dashboard" href="/get-dashboard">Dashboard <i className="fas fa-chart-line"></i></a>
                        <a data-testid="to-users" href="/get-users">Users <i className="fas fa-user-friends"></i></a>
                    </div>
            
                    <div className="header__container-userAccount">
                        <a data-testid="to-login" href="/user-login" onClick={logOutAcc}>Log Out</a>
                    </div>
                </div>    
        </header>
    )
}

export default AdminHeader;