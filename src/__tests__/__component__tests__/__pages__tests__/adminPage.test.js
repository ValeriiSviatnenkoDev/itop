import React from "react";
import AdminHeader from "../../../pages/admin-page/adminHeader";
import AuthAccount from "../../../accountTools/authAccount";

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

const localStorageMock = (function () {
  let store = {};

  return {
    getItem(key) {
      return store[key];
    },

    setItem(key, value) {
      store[key] = value;
    },

    clear() {
      store = {};
    },

    removeItem(key) {
      delete store[key];
    },

    getAll() {
      console.log(store);
    },
  };
})();

Object.defineProperty(window, "localStorage", { value: localStorageMock });

describe('Header admin-header component', () => {
    it("Header remove data from localstorage", async () => {
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
      window.localStorage.setItem("status", JSON.stringify(data.auth));
      
      const { getByText } = render(
        <AdminHeader />
      )

      userEvent.click(screen.getByText("Log Out"));
      localStorage.removeItem("user");
      localStorage.removeItem("status");

      if(localStorage.getItem("status") === undefined) {
        render(
          <AuthAccount />
        )
      }

      await waitFor(() => {
        const signIn = getByText('Sign In');
        expect(signIn).toBeInTheDocument();
      })
    })
});
