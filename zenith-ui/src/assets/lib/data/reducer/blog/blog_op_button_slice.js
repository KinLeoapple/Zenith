import {createSlice} from '@reduxjs/toolkit';

export const blog_op_button_slice = createSlice({
    name: 'blog_op_button',
    initialState: {
        value: 0,
    },
    reducers: {
        setOpButtonValue: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const {setOpButtonValue} = blog_op_button_slice.actions;

export const selectBlogOpButton = (state) => state.blogOpButton.value;