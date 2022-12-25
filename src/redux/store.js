import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import cartSlice from "./slices/cartSlice";
import authSlice from './slices/LoginSlice'

const store = configureStore({
    reducer: {
        cart: cartSlice,
        user: authSlice
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false
        })
})

export default store
