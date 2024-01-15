import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    editUserFormVisibilityValue: false,
  }

  const editUserFormVisibilitySlice = createSlice({
    name: 'editUserFormVisibility',
    initialState,
    reducers: {
        editUserFormToggle: (state) => {
        state.editUserFormVisibilityValue = !state.editUserFormVisibilityValue;
      },

      
    },
  });
  
  // Action creators are generated for each case reducer function
  export const {editUserFormToggle } =   editUserFormVisibilitySlice.actions
  
  export default editUserFormVisibilitySlice.reducer;