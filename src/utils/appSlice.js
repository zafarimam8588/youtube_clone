import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
    name:"app",
    initialState:{
        isMenuOpen:true
    },
    reducers:{
        togglMenu:(state)=>{
            state.isMenuOpen = !state.isMenuOpen
        },
        closeMenu:(state)=>{
            state.isMenuOpen = false;
        }
    }
})

export const {togglMenu, closeMenu} =  appSlice.actions;
export default appSlice.reducer;