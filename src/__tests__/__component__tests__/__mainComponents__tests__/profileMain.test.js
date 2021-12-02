import React from "react";
import ProfileMain from "../../../pages/main-component/profilesMain.jsx"

import { render, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import "@testing-library/jest-dom/extend-expect";


describe('Profiles all-profiles component', () => {
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
    
    it("Profile edit-profile male [success]", async () => {
        const fakeProfiles = {
            profile1: {
                profileid: 1,
                profileuserid: 1,
                profilename: "Viva",
                profilesurname: "Vento",
                profilegender: "Female",
                profilebd: "11.01.1966",
                profilecity: "Milan"
            },

            profile2: {
                profileid: 2,
                profileuserid: 1,
                profilename: "Leto",
                profilesurname: "Sandwick",
                profilegender: "Male",
                profilebd: "05.03.1126",
                profilecity: "Guleto"
            },

            profile3: {
                profileid: 3,
                profileuserid: 1,
                profilename: "Frank",
                profilesurname: "Winston",
                profilegender: "Male",
                profilebd: "21.07.1973",
                profilecity: "New York"
            },
        }
        const { getByTestId, getByText } = render(<ProfileMain />);

        jest.spyOn(global, "fetch").mockImplementation(() =>
            Promise.resolve({
                json: () => Promise.resolve(fakeProfiles)
            })
        );

        await waitFor(() => {
            const profile = getByText("name:");
            expect(profile).ToBeInTheDocument();
        })
    })

});


/*
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
*/