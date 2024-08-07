import { createSlice } from '@reduxjs/toolkit';

export const blog_page_slice = createSlice({
    name: 'blog_page',
    initialState: {
        value: 1,
    },
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        setPageValue: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const { increment, decrement, setPageValue } = blog_page_slice.actions;

export const selectBlogPage = (state) => state.blogPage.value