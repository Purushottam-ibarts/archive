import { createSlice } from '@reduxjs/toolkit';
 
export const businessSlice = createSlice({
  name: 'business',
  initialState:{
    businessReels:[],
    financeReels:[],
    hashtags:[],
  },
  reducers: {
    saveBusiness(state, {payload}) { 
      console.log('payload: ', payload);
      if(payload.type === 'video'){
      state.businessReels = payload.data.businessReels;
      state.financeReels = payload.data.financeReels;
      state.hashtags = payload.data.hashtags;
      }else{
      console.log('payload:--- ', payload.data.content);
        state.businessReels = payload.data.content;
        // state.financeReels = payload.data.content;
        state.hashtags = payload.data.hashtags;
      }
    },
  },
});


export const { saveBusiness } = businessSlice.actions;

export default businessSlice.reducer;
