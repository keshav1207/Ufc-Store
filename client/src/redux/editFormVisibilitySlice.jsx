import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    editFormVisibility: false,
  }

  const editFormVisibilitySlice = createSlice({
    name: 'editFormVisibility',
    initialState,
    reducers: {
        editFormToggle: (state) => {
        state.editFormVisibility = !state.editFormVisibility;
      },

      
    },
  });
  
  // Action creators are generated for each case reducer function
  export const {editFormToggle } =   editFormVisibilitySlice.actions
  
  export default editFormVisibilitySlice.reducer;