import {createSlice} from '@reduxjs/toolkit';

export const blog_delete_slice = createSlice({
    name: 'blog_delete',
    initialState: {
        value: 0,
    },
    reducers: {
        setBlogDeleteValue: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const {setBlogDeleteValue} = blog_delete_slice.actions;

export const selectBlogDelete = (state) => state.blogDelete.value;