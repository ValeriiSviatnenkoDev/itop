import React from "react";
import OutputUserProfiles from "../../../../pages/main-component/user-components/outputUserProfiles";

import { act, render, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import "@testing-library/jest-dom/extend-expect";
import { UserProvider } from "../../../../pages/main-component/user-components/contextUser";


describe('Users output-user-profiles component', () => {

    it("Users output-user-profiles [success]", async () => {
        const userId = 28;

        const profiles = [
            {
                profileid: 1,
                profileuserid: 28,
                profilename: "Valerij",
                profilesurname: "Beloglazov",
                profilebd: "18.06.2001",
                profilecity: "Kyiv"
            },

            {
                profileid: 2,
                profileuserid: 28,
                profilename: "Sofya",
                profilesurname: "Beloglazova",
                profilebd: "20.09.1999",
                profilecity: "Moscow"
            },

            {
                profileid: 3,
                profileuserid: 28,
                profilename: "Veniamin",
                profilesurname: "Beloglazov",
                profilebd: "11.11.2026",
                profilecity: "Moscow"
            }
        ]

        const fakeAnswer = { profiles: profiles };

        jest.spyOn(global, "fetch").mockImplementation(() =>
            Promise.resolve({
                json: () => Promise.resolve(fakeAnswer)
            })
        );

        act(() => {
            render(
                <UserProvider value={userId}>
                    <OutputUserProfiles setLoading={(bool) => { }} />
                </UserProvider>
            );
        })
    });
});