import React from "react";

import AdminHeader from "../admin-page/adminHeader";
import UserHeader from "../def-user-page/userHeader";
import Main from "./Main";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: JSON.parse(localStorage.getItem('user')),
      statusAuth: localStorage.getItem('status')
    }
  }

  render() {
    if(this.state.user != undefined) {
      if(this.state.user.userrole == 'Admin') {
        return(
          <AdminHeader />
        );
      } else {
        return(
          <UserHeader />
        );
      }
    } else {
      return(
        <Main />
      );
    }
  }
}

export default Header;