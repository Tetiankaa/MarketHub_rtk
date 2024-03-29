import {store} from "../redux";

type AppDispatch = typeof store.dispatch;

type RootState = ReturnType<typeof store.getState>;

export type {
    AppDispatch,
    RootState
}