import React from "react";
import { act } from "react";
import { setupStore } from "../app/store";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { Dashboard } from "../component/DashBoard";
import { NewQuestion } from "../component/NewQuestion";
import { Leaderboard } from "../component/Leaderboard";
import Protected from "../component/Protected";
import Login from "../component/Login";


export const renderWithProviders = (
    ui,
    {
        initialEntries = ['/'],
        initialIndex = 0,
        preloadedState = {},
        // Automatically create a store instance if no store was passed in
        store = setupStore(preloadedState),
        routes = [
            {path : '/', element : <Protected><Dashboard /></Protected>},
            {path : '/add', element : <Protected><NewQuestion /></Protected>},
            {path : '/leaderboard', element : <Protected><Leaderboard /></Protected>},
            {path : '/login', element : <Login/>}
        ],
    } = {}
) => {
    const router = createMemoryRouter(routes, { initialEntries, initialIndex });
    let rendered;
    act(() => {
        rendered = render(
            <Provider store={store}>
                <RouterProvider router={router}>{ui}</RouterProvider>
            </Provider>
        )
    })


    return {
        ...rendered,
        store
    };
}