import React from "react";

import EditUser from "../../../../pages/main-component/user-components/editUser.jsx";
import { UserProvider } from "../../../../pages/main-component/user-components/contextUser.js";

import { render, waitFor } from "@testing-library/react";
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

        const { getAllByTestId, getByTestId, getByText, getByRole } = render(
            <UserProvider value={{ userId }}>
                <EditUser />
            </UserProvider>
        );

        jest.spyOn(global, "fetch").mockImplementation(() =>
            Promise.resolve({
                json: () => Promise.resolve(fakeAnswer)
            })
        );
        const radRole = getByTestId("radio-roles");
        const role = getAllByTestId("role");
        const userRole = getByRole('radio', { name: "admin" });

        userEvent.click(userRole);
        const username = getByTestId("username");
        const useremail = getByTestId("useremail");

        userEvent.type(username, "shopopalo");
        userEvent.type(useremail, "shz@gmail.com");

        const control = getByTestId("control");
        userEvent.click(getByTestId("accept"));
        await waitFor(() => {
            const message = getByText("User updated successfully!");
            expect(message).toBeInTheDocument();
        })
    })

    it("Users edit-user user use userdata [success]", async () => {
        const userId = 28;

        const { getAllByTestId, getByTestId, getByText, getByRole } = render(
            <UserProvider value={{ userId }}>
                <EditUser />
            </UserProvider>
        );

        jest.spyOn(global, "fetch").mockImplementation(() =>
            Promise.resolve({
                json: () => Promise.resolve(fakeAnswer)
            })
        );

        const radRole = getByTestId("radio-roles");
        const role = getAllByTestId("role");
        const userRole = getByRole('radio', { name: "user" });

        const userNick = "shopopalo";
        const userEmail = "sho@gmail.com";

        userEvent.click(userRole);
        const username = getByTestId("username");
        const useremail = getByTestId("useremail");

        userEvent.type(username, "");
        userEvent.type(useremail, "");

        const control = getByTestId("control");
        userEvent.click(getByTestId("accept"));
        await waitFor(() => {
            const message = getByText("User updated successfully!");
            expect(message).toBeInTheDocument();
        })
    })

    it("Users edit-user role undefined [unsuccess]", async () => {
        const userId = 28;

        const { getByTestId, getByText } = render(
            <UserProvider value={{ userId }}>
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

        const control = getByTestId("control");
        userEvent.click(getByTestId("accept"));
        const message = getByText("Please, select user role!");
        expect(message).toBeInTheDocument();
    })
});