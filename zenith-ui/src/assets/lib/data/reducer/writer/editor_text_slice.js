import {createSlice} from '@reduxjs/toolkit';

export const editor_text_slice = createSlice({
    name: 'editor_text',
    initialState: {
        value: "",
    },
    reducers: {
        setEditorTextValue: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const {setEditorTextValue} = editor_text_slice.actions;

export const selectEditorText = (state) => state.editorText.value;