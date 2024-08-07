import {createSlice} from '@reduxjs/toolkit';

export const drawer_open_slice = createSlice({
    name: 'drawer_open',
    initialState: {
        value: false,
    },
    reducers: {
        setOpenValue: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const {setOpenValue} = drawer_open_slice.actions;

export const selectDrawerOpen = (state) => state.drawerOpen.value