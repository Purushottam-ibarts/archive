import { createSlice } from '@reduxjs/toolkit';

 

export const podcastSlice = createSlice({
  name: 'podcast',
  initialState:{
    podsCast:[],
    hashtags:[],
  },
  reducers: {
    savePostCast(state, { payload }) { 
      // console.log('payload: ', payload);
      if(payload.type === 'video'){
        state.podsCast = payload.data.videos;
        state.hashtags = payload.data.hashtags;
      }else{
        // console.log('payload filter---->>', payload);
        state.podsCast = payload.data.content;
        state.hashtags = payload.data.hashtags;
      }
    },
  },
});


export const { savePostCast } = podcastSlice.actions;

export default podcastSlice.reducer;
