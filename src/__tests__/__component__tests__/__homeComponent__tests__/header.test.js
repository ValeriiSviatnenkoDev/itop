import React from "react";
import Header from "../../../pages/home-component/Header.jsx";

import AdminHeader from "../../../pages/admin-page/adminHeader.jsx";
import UserHeader from "../../../pages/def-user-page/userHeader.jsx";

import { render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

const localStorageMock = (function () {
    let store = {};
  
    return {
      getItem(key) {
        return store[key];
      },
  
      setItem(key, value) {
        store[key] = value;
      },
  
      clear() {
        store = {};
      },
  
      removeItem(key) {
        delete store[key];
      },
  
      getAll() {
        console.log(store);
      },
    };
})();
  
Object.defineProperty(window, "localStorage", { value: localStorageMock });
  

describe('Home header component', () => {
    it('Check userrole-admin-header', async () => {
        const data = {
            auth: true,
            user: {
              useremail: "shz@gmail.com",
              userid: 28,
              username: "shizafrenia",
              userpassword: "$2b$10$PidTYIDXKtUYEdOYnA4uQuhi9zM5wDySYD.XL5gIDecwf7lP1NOiC",
              userrole: "Admin"
            },
            accessToken: "jasnxigx901ns7238dwnxjsx"
          }
    
        window.localStorage.setItem("user", JSON.stringify(data.user));

        const userData = JSON.parse(localStorage.getItem("user")); 

        const { getByText } = render(
            <Header />
        )
    
        if(userData.user != undefined) {
            if(userData.userrole == 'Admin') {
                render(
                  <AdminHeader />
                )
            } else {
                render(
                    <UserHeader />
                )
            }
        }
    
        await waitFor(() => {
            const Dashboard = getByText('Dashboard');
            expect(Dashboard).toBeInTheDocument();
        })
    })

    it('Check userrole-user-header', async () => {
        const data = {
            auth: true,
            user: {
              useremail: "shz@gmail.com",
              userid: 28,
              username: "shizafrenia",
              userpassword: "$2b$10$PidTYIDXKtUYEdOYnA4uQuhi9zM5wDySYD.XL5gIDecwf7lP1NOiC",
              userrole: "User"
            },
            accessToken: "jasnxigx901ns7238dwnxjsx"
          }
    
        window.localStorage.setItem("user", JSON.stringify(data.user));

        const userData = JSON.parse(localStorage.getItem("user")); 

        const { getByText } = render(
            <Header />
        )
    
        if(userData.user != undefined) {
            if(userData.userrole == 'Admin') {
                render(
                  <AdminHeader />
                )
            } else {
                render(
                    <UserHeader />
                )
            }
        }
    
        await waitFor(() => {
            const Dashboard = getByText('Profiles');
            expect(Dashboard).toBeInTheDocument();
        })
    })
})