import React from "react";
import UsersMain from "../../../pages/main-component/usersMain.jsx"

import { render, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import "@testing-library/jest-dom/extend-expect";


describe('Profile create-profile component', () => {

    it("Profile create-profile male [success]", async () => {
       render(
        <UsersMain />
       );
    })

});
