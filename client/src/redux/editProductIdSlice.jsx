import { createSlice } from '@reduxjs/toolkit'

//Controls the data of the  product being edited in the edit form on the screen.

const initialState = {
    productId: null,
  }

  const editProductIdSlice = createSlice({
    name: 'editProductId',
    initialState,
    reducers: {
        setProductId: (state,action) => {
        state.productId = action.payload;
      },

      
    },
  });
  
  // Action creators are generated for each case reducer function
  export const {setProductId } = editProductIdSlice.actions;
  
  export default editProductIdSlice.reducer;