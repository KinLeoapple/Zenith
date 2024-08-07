import {createSlice} from '@reduxjs/toolkit';

export const editor_selection_slice = createSlice({
    name: 'editor_selection',
    initialState: {
        value: null,
    },
    reducers: {
        setEditorSelection: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const {setEditorSelection} = editor_selection_slice.actions;

export const selectEditorSelection = (state) => state.editorSelection.value;