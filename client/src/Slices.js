import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: {},
  notes:[],
  deletedNotes:[],
  create: false,
  edit: false
}
const counterSlice = createSlice({
  name:'couter',
  initialState,
  reducers:{
    user(state, action){
      state.user = action.payload;
    },
    allNotes(state, action){
      state.notes = action.payload;
    },
    createdNotes(state, action){
      state.notes = state.notes.filter(x=>x._id!=action.payload);
    },
    deletedNotes(state, action){
      state.deletedNotes = [...state.deletedNotes, action.payload];
    },
    createNotes(state,action){
      state.create = action.payload;
    },
    editNotes(state,action){
      state.edit = action.payload;
    },
  }
})
export const {user, allNotes, createdNotes, deletedNotes, createNotes, editNotes} = counterSlice.actions;
export default counterSlice.reducer;
// export const counterSlice = createSlice({
//   name: 'counter',
//   initialState,
//   reducers: {
//     increment: (state) => {
//       // Redux Toolkit allows us to write "mutating" logic in reducers. It
//       // doesn't actually mutate the state because it uses the Immer library,
//       // which detects changes to a "draft state" and produces a brand new
//       // immutable state based off those changes
//       state.value += 1
//     },
//     decrement: (state) => {
//       state.value -= 1
//     },
//     incrementByAmount: (state, action) => {
//       state.value += action.payload
//     },
//   },
// })

// // Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = counterSlice.actions

// export default counterSlice.reducer