import React from "react";
import AdminHeader from "../../../pages/admin-page/adminHeader";

import { render, screen } from "@testing-library/react";
import { userEvent, fireEvent } from '@testing-library/user-event'

const mockedNavigator = jest.fn();  

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom")),
  useNavigate: () => ({
    navigate: mockedNavigator
  })
}));

describe('Header admin-header component', () => {
    it("Header render content component", () => {
        const component = new AdminHeader();
        component.state = {
          auth: true,
          user: {
            userid: 1,
            username: "shopopalo",
            useremail: "sho@gmail.com",
            userpassword: "sho54321"
          },
          accessToken: "jasnxigx901ns7238dwnxjsx"
        }

        console.log(component.state.user)
    });

    it("should navigate to pages", () => {
        const component = new AdminHeader();
        component.state = {
          auth: true,
          user: {
            userid: 1,
            username: "shopopalo",
            useremail: "sho@gmail.com",
            userpassword: "sho54321"
          },
          accessToken: "jasnxigx901ns7238dwnxjsx"
        }

        console.log(window.location.pathname)

        const { getByTestId } = render(
          <AdminHeader user={component.state}/>
        );

       

        // fireEvent.click(getByTestId("to-profiles"));
        // expect(window.location.pathname).toBe("/get-profiles");
    
        // fireEvent.click(getByTestId("to-dashboard"));
        // expect(window.location.pathname).toBe("/get-dashboard");
    
        // fireEvent.click(getByTestId("to-users"));
        // expect(window.location.pathname).toBe("/get-users");

        // fireEvent.click(getByTestId("to-login"));
        // expect(window.location.pathname).toBe("/user-login");
    });
});
