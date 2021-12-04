import React from "react";
import EditUser from "../../../../pages/main-component/user-components/editUser.jsx";

import { render, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import "@testing-library/jest-dom/extend-expect";


describe('Users edit-user component', () => {

    it("Users edit-user male [success]", async () => {
       render(
        <EditUser />
       );
    })

});