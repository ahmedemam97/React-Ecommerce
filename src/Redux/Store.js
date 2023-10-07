import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "./CounterSlice";
import { brandsReducer } from "./brandsSlice";

export let store = configureStore({
    reducer: {
        counter: counterReducer,
        brands: brandsReducer,
    },
    
})