import {createSlice} from '@reduxjs/toolkit';

export const search_keyword_slice = createSlice({
    name: 'search_keyword',
    initialState: {
        value: {
            value: "",
            triggeredBy: null
        },
    },
    reducers: {
        setSearchBlogKeyword: (state, action) => {
            state.value = action.payload;
        },
    }
})

export const {setSearchBlogKeyword} = search_keyword_slice.actions;

export const newSearchBlogKeyword = (value, triggeredBy) => {
    return {
        value: value,
        triggeredBy: triggeredBy === undefined ? null : triggeredBy,
    }
}

export const selectSearchKeyword = (state) => state.searchKeyword.value