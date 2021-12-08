import React from "react";
import DashboardMain from "../../../pages/main-component/dashMain";

import { act, render, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import "@testing-library/jest-dom/extend-expect";

describe('Dashboard output-data-to-dashboard component', () => {
    
    it("Dashboard output-users-to-dashboard", async () => {
        const users = [
            {
                userid: 1,
                username: "user1"
            },

            {
                userid: 2,
                username: "user2"
            },

            {
                userid: 3,
                username: "user3"
            }
        ];
    
        jest.spyOn(global, "fetch").mockImplementation(() =>
            Promise.resolve({
                json: () => Promise.resolve(users)
            })
        );  
            
        act(() => {
            render(
                <DashboardMain />
            )
        })
    })

    it("Dashboard output-profiles-to-dashboard", async () => {
        const profiles = [ 
            {
                profileid: 1,
                profilename: "profilename1"
            },

            {
                profileid: 2,
                profilename: "profilename2"
            },

            {
                profileid: 3,
                profilename: "profilename3"
            }
        ];
    
        jest.spyOn(global, "fetch").mockImplementation(() =>
            Promise.resolve({
                json: () => Promise.resolve(profiles)
            })
        );  
            
        act(() => {
            render(
                <DashboardMain />
            )
        })
    })

});
