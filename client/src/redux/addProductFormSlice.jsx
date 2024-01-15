import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    addProductFormVisib: false,
  }

  const addProductFormSlice = createSlice({
    name: 'addProductForm',
    initialState,
    reducers: {
        addProductFormToggle: (state) => {
        state.addProductFormVisib = !state.addProductFormVisib;
      },

      
    },
  });
  
  // Action creators are generated for each case reducer function
  export const {addProductFormToggle } =   addProductFormSlice.actions
  
  export default addProductFormSlice.reducer;