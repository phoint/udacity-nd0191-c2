import React from "react";
import { renderWithProviders } from "../app/testUtils";
import { NewQuestion } from "../component/NewQuestion";
import { screen, fireEvent } from "@testing-library/react";
import App from "../component/App";

describe('New Question', () => {
    test('will match snapshot', () => {
        const component = renderWithProviders(<App/>, {initialEntries: ['/', '/add', '/login'], initialIndex: 1})
        expect(component).toMatchSnapshot();
    })
})