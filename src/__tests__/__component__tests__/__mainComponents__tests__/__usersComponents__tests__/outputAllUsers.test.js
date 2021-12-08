import React from "react";

import OutputAllUsers from "../../../../pages/main-component/user-components/outputAllUsers";
import { UserProvider } from "../../../../pages/main-component/user-components/contextUser.js";

import { render, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import "@testing-library/jest-dom/extend-expect";
import { act } from "react-dom/test-utils";

function setUserNick(params) {
    return params;
}

function setUserEmail(params) {
    return params;
}

function setUserRole(params) {
    return params;
}

function setUId(params) {
    return params;
}

describe('Users output-all-users component', () => {
    it("Users output-all-users [success]", async () => {
        const users = [
            {
                userId: 100,
                userName: "Usertest",
                userEmail: "user@gmail.com",
                userRole: "User"
            },

            {
                userId: 101,
                userName: "Admintest",
                userEmail: "admin@gmail.com",
                userRole: "Admin"
            }
        ]

        const fakeAnswer = { users: users };

        jest.spyOn(global, "fetch").mockImplementation(() =>
          Promise.resolve({
            json: () => Promise.resolve(fakeAnswer)
          })
        );    

        act(() => {
            const { getByTestId } = render(
                <UserProvider>
                    <OutputAllUsers setLoading={(bool) => {}} setShowUser={(bool) => {}}/>
                </UserProvider>
            );
        })
    })

    it("Users output-user-card [success]", async () => {
        const users = [
            {
                userId: 100,
                userName: "Usertest",
                userEmail: "user@gmail.com",
                userRole: "User"
            },

            {
                userId: 101,
                userName: "Admintest",
                userEmail: "admin@gmail.com",
                userRole: "Admin"
            }
        ]

        const fakeAnswer = { users: users };

        jest.spyOn(global, "fetch").mockImplementation(() =>
          Promise.resolve({
            json: () => Promise.resolve(fakeAnswer)
          })
        );    
        
        act(() => {
            const userNick = setUserNick("Usertest");
            const userEmail = setUserEmail("user@gmail.com");
            const userRole = setUserRole("User");
            const userId = setUId(100);
    
            const { getByTestId, getByText } = render(
                <UserProvider value={{setUserNick, setUserEmail, setUserRole, setUId}}>
                    <OutputAllUsers setLoading={(bool) => {}} setShowUser={(bool) => {}}/>
                </UserProvider>
            );
        })
    })
});