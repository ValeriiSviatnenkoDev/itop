import React from "react";

import AdminHeader from "../admin-page/adminHeader";
import UserHeader from "../def-user-page/userHeader";
import Main from "./Main";

import { getLocaleStorage } from "../../client-utils/util-locale-storage";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: getLocaleStorage('user', true),
      statusAuth: getLocaleStorage('status', false)
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