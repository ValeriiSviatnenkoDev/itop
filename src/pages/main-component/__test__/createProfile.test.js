import React from "react";
import CreateProfile from "../createProfile";
import { render, screen, act, waitFor} from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import "@testing-library/jest-dom/extend-expect";

const mockedNavigator = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom")),
  useNavigate: () => ({
    navigate: jest.fn().mockImplementation(() => ({}))
  })
}));

global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve({
        "ProfileUserId": 28, 
        "ProfileName": "Lagerta", 
        "ProfileSurname": "Lothdbrok", 
        "ProfileGender": "Female", 
        "ProfileBd": "12.04.961", 
        "ProfileCity": "Norway"
    })
}))

describe('Create profile component', () => {
   it("Input info profile", async ()  => {
        const {getByTestId} = render (<CreateProfile />);
        
        const profilename = getByTestId("input-name");
        const profilesurname = getByTestId("input-surname");
        const profilebd = getByTestId("input-bd");
        const profilecity = getByTestId("input-city");

        userEvent.type(profilename, "Valerij");
        userEvent.type(profilesurname, "Beloglazov");
        userEvent.type(profilebd, "18.06.2001");
        userEvent.type(profilecity, "Kyiv");

        userEvent.click(getByTestId("accept"));
        await waitFor(() => {
            expect(location("/get-profiles")).toBe("/get-profiles");
        })
   })
});