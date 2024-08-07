import {createSlice} from '@reduxjs/toolkit';

export const blog_slice = createSlice({
    name: 'blog',
    initialState: {
        value: 0,
    },
    reducers: {
        setBlogValue: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const {setBlogValue} = blog_slice.actions;

export const selectBlog = (state) => state.blog.value