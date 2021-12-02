import React from "react";
import App from "../App";

import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

describe('App app component', () => {
    it('Check render in app component another component', () => {
        render(
            <App />
        )
    })
})