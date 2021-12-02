import React from "react";
import Home from "../../../pages/homePage.jsx";

import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

describe('Home app component', () => {
    it('Check render in home component another component', () => {
        render(
            <Home />
        )
    })
})