import {createSlice} from '@reduxjs/toolkit';

export const blog_filter_number_slice = createSlice({
    name: 'blog_filter_number',
    initialState: {
        value: 0,
    },
    reducers: {
        setFilterNumberValue: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const {setFilterNumberValue} = blog_filter_number_slice.actions;

export const selectBlogFilterNumber = (state) => state.blogFilterNumber.value