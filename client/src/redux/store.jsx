import { configureStore } from '@reduxjs/toolkit'
import filterReducer from './filterSlice'
import addProductFormReducer from './addProductFormSlice'
import editProductIdReducer from './editProductIdSlice';
import editFormVisibilityReducer from './editFormVisibilitySlice'
import jwtReducer from './jwtSlice'

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    addProductForm: addProductFormReducer,
    editProductId: editProductIdReducer,
    editFormVisibility: editFormVisibilityReducer,
    jwt: jwtReducer,
  },
  
    
  
})