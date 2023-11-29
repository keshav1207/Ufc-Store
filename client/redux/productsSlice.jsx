import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    filter: [],
  }

  export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        NewtoOld: (state,action) => {
        state.filter = action.payload;
      },

      OldtoNew: (state,action) => {
        state.filter = action.payload;
      },

      AZ: (state,action) => {
        state.filter = action.payload;
      },

      ZA: (state,action) => {
        state.filter = action.payload;
      },

      LowtoHigh:(state,action) => {
        state.filter = action.payload;
      },

      HightoLow: (state,action) => {
        state.filter = action.payload;
      },
      
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { NewtoOld, OldtoNew, AZ, ZA, LowtoHigh, HightoLow } = filterSlice.actions
  
  export default filterSlice.reducer