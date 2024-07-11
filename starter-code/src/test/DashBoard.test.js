import React, { act } from "react";
import { renderWithProviders } from "./testUtils";
import { screen, fireEvent } from "@testing-library/react";
import App from "../component/App";
import { setupStore } from "../app/store";
import { authenticate } from "../features/authedUser/authedUserSlice";
import { fetchQuestions } from "../features/questions/questionSlice";
import { fetchUser } from "../features/users/userSlice";


describe('DashBoard', () => {
    test('will match snapshot', async () => {
        const component = renderWithProviders(<App />, { initialEntries: ['/', '/login'], initialIndex: 0 })
        await act(async () => {
            await component.store.dispatch(fetchUser())
            await component.store.dispatch(fetchQuestions())
            await component.store.dispatch(authenticate({
                email: "sarahedo",
                password: "password123"
            }))
        })
        expect(component).toMatchSnapshot();
    }),

    test('Unauthenticated should be redirect to login page', async () => {
        const component = renderWithProviders(<App />, { initialEntries: ['/', '/login'], initialIndex: 0 })
        await act(async () => {
            await component.store.dispatch(fetchUser())
            await component.store.dispatch(fetchQuestions())
        })
        expect(screen.getByRole('button')).toHaveTextContent('Login');
    })
})