import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AuthAccount from "../../accountTools/authAccount";
import CreateAccount from '../../accountTools/createAccount';
import ProfileMain from "../main-component/profilesMain";
import DashboardMain from "../main-component/dashMain";
import UsersMain from "../main-component/usersMain";

import { getLocaleStorage } from "../../client-utils/util-locale-storage";

class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            statusAuth: getLocaleStorage('status', false)
        }
    }

    render() {
      return(
        <main>
            <div className="main__container">
                <BrowserRouter>
                        {
                            this.state.statusAuth ? <Routes>
                                <Route path="/get-profiles" element={<ProfileMain />} />
                                <Route path="/get-dashboard" element={<DashboardMain />} />
                                <Route path="/get-users" element={<UsersMain />} />
                            </Routes>
                            :
                            <Routes>
                                <Route path="/" element={<AuthAccount />} />
                                <Route path="/user-register" element={<CreateAccount />} />
                                <Route path="/user-login" element={<AuthAccount />} />
                            </Routes>
                        }  
                </BrowserRouter>
            </div>
        </main>
      );
    }
}

export default Main;