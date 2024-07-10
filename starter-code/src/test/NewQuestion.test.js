import React from "react";
import { act } from "react";
import { renderWithProviders } from "./testUtils";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../component/App";
import { setupStore } from "../app/store";
import { authenticate } from "../features/authedUser/authedUserSlice";
import { fetchUser } from "../features/users/userSlice";

describe('New Question', () => {
    
    test('will match snapshot', async () => {
        const component = renderWithProviders(<App/>, {initialEntries: ['/', '/add', '/login'], initialIndex: 1})
        await act(async () => {
            await component.store.dispatch(fetchUser())
            await component.store.dispatch(authenticate({
                email: "sarahedo",
                password: "password123"
            }))
        })
        expect(component).toMatchSnapshot();
    }),
    test('prevent submit question when input empty', async () => {
        const component = renderWithProviders(<App/>, {initialEntries: ['/', '/add', '/login'], initialIndex: 1})
        await act(async () => {
            await component.store.dispatch(fetchUser())
            await component.store.dispatch(authenticate({
                email: "sarahedo",
                password: "password123"
            }))
        })

        const optionOne = screen.getByTestId('option-one-input')
        const optionTwo = screen.getByTestId('option-two-input')
        const submitButton = screen.getByRole('button')
        expect(optionOne).toHaveTextContent('')
        expect(optionTwo).toHaveTextContent('')
        expect(submitButton).toBeDisabled()
    })

    test('enable submit button when key in input field', async () => {
        const component = renderWithProviders(<App/>, {initialEntries: ['/', '/add'], initialIndex: 1})
        await act(async () => {
            await component.store.dispatch(fetchUser())
            await component.store.dispatch(authenticate({
                email: "sarahedo",
                password: "password123"
            }))
        })
        const optionOne = screen.getByTestId('option-one-input')
        const optionTwo = screen.getByTestId('option-two-input')
        const submitButton = screen.getByRole('button')
        fireEvent.change(optionOne, {target: {value: 'React'}})
        fireEvent.change(optionTwo, {target: {value: 'Redux'}})
        await screen.findByTestId('option-one-input')
        await screen.findByTestId('option-two-input')
        expect(submitButton).not.toBeDisabled()
    }),

    test('redirect to Dashboard after submitting new question', async () => {
        const component = renderWithProviders(<App/>, {initialEntries: ['/', '/add'], initialIndex: 1})
        await act(async () => {
            await component.store.dispatch(fetchUser())
            await component.store.dispatch(authenticate({
                email: "sarahedo",
                password: "password123"
            }))
        })

        const optionOne = screen.getByTestId('option-one-input')
        const optionTwo = screen.getByTestId('option-two-input')
        const submitButton = screen.getByRole('button')
        fireEvent.change(optionOne, {target: {value: 'React'}})
        fireEvent.change(optionTwo, {target: {value: 'Redux'}})
        expect(submitButton).not.toBeDisabled()
        fireEvent.click(submitButton)
        await act( async() => {
            await component.store.dispatch({type: 'questions/addNewQuestion'})
        })
        // await waitFor(() => expect(screen.getByText('DashBoard')).toBeInTheDocument)
        const dashboard = await screen.findByText('Dashboard')
        expect(dashboard).toBeInTheDocument()
    })
})