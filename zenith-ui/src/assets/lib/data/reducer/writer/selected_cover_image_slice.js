import {createSlice} from '@reduxjs/toolkit';

export const selected_cover_image_slice = createSlice({
    name: 'selected_cover_image',
    initialState: {
        value: "",
    },
    reducers: {
        setSelectedCoverImageValue: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const {setSelectedCoverImageValue} = selected_cover_image_slice.actions;

export const selectSelectedCoverImage = (state) => state.selectedCoverImage.value;