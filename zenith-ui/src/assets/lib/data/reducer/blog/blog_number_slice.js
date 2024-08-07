import {createSlice} from '@reduxjs/toolkit';

export const blog_number_slice = createSlice({
    name: 'blog_number',
    initialState: {
        value: 0,
    },
    reducers: {
        setNumberValue: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const {setNumberValue} = blog_number_slice.actions;

export const selectBlogNumber = (state) => state.blogNumber.value