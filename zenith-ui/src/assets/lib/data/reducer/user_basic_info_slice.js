import {createSlice} from '@reduxjs/toolkit';

export const user_basic_info_slice = createSlice({
    name: 'user_basic_info',
    initialState: {
        value: {
            id: null,
            name: null,
            quote: null,
            quoteName: null
        },
    },
    reducers: {
        setUserBasicInfoValue: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const {setUserBasicInfoValue} = user_basic_info_slice.actions;

export const selectUserBasicInfo = (state) => {
    return state.userBasicInfo.value;
}