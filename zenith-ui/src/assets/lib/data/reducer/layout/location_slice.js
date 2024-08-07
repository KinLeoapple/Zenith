import {createSlice} from '@reduxjs/toolkit';

export const location_slice = createSlice({
    name: 'location',
    initialState: {
        value: "/",
    },
    reducers: {
        setLocationValue: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const {setLocationValue} = location_slice.actions;

export const selectLocation = (state) => state.location.value