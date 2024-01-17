import { createSlice } from '@reduxjs/toolkit'

//Controls the visibility of the edit product form on the screen.

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