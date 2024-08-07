import {createSlice} from '@reduxjs/toolkit';

export const show_search_result_slice = createSlice({
    name: 'show_search_result',
    initialState: {
        value: false,
    },
    reducers: {
        setShowResultValue: (state, action) => {
            state.value = action.payload;
        },
    }
})

export const {setShowResultValue} = show_search_result_slice.actions;

export const selectShowSearchResult = (state) => state.showSearchResult.value;