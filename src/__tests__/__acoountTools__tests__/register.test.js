import React from "react";
import CreateAccount from "../../accountTools/createAccount";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import "@testing-library/jest-dom/extend-expect";
import { getMaxListeners } from "process";

const mockedNavigator = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom")),
  useNavigate: () => ({
    navigate: mockedNavigator
  })
}));

describe('Auth register-user component', () => {
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

  it("Auth register-user empty username [unsuccess]", async () => {
    const { getByTestId, getByText } = render(<CreateAccount />);
    const useremail = getByTestId("email");
    const userpass = getByTestId("password");
    const username = getByTestId("username");

    userEvent.type(useremail, "koi@gmail.com");
    userEvent.type(userpass, "koi54321");
    userEvent.type(username, "");

    userEvent.click(getByText("Sign Up"));
    await waitFor(() => {
      const errors = getByText('Please enter username');
      expect(errors).toBeInTheDocument();
    })
  });

  it("Auth register-user empty email [unsuccess]", async () => {
    const { getByTestId, getByText } = render(<CreateAccount />);

    const useremail = getByTestId("email");
    const userpass = getByTestId("password");
    const username = getByTestId("username");

    userEvent.type(useremail, "");
    userEvent.type(userpass, "koi54321");
    userEvent.type(username, "koi");

    userEvent.click(getByText("Sign Up"));
    await waitFor(() => {
      const errors = getByText('Please enter email');
      expect(errors).toBeInTheDocument();
    })
  });

  it("Auth register-user empty password [unsuccess]", async () => {
    const { getByTestId, getByText } = render(<CreateAccount />);
    const useremail = getByTestId("email");
    const userpass = getByTestId("password");
    const username = getByTestId("username");

    userEvent.type(useremail, "koi@gmail.com");
    userEvent.type(userpass, "");
    userEvent.type(username, "koi");

    userEvent.click(getByText("Sign Up"));
    await waitFor(() => {
      const errors = getByText('Please enter password (must be at least 8 symbols)');
      expect(errors).toBeInTheDocument();
    })
  });

  it("Auth register-user wrong credentials [unsuccess]", async () => {
    const fakeAnswer = { status: false, message: 'Email or username is already used!' };

    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(fakeAnswer)
      })
    );

    const { getByTestId, getByText } = render(<CreateAccount />);

    const useremail = getByTestId("email");
    const userpass = getByTestId("password");
    const username = getByTestId("username");

    userEvent.type(useremail, "sho@gmail.com");
    userEvent.type(userpass, "sho54322");
    userEvent.type(username, "shopopalo");

    userEvent.click(getByText("Sign Up"));
    await waitFor(() => {
      const error = getByText('Email or username is already used!');
      expect(error).toBeInTheDocument();
    })

    global.fetch.mockRestore();
  })

  it("Auth register-user short username [unsuccess]", async () => {
    const { getByTestId, getByText } = render(<CreateAccount />);
    const useremail = getByTestId("email");
    const userpass = getByTestId("password");
    const username = getByTestId("username");

    userEvent.type(useremail, "koi@gmail.com");
    userEvent.type(userpass, "koi54321");
    userEvent.type(username, "koi");

    userEvent.click(getByText("Sign Up"));
    await waitFor(() => {
      const errors = getByText('Username must be at least 4 symbols');
      expect(errors).toBeInTheDocument();
    })
  });

  it("Auth register-user short password [unsuccess]", async () => {
    const { getByTestId, getByText } = render(<CreateAccount />);
    const useremail = getByTestId("email");
    const userpass = getByTestId("password");
    const username = getByTestId("username");

    userEvent.type(useremail, "koi@gmail.com");
    userEvent.type(userpass, "koi12");
    userEvent.type(username, "koikoi");

    userEvent.click(getByText("Sign Up"));
    await waitFor(() => {
      const errors = getByText('Password must be at least 8 symbols');
      expect(errors).toBeInTheDocument();
    })
  });

  it("Auth register-user user [success]", async () => {
    const fakeAnswer = { status: true };

    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(fakeAnswer)
      })
    );

    const { getByTestId, getByText } = render(<CreateAccount />);

    const useremail = getByTestId("email");
    const userpass = getByTestId("password");
    const username = getByTestId("username");

    userEvent.type(useremail, "pop@gmail.com");
    userEvent.type(userpass, "pop54321");
    userEvent.type(username, "popins");

    userEvent.click(getByText("Sign Up"));
    await waitFor(() => {
      reloadFn(); // as defined above..
      expect(window.location.reload).toHaveBeenCalled();
    })
  })
});
