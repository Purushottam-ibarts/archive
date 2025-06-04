import { createSlice } from '@reduxjs/toolkit';

 

export const wellbeingSlice = createSlice({
  name: 'wellbeing',
  initialState:{
    wellBeing:[],
    hashtags:[],
  },
  reducers: {
    saveWellbeing(state, {payload}) { 
      // console.log('payload: ', payload);
      if(payload.type === 'video'){
        state.wellBeing = payload.data.content;
        state.hashtags = payload.data.hashtags;
      }else{
        // console.log('payload:--- ', payload);
        state.wellBeing = payload.data.content;
        state.hashtags = payload.data.hashtags;
      }
    },
  },
});


export const { saveWellbeing } = wellbeingSlice.actions;

export default wellbeingSlice.reducer;
