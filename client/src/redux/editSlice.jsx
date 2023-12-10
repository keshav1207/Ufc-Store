import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    productId: null,
  }

  const editSlice = createSlice({
    name: 'editProduct',
    initialState,
    reducers: {
        addproductSelected: (state,action) => {
        state.productId = action.payload;
      },

      
    },
  });
  
  // Action creators are generated for each case reducer function
  export const {addproductSelected } = editSlice.actions;
  
  export default editSlice.reducer;