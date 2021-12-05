import React from "react";

/* utils */
import { getLocaleStorage, clearLocaleStorage } from "../../client-utils/util-locale-storage"; 

class UserHeader extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: getLocaleStorage('user', true)
        }

        this.logOutAcc = this.logOutAcc.bind(this);
    }

    logOutAcc() {
        clearLocaleStorage('status');
        clearLocaleStorage('token');
        clearLocaleStorage('user');
    }

    render() {
        return(
            <header>
                <div className="header__container">
                    <div className="header__container-user">
                        <a href="/get-profiles"><img src="./img/defaultAvatar.png" alt="defaultAvatar"></img></a>
                        <a className="user-link__userName" href="/get-profiles">{this.state.user.username}</a>
                    </div>
            
                    <div className="header__container-navigation">
                        <a href="/get-profiles">Profiles <i className="fas fa-user-circle"></i></a>
                    </div>
            
                    <div className="header__container-userAccount">
                        <a href="/user-login" onClick={this.logOutAcc}>Log Out</a>
                    </div>
                </div>    
            </header>
        );
    }
}

export default UserHeader;