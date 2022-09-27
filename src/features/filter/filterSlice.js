const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    searchKey: ""
}

const filterSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {

        searchKeyChanged: (state, action) => {
            state.searchKey = action.payload;
        },
        clearFilters: (state, action) => {
            state.searchKey = ""
        }
    },
});

export default filterSlice.reducer;
export const { clearFilters, searchKeyChanged } = filterSlice.actions;