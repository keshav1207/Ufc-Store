import { createSlice } from '@reduxjs/toolkit'

//Controls the visibility of the edit User form on the screen.

const initialState = {
    editUserFormVisibility: false,
  }

  const editUserFormVisibilitySlice = createSlice({
    name: 'editUserFormVisibility',
    initialState,
    reducers: {
        editUserFormToggle: (state) => {
        state.editUserFormVisibility = !state.editUserFormVisibility;
      },

      
    },
  });
  
  // Action creators are generated for each case reducer function
  export const {editUserFormToggle } =   editUserFormVisibilitySlice.actions
  
  export default editUserFormVisibilitySlice.reducer;