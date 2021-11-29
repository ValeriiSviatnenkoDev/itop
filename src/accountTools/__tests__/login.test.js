import React from "react";
import AuthAccount from "../authAccount.js";
import { render, screen, waitFor} from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import "@testing-library/jest-dom/extend-expect";
import { Routes, Route } from "react-router";

const mockedNavigator = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom")),
  useNavigate: () => ({
    navigate: jest.fn().mockImplementation(() => ({}))
  })
}));

global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve({
        "UserEmail": "sho@gmail.com", 
        "UserPassword": "sho54321"
    })
}))

const UserLogin = useRoutes({ path: '/user-login', element: <AuthAccount /> });


describe('Auth login-user component', () => {
    it("Auth login-user", async ()  => {
         const { getByTestId } = render (<AuthAccount />);
         
         const useremail = getByTestId("email");
         const userpass = getByTestId("password");
 
         userEvent.type(useremail, "sho@gmail.com");
         userEvent.type(userpass, "sho54321");
 
         userEvent.click(getByText("Sign In"));
         await waitFor(() => {
             expect(UserLogin).toBe("/get-profiles");
         })
    })
 });
