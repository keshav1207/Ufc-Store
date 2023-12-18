import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    token: "",
  }

  const jwtSlice = createSlice({
    name: 'token',
    initialState,
    reducers: {
        saveToken: (state,action) => {
        state.token = action.payload;
      },

      
    },
  });
  
  // Action creators are generated for each case reducer function
  export const {saveToken } = jwtSlice.actions;
  
  export default jwtSlice.reducer;