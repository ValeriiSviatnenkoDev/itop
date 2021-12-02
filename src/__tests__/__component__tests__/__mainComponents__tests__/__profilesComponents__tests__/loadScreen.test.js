import React from "react";
import LoadingScreen from "../../../../pages/main-component/profile-components/loadScreen.jsx";

import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

describe('Profile load-screen component', () => {
    it("Profile load-screen-render [success]", async () => {
        render(<LoadingScreen />);
    })
})