import { createSlice } from '@reduxjs/toolkit'


//Controls the visibility of the add product form on the screen.


const initialState = {
    addProductFormVisible: false,
  }

  const addProductFormSlice = createSlice({
    name: 'addProductForm',
    initialState,
    reducers: {
        addProductFormToggle: (state) => {
        state.addProductFormVisible = !state.addProductFormVisible;
      },

      
    },
  });
  
  // Action creators are generated for each case reducer function
  export const {addProductFormToggle } =   addProductFormSlice.actions
  
  export default addProductFormSlice.reducer;