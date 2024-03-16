import { createSlice } from "@reduxjs/toolkit";
import { OFFSET_LIVE_CHAT } from "./contants";

const chatSlice = createSlice({
    name:"chat",
    initialState:{
        messages:[]
    },
    reducers:{
        addmessages:(state,action)=>{
            state.messages.splice(OFFSET_LIVE_CHAT,1)
            state.messages.unshift(action.payload)
        }
    }
})

export const {addmessages} = chatSlice.actions;
export default chatSlice.reducer;