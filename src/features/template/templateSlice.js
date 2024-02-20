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
            console.log('edit', action.payload)
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
            console.log('s', action.payload)
            if (
                state.categoryIndex >= 0 &&
                state.categoryIndex < updatedTemplateData.length &&
                state.columnIndex >= 0 &&
                state.columnIndex < updatedTemplateData[state.categoryIndex].columns.length
            ) {
                // Update the data with formData
                const { formData } = action.payload;
                console.log('f', formData)
                let columnData = updatedTemplateData[state.categoryIndex].columns[state.columnIndex];
                columnData = { ...columnData, ...formData }; // Update column data

                // Check if the edited column belongs to a different category
                if (formData.category !== updatedTemplateData[state.categoryIndex].category) {
                    const newCategoryIndex = updatedTemplateData.findIndex(category => category.category === formData.category);
                    if (newCategoryIndex !== -1) {
                        // Add to existing category and remove from old category
                        updatedTemplateData[newCategoryIndex].columns.push(columnData);
                        updatedTemplateData[state.categoryIndex].columns.splice(state.columnIndex, 1);

                        // Remove the previous category if it's empty
                        if (updatedTemplateData[state.categoryIndex].columns.length === 0) {
                            updatedTemplateData.splice(state.categoryIndex, 1);
                        }
                    } else {
                        // Create new category and move the column
                        updatedTemplateData.push({
                            category: formData.category,
                            columns: [columnData]
                        });
                        updatedTemplateData[state.categoryIndex].columns.splice(state.columnIndex, 1);
                    }
                } else {
                    // Update the column data in the same category
                    updatedTemplateData[state.categoryIndex].columns[state.columnIndex] = columnData;
                }

                // Return updated state
                return {
                    ...state,
                    templateData: updatedTemplateData
                };

                // You can also perform other actions or navigation logic after saving...
            } else {
                console.error("Invalid indices provided.");
                return state; // Return the original state in case of invalid indices
            }
        }







    },
})


export const { setEditColumnData, toggleEditColumnModal, setTemplateData, saveEditColumnData } = templateSlice.actions;
export default templateSlice.reducer;
