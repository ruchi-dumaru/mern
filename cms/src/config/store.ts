import {configureStore}  from "@reduxjs/toolkit"
import UserReducer from "../reducers/UserSlice"

export const store =configureStore({
  reducer:{
    // user:
    user:UserReducer
  }
})


export type RootState =ReturnType <typeof store.getState>
export type AppDispatch = typeof store.dispatch;

