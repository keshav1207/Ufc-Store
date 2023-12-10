import { configureStore } from '@reduxjs/toolkit'
import filterReducer from './filterSlice'
import addProductFormReducer from './addProductFormSlice'
import editReducer from './editSlice';

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    addProductForm: addProductFormReducer,
    editProduct: editReducer,
  },
  
    
  
})