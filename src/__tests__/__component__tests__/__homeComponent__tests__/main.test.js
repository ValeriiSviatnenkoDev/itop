import React from "react";

import Main from "../../../pages/home-component/Main.jsx";
import AuthAccount from "../../../accountTools/authAccount.js";
import DashboardMain from "../../../pages/main-component/dashMain.jsx";

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
  

describe('Home main component', () => {
    it('Check status-auth-main', async () => {
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
    
        window.localStorage.setItem("status", JSON.stringify(data.auth));

        const statusData = JSON.parse(localStorage.getItem("status")); 

        const { getByText } = render(
            <Main />
        )
    
            if(statusData) {
                render(
                  <DashboardMain />
                )
            } else {
                render(
                    <AuthAccount />
                )
            }
    
        await waitFor(() => {
            const Dashboard = getByText('Dashboard:');
            expect(Dashboard).toBeInTheDocument();
        })
    })

})