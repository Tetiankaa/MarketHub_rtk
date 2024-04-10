import {configureStore} from "@reduxjs/toolkit";

import {authReducer, categoriesReducer, productReducer} from "./slices";

const store = configureStore({
    reducer:{
        product:productReducer,
        categories:categoriesReducer,
        auth:authReducer
    }
})

export {
    store
}