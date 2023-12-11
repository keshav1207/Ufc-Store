import { configureStore } from '@reduxjs/toolkit'
import filterReducer from './filterSlice'
import addProductFormReducer from './addProductFormSlice'
import editProductIdReducer from './editProductIdSlice';

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    addProductForm: addProductFormReducer,
    editProductId: editProductIdReducer,
  },
  
    
  
})