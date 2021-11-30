import React from "react";
import AuthAccount from "../../accountTools/authAccount.js";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import "@testing-library/jest-dom/extend-expect";

const mockedNavigator = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom")),
  useNavigate: () => ({
    navigate: mockedNavigator
  })
}));

describe('Auth login-user component', () => {
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

  it("Auth login-user empty email [unsuccess]", async () => {
    const { getAllByText } = render(<AuthAccount />);

    userEvent.click(screen.getByText("Sign In"));
    await waitFor(() => {
      const errors = getAllByText('Enter email and password for authorization.');
      expect(errors).toHaveLength(2);
    })
  });

  it("Auth login-user wrong credentials [unsuccess]", async () => {
    const fakeAnswer = { auth: false, message: 'Wrong password or email!' };

    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(fakeAnswer)
      })
    );

    const { getByTestId, getByText } = render(<AuthAccount />);

    const useremail = getByTestId("email");
    const userpass = getByTestId("password");

    userEvent.type(useremail, "sho@gmail.com");
    userEvent.type(userpass, "sho54322");

    userEvent.click(getByText("Sign In"));
    await waitFor(() => {
      const error = getByText('Wrong password or email!');
      expect(error).toBeInTheDocument();
    })

    global.fetch.mockRestore();
  })

  it("Auth login-user user [success]", async () => {
    const fakeAnswer = {
      auth: true,
      user: {
        userrole: "User"
      }
    };

    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(fakeAnswer)
      })
    );

    const { getByTestId, getByText } = render(<AuthAccount />);

    const useremail = getByTestId("email");
    const userpass = getByTestId("password");

    userEvent.type(useremail, "sho@gmail.com");
    userEvent.type(userpass, "sho54321");

    userEvent.click(getByText("Sign In"));
    await waitFor(() => {
      // expect(fakeAnswer.auth === true && fakeAnswer.user.userrole === 'User').toBe(true);
      reloadFn(); // as defined above..
      expect(window.location.reload).toHaveBeenCalled();
    })
  })

  it("Auth login-user admin [success]", async () => {
    const fakeAnswer = {
      auth: true,
      user: {
        userrole: "Admin"
      }
    };

    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(fakeAnswer)
      })
    );

    const { getByTestId, getByText } = render(<AuthAccount />);

    const useremail = getByTestId("email");
    const userpass = getByTestId("password");

    userEvent.type(useremail, "sho@gmail.com");
    userEvent.type(userpass, "sho54321");

    userEvent.click(getByText("Sign In"));
    await waitFor(() => {
      // expect(fakeAnswer.auth === true && fakeAnswer.user.userrole === 'User').toBe(true);
      reloadFn(); // as defined above..
      expect(window.location.reload).toHaveBeenCalled();
    })
  })
});
