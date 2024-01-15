import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    productId: null,
  }

  const editProductIdSlice = createSlice({
    name: 'editProductId',
    initialState,
    reducers: {
        addproductSelected: (state,action) => {
        state.productId = action.payload;
      },

      
    },
  });
  
  // Action creators are generated for each case reducer function
  export const {addproductSelected } = editProductIdSlice.actions;
  
  export default editProductIdSlice.reducer;