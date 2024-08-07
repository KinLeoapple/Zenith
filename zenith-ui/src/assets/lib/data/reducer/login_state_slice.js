import {createSlice} from '@reduxjs/toolkit';

export const login_state_slice = createSlice({
    name: 'login_state',
    initialState: {
        value: false,
    },
    reducers: {
        setLoginStateValue: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const {setLoginStateValue} = login_state_slice.actions;

export const selectLoginState = (state) => state.loginState.value