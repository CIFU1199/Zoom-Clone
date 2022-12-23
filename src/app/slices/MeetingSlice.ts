import { createSlice } from "@reduxjs/toolkit";
import { ToastType } from "../../utils/Types";

interface meetingInitialState {
    toasts: Array<ToastType>;
}

const initialState: meetingInitialState = {
    toasts:[],
}

export const meetingsSlice = createSlice({
    name: "mmetings",
    initialState,
    reducers:{
        setToasts: (state, action) =>{
            state.toasts = action. payload;
        },
    },
})

export const {setToasts} = meetingsSlice.actions;