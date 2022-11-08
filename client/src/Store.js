// import { configureStore } from '@reduxjs/toolkit'
// import counterReducer from './Slices'
import counterReducer from './Slices';
import { configureStore } from "@reduxjs/toolkit";
const Store = configureStore({
  reducer: {
    counter: counterReducer,
  },
})
export default Store;