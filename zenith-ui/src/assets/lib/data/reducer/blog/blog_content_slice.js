import {createSlice} from '@reduxjs/toolkit';

export const blog_content_slice = createSlice({
    name: 'blog_content',
    initialState: {
        value: "",
    },
    reducers: {
        setContentValue: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const {setContentValue} = blog_content_slice.actions;

export const selectBlogContent = (state) => state.blogContent.value;