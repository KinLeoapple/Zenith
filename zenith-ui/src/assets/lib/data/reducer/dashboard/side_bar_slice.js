import {createSlice} from '@reduxjs/toolkit';

export const SideBarIndex = Object.freeze({
   Profile: 1,
   Blogs: 2,
   Drafts: 3
});

export const side_bar_slice = createSlice({
    name: 'side_bar',
    initialState: {
        value: 0,
    },
    reducers: {
        setSideBarValue: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const {setSideBarValue} = side_bar_slice.actions;

export const selectSideBar = (state) => state.sideBar.value