import { createSlice } from '@reduxjs/toolkit';
 
export const guideLinesSlice = createSlice({
  name: 'guidelines',
  initialState:{
    guideLines:[],
    hashtags:[],
  },
  reducers: {
    saveGuideLies(state, {payload}) {  
      // console.log('payload: ', payload);
      if(payload.type === 'video') {
        state.guideLines = payload.data.content;
        state.hashtags = payload.data.hashtags;
      }
      state.guideLines = payload.data.content;
      state.hashtags = payload.data.hashtags;
    },
  },
});


export const { saveGuideLies } = guideLinesSlice.actions;

export default guideLinesSlice.reducer;
