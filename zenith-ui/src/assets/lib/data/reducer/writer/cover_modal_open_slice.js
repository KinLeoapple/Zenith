import {createSlice} from '@reduxjs/toolkit';

export const cover_modal_open_slice = createSlice({
    name: 'cover_modal_open',
    initialState: {
        value: false,
    },
    reducers: {
        setCoverModalOpenValue: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const {setCoverModalOpenValue} = cover_modal_open_slice.actions;

export const selectCoverModalOpen = (state) => state.coverModalOpen.value;