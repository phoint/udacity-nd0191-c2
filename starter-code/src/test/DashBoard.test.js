import React from "react";
import { renderWithProviders } from "../app/testUtils";
import { Dashboard } from "../component/DashBoard";
import { screen, fireEvent } from "@testing-library/react";
import App from "../component/App";
import { setupStore } from "../app/store";
import { authenticate } from "../features/authedUser/authedUserSlice";


describe('DashBoard', () => {
    test('will match snapshot', () => {
        const component = renderWithProviders(<App/>, {initialEntries: ['/', '/login'], initialIndex: 0})
        expect(component).toMatchSnapshot();
    })
})