import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: {},
  notes:[],
  currentNote:{},
  deletedNotes:[],
  create: false,
  edit: false,
  view: false
}
const counterSlice = createSlice({
  name:'couter',
  initialState,
  reducers:{
    userLogin(state, action){
      state.user = action.payload;
    },
    currentNote(state, action){
      state.currentNote = action.payload;
    },
    allNotes(state, action){
      state.notes = action.payload;
    },
    createdNotes(state, action){
      state.notes = state.notes.filter(x=>x._id!==action.payload);
    },
    deletedNotes(state, action){
      state.notes = state.notes.filter(x=>x._id!==action.payload._id);
      state.deletedNotes = [...state.deletedNotes, action.payload];
    },
    updateDeletedNotes(state, action){
      state.deletedNotes = state.deletedNotes.filter(x=>x._id!==action.payload._id);
      console.log(state.deletedNotes, state.notes);
    },
    updateTrash(state, action){
      state.deletedNotes = state.deletedNotes.filter(x=>x._id!==action.payload._id);
      state.notes = [...state.notes, action.payload];
    },
    createNotes(state,action){
      state.create = action.payload;
    },
    editNotes(state,action){
      state.edit = action.payload;
    },
    viewNotes(state,action){
      state.view = action.payload;
    },
    logout(state,action){
      state.user = {};
    },
  }
})
export const {userLogin, currentNote, viewNotes, allNotes, createdNotes, deletedNotes, createNotes, editNotes, updateTrash, updateDeletedNotes} = counterSlice.actions;
export default counterSlice.reducer;