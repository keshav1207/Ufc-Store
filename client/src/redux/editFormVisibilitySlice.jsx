import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    editFormVisibilityValue: false,
  }

  const editFormVisibilitySlice = createSlice({
    name: 'editFormVisibility',
    initialState,
    reducers: {
        editFormToggle: (state) => {
        state.editFormVisibilityValue = !state.editFormVisibilityValue;
      },

      
    },
  });
  
  // Action creators are generated for each case reducer function
  export const {editFormToggle } =   editFormVisibilitySlice.actions
  
  export default editFormVisibilitySlice.reducer;