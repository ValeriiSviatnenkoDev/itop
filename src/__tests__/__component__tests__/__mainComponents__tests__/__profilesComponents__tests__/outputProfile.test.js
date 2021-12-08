import React from "react";

import { render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { ProfileProvider } from "../../../../pages/main-component/profile-components/contextProfile";
import { setLocaleStorage } from "../../../../client-utils/util-locale-storage";
import OutputProfiles from "../../../../pages/main-component/profile-components/outputProfiles";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

describe('Profile output-profiles component', () => {
    it("Profile output-profiles-render [success]", async () => {
        const user = {
            userId: 2,
            userName: "shoento",
            userEmail: "shoshosho@gmail.com",
            userRole: "User"
        }

        setLocaleStorage('user', JSON.stringify(user))

        const profiles = [
            {
                profileid: 1,
                profileuserid: 2,
                profilename: "Valerij",
                profilesurname: "Beloglazov",
                profilebd: "18.06.2001",
                profilecity: "Kyiv"
            },

            {
                profileid: 2,
                profileuserid: 2,
                profilename: "Sofya",
                profilesurname: "Beloglazova",
                profilebd: "20.09.1999",
                profilecity: "Moscow"
            },

            {
                profileid: 3,
                profileuserid: 2,
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
                <ProfileProvider>
                    <OutputProfiles setLoading={(bool) => { }} />
                </ProfileProvider>
            );
        })

    })

    it("Profile delete-profiles-render [success]", async () => {
        const profile = {
            profileid: 1,
            profileuserid: 2,
            profilename: "Valerij",
            profilesurname: "Beloglazov",
            profilebd: "18.06.2001",
            profilecity: "Kyiv"

        }

        const user = {
            userId: 2,
            username: 'shopopalo',
            useremail: 'sho@gmail.com'
        }

        const fakeAnswer = { successMsg: `Profile where ProfileId = ${profile.profileid} has been deleted` };
        jest.spyOn(global, "fetch").mockImplementation(() =>
            Promise.resolve({
                json: () => Promise.resolve(fakeAnswer)
            })
        );

        setLocaleStorage('user', JSON.stringify(user));



        act(() => {
            render(
                <ProfileProvider>
                    <OutputProfiles setLoading={(bool) => { }} />
                </ProfileProvider>
            );
        })
    })
})