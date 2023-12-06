import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    addProductFormVisib: false,
  }

  const addProductFormVisibSlice = createSlice({
    name: 'addProductFormVisib',
    initialState,
    reducers: {
        addProductFormVisibToggle: (state) => {
        state.addProductFormVisib = !state.addProductFormVisib;
      },

      
    },
  });
  
  // Action creators are generated for each case reducer function
  export const {addProductFormVisibToggle } =   addProductFormVisibSlice.actions
  
  export default addProductFormVisibSlice.reducer;