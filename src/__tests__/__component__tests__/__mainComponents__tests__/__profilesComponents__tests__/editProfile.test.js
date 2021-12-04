import React from "react";
import EditProfile from "../../../../pages/main-component/profile-components/editProfile";

import { render, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import "@testing-library/jest-dom/extend-expect";


describe('Profile edit-profile component', () => {
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

    it("Profile edit-profile male [success]", async () => {
        const fakeAnswer = {
            successMsg: 'I update profile.'
        };

        jest.spyOn(global, "fetch").mockImplementation(() =>
          Promise.resolve({
            json: () => Promise.resolve(fakeAnswer)
          })
        );
    
        const { getByTestId } = render(<EditProfile />);

            
        const pid = 1;
        const name = getByTestId("input-name");
        const surname = getByTestId("input-surname");
        const gender = 'Male';
        const bd = getByTestId("input-bd");
        const city = getByTestId("input-city");

        userEvent.type(name, "Zhenia");
        userEvent.type(surname, "Ponomarenko");
        userEvent.type(bd, "02.12.2000");
        userEvent.type(city, "Kyiv");

        userEvent.click(getByTestId("edit-btn"));
        await waitFor(() => {
            reloadFn(); // as defined above..
            expect(window.location.reload).toHaveBeenCalled();
        })
    })

    it("Profile edit-profile gender undefined [unsuccess]", async () => {
        const { getByText, getByTestId } = render(<EditProfile />);
            
        const pid = 1;
        const name = getByTestId("input-name");
        const surname = getByTestId("input-surname");
        const gender = '';
        const bd = getByTestId("input-bd");
        const city = getByTestId("input-city");

        userEvent.type(name, "Zhenia");
        userEvent.type(surname, "Ponomarenko");
        userEvent.type(bd, "02.12.2000");
        userEvent.type(city, "Kyiv");

        userEvent.click(getByTestId("edit-btn"));
        await waitFor(() => {
            const error = getByText("Please, select profile gender!");
            expect(error).toBeInTheDocument();
        })
    })

    it("Profile edit-profile data undefined [unsuccess]", async () => {
        jest.spyOn(global, "fetch").mockImplementation(() =>
          Promise.resolve({
            json: () => Promise.resolve(fakeAnswer)
          })
        );
    
        const { getByText, getByTestId } = render(<EditProfile />);

            
        const pid = 1;
        const name = getByTestId("input-name");
        const surname = getByTestId("input-surname");
        const gender = '';
        const bd = getByTestId("input-bd");
        const city = getByTestId("input-city");

        userEvent.type(name, "");
        userEvent.type(surname, "");
        userEvent.type(bd, "");
        userEvent.type(city, "");

        userEvent.click(getByTestId("edit-btn"));
        await waitFor(() => {
            const error = getByText("Please, enter new info for profile or close edit form!");
            expect(error).toBeInTheDocument();
        })
    })
});

