import { createSlice } from "@reduxjs/toolkit";

const selectedDomainSlice = createSlice({
    name: 'selectedDomain',
    initialState: {
        data: null as any
    },
    reducers: {
        addSelectedDomain: (state, action) => {
            state.data = action.payload;
        },
    },

},
);
export const { addSelectedDomain } = selectedDomainSlice.actions;
export default selectedDomainSlice.reducer;