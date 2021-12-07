import React from "react";

import OutputAllUsers from "../../../../pages/main-component/user-components/outputAllUsers";
import { UserProvider } from "../../../../pages/main-component/user-components/contextUser.js";

import { render, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import "@testing-library/jest-dom/extend-expect";

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
        const users = {
            user_01: {
                userId: 100,
                userName: "Usertest",
                userEmail: "user@gmail.com",
                userRole: "User"
            },

            user_02: {
                userId: 101,
                userName: "Admintest",
                userEmail: "admin@gmail.com",
                userRole: "Admin"
            }
        }

        const fakeAnswer = { users: users };

        jest.spyOn(global, "fetch").mockImplementation(() =>
          Promise.resolve({
            json: () => Promise.resolve(fakeAnswer)
          })
        );    

        const userNick = setUserNick(users.user_02.userName);
        const userEmail = setUserEmail(users.user_02.userEmail);
        const userRole = setUserRole(users.user_02.userRole);
        const userId = setUId(101)

        render(
            <UserProvider value={{userNick, userEmail, userRole, userId}}>
                <OutputAllUsers setLoading={(bool) => {}}/>
            </UserProvider>
        );
    })
});