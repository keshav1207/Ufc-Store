import { configureStore } from '@reduxjs/toolkit'
import filterReducer from './filterSlice'
import addProductFormReducer from './addProductFormSlice'

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    addProductForm: addProductFormReducer,
  },
  
    
  
})