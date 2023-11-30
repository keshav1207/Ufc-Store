import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    filter: null,
  }

  const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        filterApplied: (state,action) => {
        state.filter = action.payload;
      },

      
    },
  });
  
  // Action creators are generated for each case reducer function
  export const {filterApplied } = filterSlice.actions;
  
  export default filterSlice.reducer;