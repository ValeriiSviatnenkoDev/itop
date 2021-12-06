import React from "react";

import EditUser from "../../../../pages/main-component/user-components/editUser.jsx";
import UserContext from "../../../../pages/main-component/user-components/contextUser.js";

import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";


describe('Users edit-user component', () => {

    it("Users edit-user male [success]", async () => {
        const userData = {
            userid: 28,
            userrole: "Admin"
        }

        const { getByTestId } = render(
            <UserContext.Provider value={userData}>
                <EditUser />
            </UserContext.Provider>
        );

        jest.spyOn(global, "fetch").mockImplementation(() =>
            Promise.resolve({
                json: () => Promise.resolve(fakeAnswer)
            })
        );

        const username = getByTestId("username");
        const useremail = getByTestId("useremail");

        userEvent.type(username, "shz@gmail.com");
        userEvent.type(useremail, "sh54321");

        userEvent.click(getByTestId("accept"));
        await waitFor(() => {
            reloadFn(); // as defined above..
            expect(window.location.reload).toHaveBeenCalled();
        })
    })

});