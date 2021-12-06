import React from "react";

import OutputUser from "../../../../pages/main-component/user-components/outputUser";
import UserContext from "../../../../pages/main-component/user-components/contextUser.js";

import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";


describe('Users output-user component', () => {

    it("Users output-user [success]", async () => {
        const userData = {
            userid: 28,
            usernick: "shiza",
            useremail: "shz@gmail.com",
            userrole: "Admin"
        }

        render(
            <UserContext.Provider value={userData}>
                <OutputUser />
            </UserContext.Provider>
        );
    })

});