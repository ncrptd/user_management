import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    showEditColumnModal: false,
    templateData: [],
    editedColumnData: null,
    categoryIndex: null, columnIndex: null

}
const templateSlice = createSlice({
    name: "template",
    initialState,
    reducers: {
        setEditColumnData: (state, action) => {
            state.editedColumnData = action.payload.editedColumnData
            state.categoryIndex = action.payload.categoryIndex
            state.columnIndex = action.payload.columnIndex
        },
        toggleEditColumnModal: (state, action) => {
            state.showEditColumnModal = action.payload
        },
        setTemplateData: (state, action) => {
            state.templateData = action.payload.templateData
        },
        saveEditColumnData: (state, action) => {
            const updatedTemplateData = JSON.parse(JSON.stringify(state.templateData)); // create a deep copy

            if (
                state.categoryIndex >= 0 &&
                state.categoryIndex < updatedTemplateData.length &&
                state.columnIndex >= 0 &&
                state.columnIndex < updatedTemplateData[state.categoryIndex].columns.length
            ) {
                // Update the data with formData
                updatedTemplateData[state.categoryIndex].columns[state.columnIndex] = action.payload.formData;

                // Dispatch the action to update the templateData
                state.templateData = updatedTemplateData

                // You can also perform other actions or navigation logic after saving...
            } else {
                console.error("Invalid indices provided.");
            }
        }
    },
})


export const { setEditColumnData, toggleEditColumnModal, setTemplateData, saveEditColumnData } = templateSlice.actions;
export default templateSlice.reducer;
