import {createSlice} from '@reduxjs/toolkit';

export const editor_size_slice = createSlice({
    name: 'editor_size',
    initialState: {
        value: {
            width: 0,
            height: 0,
        },
    },
    reducers: {
        setEditorSizeValue: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const {setEditorSizeValue} = editor_size_slice.actions;

export const selectEditorSize = (state) => state.editorSize.value;