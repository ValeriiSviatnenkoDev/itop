import React from "react";
import { render } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import "@testing-library/jest-dom/extend-expect";

import OutputUser from "../../../../pages/main-component/user-components/outputUser";
import { UserProvider } from "../../../../pages/main-component/user-components/contextUser.js";

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

describe('Users output-user component', () => {
    it("Users output-user [success]", async () => {
        const userNick = setUserNick("Shozashiza");
        const userEmail = setUserEmail("shz@gmail.com");
        const userRole = setUserRole("Admin");
        const userId = setUId(28);

        render(
            <UserProvider value={{userNick, userEmail, userRole, userId}}>
                <OutputUser setEditUser={(bool) => { }}/>
            </UserProvider>
        );
    })

    it("Users delete-user [success]", async () => {
        const userNick = setUserNick("Shozashiza");
        const userEmail = setUserEmail("shz@gmail.com");
        const userRole = setUserRole("Admin");
        const userId = setUId(28);

        const { getByTestId, getByText } = render(
            <UserProvider value={{userNick, userEmail, userRole, userId}}>
                <OutputUser setEditUser={(bool) => { }}/>
            </UserProvider>
        );

        userEvent.click(getByTestId("deleteuser"));
        const screenText = getByText("Shozashiza");
        expect(!screenText).toBeInTheDocument();
    })

    it("Users output-user [success]", async () => {
        const userNick = setUserNick("Shozashiza");
        const userEmail = setUserEmail("shz@gmail.com");
        const userRole = setUserRole("Admin");
        const userId = setUId(28);

        const { getByTestId, getByText } = render(
            <UserProvider value={{userNick, userEmail, userRole, userId}}>
                <OutputUser setEditUser={(bool) => { }}/>
            </UserProvider>
        );

        userEvent.click(getByTestId("edituser"));
        const screenText = getByText("nick name:");
        expect(screenText).toBeInTheDocument();
    })

});