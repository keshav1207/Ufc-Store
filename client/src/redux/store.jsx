import { configureStore } from '@reduxjs/toolkit'
import filterReducer from './filterSlice'
import addProductFormReducer from './addProductFormSlice'
import editProductIdReducer from './editProductIdSlice';
import editFormVisibilityReducer from './editFormVisibilitySlice'
import editUserFormVisibilityReducer from './editUserFormVisibility';
import reloadReducer from './reloadSlice';


export const store = configureStore({
  reducer: {
    filter: filterReducer,
    addProductForm: addProductFormReducer,
    editProductId: editProductIdReducer,
    editFormVisibility: editFormVisibilityReducer,
    editUserFormVisibility: editUserFormVisibilityReducer,
    reload:reloadReducer
   
  },
  
    
  
})