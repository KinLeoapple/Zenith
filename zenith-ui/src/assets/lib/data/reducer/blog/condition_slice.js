import {createSlice} from '@reduxjs/toolkit';

export const ConditionType = Object.freeze({
    Category: 1,
    Date: 2,
    Title: 3,
    Description: 4,
});

export const condition_slice = createSlice({
    name: 'condition',
    initialState: {
        value: [],
    },
    reducers: {
        append: (state, action) => {
            const payload= action.payload;
            let isContains = false;
            for (let i = 0; i < state.value.length; i++) {
                const item = state.value[i];
                if (payload.type === item.type && payload.condition === item.condition) {
                    isContains = true;
                    break;
                }
            }
            if (!isContains) {
                state.value.push(payload);
            }
        },
        remove: (state, action) => {
            const payload = action.payload;
            state.value = state.value.filter(item => {
                if (payload.condition === item.condition) {
                    return payload.type !== item.type;
                } else
                    return true;
            });
        }
    }
})

export const {append, remove} = condition_slice.actions;

export const newCondition = (type, condition) => {
    return {type: type, condition: condition};
};

export const selectCondition = (state) => state.condition.value