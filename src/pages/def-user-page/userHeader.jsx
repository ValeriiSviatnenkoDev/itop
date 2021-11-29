import React from "react";


class UserHeader extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: JSON.parse(localStorage.getItem('user'))
        }

        this.logOutAcc = this.logOutAcc.bind(this);
    }

    logOutAcc() {
        localStorage.removeItem('status');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    render() {
        return(
            <header>
                <div class="header__container">
                    <div class="header__container-user">
                        <a href="/get-profiles"><img src="./img/defaultAvatar.png" alt="defaultAvatar"></img></a>
                        <a class="user-link__userName" href="/get-profiles">{this.state.user.username}</a>
                    </div>
            
                    <div class="header__container-navigation">
                        <a href="/get-profiles">Profiles <i class="fas fa-user-circle"></i></a>
                    </div>
            
                    <div class="header__container-userAccount">
                        <a href="/user-login" onClick={this.logOutAcc}>Log Out</a>
                    </div>
                </div>    
            </header>
        );
    }
}

export default UserHeader;