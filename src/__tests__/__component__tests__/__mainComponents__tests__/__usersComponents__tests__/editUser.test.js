import React from "react";

import EditUser from "../../../../pages/main-component/user-components/editUser.jsx";
import { UserProvider } from "../../../../pages/main-component/user-components/contextUser.js";

import { render } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import "@testing-library/jest-dom/extend-expect";

describe('Users edit-user component', () => {
    const original = window.location;

    const reloadFn = () => {
        window.location.reload(true);
    };

    beforeAll(() => {
        Object.defineProperty(window, 'location', {
            configurable: true,
            value: { reload: jest.fn() },
        });
    });

    afterAll(() => {
        Object.defineProperty(window, 'location', { configurable: true, value: original });
    });


    it("Users edit-user male [success]", async () => {
        const userId = 28;

        const { getByTestId } = render(
            <UserProvider value={{userId}}>
                <EditUser />
            </UserProvider>
        );

        jest.spyOn(global, "fetch").mockImplementation(() =>
            Promise.resolve({
                json: () => Promise.resolve(fakeAnswer)
            })
        );

        const username = getByTestId("username");
        const useremail = getByTestId("useremail");

        userEvent.type(username, "shopopalo");
        userEvent.type(useremail, "shz@gmail.com");

        userEvent.click(getByTestId("accept"));
        reloadFn();
        expect(window.location.reload).toHaveBeenCalled();
    })
});