import React from "react";

import { render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { ProfileProvider } from "../../../../pages/main-component/profile-components/contextProfile";
import { setLocaleStorage } from "../../../../client-utils/util-locale-storage";
import OutputProfiles from "../../../../pages/main-component/profile-components/outputProfiles";
import userEvent from "@testing-library/user-event";

describe('Profile output-profiles component', () => {
    it("Profile output-profiles-render [success]", async () => {
        const user = {
            userId: 2,
            userName: "shoento",
            userEmail: "shoshosho@gmail.com",
            userRole: "User"
        }

        setLocaleStorage('user', JSON.stringify(user))

        const profiles = {
            profile_1: {
                profileid: 1,
                profileuserid: 2,
                profilename: "Valerij",
                profilesurname: "Beloglazov",
                profilebd: "18.06.2001",
                profilecity: "Kyiv"
            },

            profile_2: {
                profileid: 2,
                profileuserid: 2,
                profilename: "Sofya",
                profilesurname: "Beloglazova",
                profilebd: "20.09.1999",
                profilecity: "Moscow"
            },

            profile_3: {
                profileid: 3,
                profileuserid: 2,
                profilename: "Veniamin",
                profilesurname: "Beloglazov",
                profilebd: "11.11.2026",
                profilecity: "Moscow"
            },
        }

        const fakeAnswer = { profiles: profiles };

        jest.spyOn(global, "fetch").mockImplementation(() =>
            Promise.resolve({
                json: () => Promise.resolve(fakeAnswer)
            })
        );

        render(
            <ProfileProvider>
                <OutputProfiles setLoading={(bool) => { }} />
            </ProfileProvider>
        );

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

        const fakeAnswer = {successMsg: `Profile where ProfileId = ${profile.profileid} has been deleted`};

        jest.spyOn(global, "fetch").mockImplementation(() =>
            Promise.resolve({
                json: () => Promise.resolve(fakeAnswer)
            })
        );

        render(
            <ProfileProvider>
                <OutputProfiles setLoading={(bool) => { }} />
            </ProfileProvider>
        );
    })
})