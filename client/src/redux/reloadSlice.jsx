import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: false,
  }

  const reloadSlice = createSlice({
    name: 'reload',
    initialState,
    reducers: {
        reloadToggle: (state) => {
        state.value = !state.value;
      },

      
    },
  });
  
  // Action creators are generated for each case reducer function
  export const {reloadToggle } =   reloadSlice.actions
  
  export default reloadSlice.reducer;