import React from "react";

import EditProfile from "../../../../pages/main-component/profile-components/editProfile";
import { ProfileProvider } from "../../../../pages/main-component/profile-components/contextProfile.js";

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

    const profileId = 28;

    const { getByTestId, getByRole, getByText } = render(
      <ProfileProvider value={{ profileId }}>
        <EditProfile />
      </ProfileProvider>
    );

    const radGender = getByTestId("radio-gender");
    const gender = getByTestId("gender");
    const maleGender = getByRole('radio', { name: "male" });

    userEvent.click(maleGender);
    const name = getByTestId("input-name");
    const surname = getByTestId("input-surname");
    const bd = getByTestId("input-bd");
    const city = getByTestId("input-city");

    userEvent.type(name, "Zhenia");
    userEvent.type(surname, "Ponomarenko");
    userEvent.type(bd, "02.12.2000");
    userEvent.type(city, "Kyiv");
    expect(maleGender).toBeChecked();


    const control = getByTestId("control-profile");
    userEvent.click(getByTestId("edit-btn"));
    await waitFor(() => {
      const message = getByText("Profile updated successfully!");
      expect(message).toBeInTheDocument();
    })
  })

  it("Profile edit-profile gender undefined [unsuccess]", async () => {


    const profileId = 28;

    const { getByTestId, getByText } = render(
      <ProfileProvider value={{ profileId }}>
        <EditProfile />
      </ProfileProvider>
    );

    const name = getByTestId("input-name");
    const surname = getByTestId("input-surname");
    const gender = '';
    const bd = getByTestId("input-bd");
    const city = getByTestId("input-city");

    userEvent.type(name, "Zhenia");
    userEvent.type(surname, "Ponomarenko");
    userEvent.type(bd, "02.12.2000");
    userEvent.type(city, "Kyiv");

    const control = getByTestId("control-profile");
    userEvent.click(getByTestId("edit-btn"));
    await waitFor(() => {
      const message = getByText("Please, select profile gender!");
      expect(message).toBeInTheDocument();
    })
  })

  it("Profile edit-profile data undefined [unsuccess]", async () => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(fakeAnswer)
      })
    );

    const profileId = 28;

    const { getByTestId, getByText } = render(
      <ProfileProvider value={{ profileId }}>
        <EditProfile />
      </ProfileProvider>
    );

    const name = getByTestId("input-name");
    const surname = getByTestId("input-surname");
    const gender = '';
    const bd = getByTestId("input-bd");
    const city = getByTestId("input-city");

    userEvent.type(name, "");
    userEvent.type(surname, "");
    userEvent.type(bd, "");
    userEvent.type(city, "");

    const control = getByTestId("control-profile");
    userEvent.click(getByTestId("edit-btn"));
    await waitFor(() => {
      const message = getByText("Please, enter new info for profile or close edit form!");
      expect(message).toBeInTheDocument();
    })
  })
});

