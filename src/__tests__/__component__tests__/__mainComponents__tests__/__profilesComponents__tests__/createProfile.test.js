import React from "react";
import CreateProfile from "../../../../pages/main-component/profile-components/createProfile.jsx";

import { render, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import "@testing-library/jest-dom/extend-expect";

const mockedNavigator = jest.fn();  

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom")),
  useNavigate: () => ({
    navigate: mockedNavigator
  })
}));

describe('Profile create-profile component', () => {
    const original = window.alert;
  
    const callFn = () => {
      window.alert.call(true);
    };
  
    beforeAll(() => {
      Object.defineProperty(window, 'alert', {
        configurable: true,
        value: { call: jest.fn() },
      });
    });
  
    afterAll(() => {
      Object.defineProperty(window, 'alert', { configurable: true, value: original });
    });

    it("Profile create-profile male [success]", async () => {
        const data = {
            auth: true,
            user: {
              useremail: "shz@gmail.com",
              userid: 28,
              username: "shizafrenia",
              userpassword: "$2b$10$PidTYIDXKtUYEdOYnA4uQuhi9zM5wDySYD.XL5gIDecwf7lP1NOiC",
              userrole: "Admin"
            },
            accessToken: "jasnxigx901ns7238dwnxjsx"
          }
    
          window.localStorage.setItem("user", JSON.stringify(data.user));

        const fakeAnswer = {
            successMsg: 'Profile success create.'
        };
    
        jest.spyOn(global, "fetch").mockImplementation(() =>
          Promise.resolve({
            json: () => Promise.resolve(fakeAnswer)
          })
        );
    
        const { getByLabelText, getByTestId } = render(<CreateProfile />);
    
        const name = getByTestId("input-name");
        const surname = getByTestId("input-surname");
        const gender = getByLabelText("male");
        const bd = getByTestId("input-bd");
        const city = getByTestId("input-city");
    
        userEvent.type(name, "Valerij");
        userEvent.type(surname, "Beloglazov");
        userEvent.type(gender, "Male");
        userEvent.type(bd, "18.06.2001");
        userEvent.type(city, "Kyiv");
    
        userEvent.click(getByTestId("accept"));
        await waitFor(() => {
            const profile = fakeAnswer.successMsg;
            expect(profile).toEqual(fakeAnswer.successMsg);
        })
    })

    it("Profile create-profile female [success]", async () => {
        const fakeAnswer = {
            successMsg: 'Profile success create.'
        };
    
        jest.spyOn(global, "fetch").mockImplementation(() =>
          Promise.resolve({
            json: () => Promise.resolve(fakeAnswer)
          })
        );
    
        const { getByLabelText, getByTestId, getByText } = render(<CreateProfile />);
    
        const name = getByTestId("input-name");
        const surname = getByTestId("input-surname");
        const gender = getByLabelText("female");
        const bd = getByTestId("input-bd");
        const city = getByTestId("input-city");
    
        userEvent.type(name, "Sofya");
        userEvent.type(surname, "Beloglazova");
        userEvent.type(gender, "Female");
        userEvent.type(bd, "20.09.1999");
        userEvent.type(city, "Moscow");
    
        userEvent.click(getByTestId("accept"));
        await waitFor(() => {
            const profile = fakeAnswer.successMsg;
            expect(profile).toEqual(fakeAnswer.successMsg);
        })
    })

    it("Profile create-profile gender [unsuccess]", async () => {
        const fakeAnswer = {
            message: 'Profile unsuccess create. Cant find user.'
        };
    
        jest.spyOn(global, "fetch").mockImplementation(() =>
          Promise.resolve({
            json: () => Promise.resolve(fakeAnswer)
          })
        );
    
        const { getByLabelText, getByTestId, getAllByText } = render(<CreateProfile />);

        const name = getByTestId("input-name");
        const surname = getByTestId("input-surname");
        const gender = getByLabelText("male");
        const bd = getByTestId("input-bd");
        const city = getByTestId("input-city");
    
        userEvent.type(name, "Lagerta");
        userEvent.type(surname, "Lothdbrok");
        userEvent.type(gender, null);
        userEvent.type(bd, "11.04.941");
        userEvent.type(city, "Norway");
    
        userEvent.click(getByTestId("accept"));
        await waitFor(() => {
            callFn();
            expect(window.alert.call).toHaveBeenCalled();
        })
    })
});
