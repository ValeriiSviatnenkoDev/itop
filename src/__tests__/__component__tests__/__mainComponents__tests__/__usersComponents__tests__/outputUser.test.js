import React from "react";
import OutputUser from "../../../../pages/main-component/user-components/outputUser";

import { render, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import "@testing-library/jest-dom/extend-expect";


describe('Users output-user component', () => {

    it("Users output-user [success]", async () => {
       render(
        <OutputUser />
       );
    })

});