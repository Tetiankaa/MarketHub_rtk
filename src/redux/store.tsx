import {configureStore} from "@reduxjs/toolkit";

import {categoriesReducer, productReducer} from "./slices";

const store = configureStore({
    reducer:{
        product:productReducer,
        categories:categoriesReducer
    }
})

export {
    store
}