import { createSlice } from '@reduxjs/toolkit';
 
export const editProfileSlice = createSlice({
  name: 'editProfile',
  initialState:{
    editProfile:[],
  },
  reducers: {
    saveEditProfile(state, action) { 
      state.editProfile = action.payload;
    },
  },
});
 
export const { saveEditProfile } = editProfileSlice.actions;

export default editProfileSlice.reducer;
