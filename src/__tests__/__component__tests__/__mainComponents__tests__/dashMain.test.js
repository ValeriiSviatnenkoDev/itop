import React from "react";
import DashboardMain from "../../../pages/main-component/dashMain";

import { render, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import "@testing-library/jest-dom/extend-expect";

describe('Dashboard output-data-to-dashboard component', () => {
    
    it("Dashboard output-users-to-dashboard", async () => {
        const users = { 
            user1: {
                userid: 1,
                username: "user1"
            },
            user2: {
                userid: 2,
                username: "user2"
            },
            user3: {
                userid: 3,
                username: "user3"
            }
        };
    
        jest.spyOn(global, "fetch").mockImplementation(() =>
            Promise.resolve({
                json: () => Promise.resolve(users)
            })
        );  
            
        render(
            <DashboardMain />
        )
    })

    it("Dashboard output-profiles-to-dashboard", async () => {
        const profiles = { 
            profiles1: {
                profileid: 1,
                profilename: "profilename1"
            },
            profiles2: {
                profileid: 2,
                profilename: "profilename2"
            },
            profiles3: {
                profileid: 3,
                profilename: "profilename3"
            }
        };
    
        jest.spyOn(global, "fetch").mockImplementation(() =>
            Promise.resolve({
                json: () => Promise.resolve(profiles)
            })
        );  
            
        render(
            <DashboardMain />
        )
    })

});
