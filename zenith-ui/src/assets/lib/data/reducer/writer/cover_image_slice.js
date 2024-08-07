import {createSlice} from '@reduxjs/toolkit';

export const cover_image_slice = createSlice({
    name: 'cover_image',
    initialState: {
        value: "",
    },
    reducers: {
        setCoverImageValue: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const {setCoverImageValue} = cover_image_slice.actions;

export const selectCoverImage = (state) => state.coverImage.value;