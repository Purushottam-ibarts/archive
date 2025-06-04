import { createSlice } from '@reduxjs/toolkit';
 
export const manageUserSlice = createSlice({
  name: 'manageUser',
  initialState:{
    manageUsers:[],
  },
  reducers: {
    saveManageUser(state, action) { 
      state.manageUsers = action.payload;
    },
  },
});
 
export const { saveManageUser } = manageUserSlice.actions;

export default manageUserSlice.reducer;
