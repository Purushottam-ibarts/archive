import { createSlice } from '@reduxjs/toolkit';
import { fetchDashboardData } from './dashboardActions';

const dashboardSlice = createSlice({
  name: 'dashboards',
  initialState: {
    user: null,
    videos: [],
    hashtags: [],
    loading: false,
    error: null,
    workFlows:[]
  },
  reducers: {
    saveVideos: (state, { payload }) => {
      // console.log('payload: ---->', [payload.data.content]);
      // console.log('payload: ', payload.data.content);
      // console.log('payload: ', payload.data.hashtags);
      // // Ensure unique video IDs
      if(payload.type === 'video'){
        const newVideos = payload.data.videos?.data.filter(
          newVideo => !state.videos.some(existingVideo => existingVideo.id === newVideo.id)
        );
        state.user = payload.data.user;
        state.videos = [...state.videos, ...newVideos]; // Concatenate arrays properly
        state.hashtags = payload.data.hashtags;
      }
      else if(payload.type === 'search'){
        let data = [payload.data.content]
        // console.log('======',data);
        // state.videos.push(data); 
        // state.videos = payload.data.content; 
        state.videos = data; 
        state.hashtags = payload?.data?.hashtags;
      }
      else if(payload.type ==='filter'){
        // console.log('====<><><>>>>>>>>>>>');
        state.videos =payload.data.content; 
        state.hashtags = payload.data.hashtags;
      }
    },
    saveClear:(state) =>{
      state.videos = []
    },
    saveWorkFlow:(state, { payload }) => {
      state.workFlows = payload
    }
  },
});

export const { saveVideos,saveClear } = dashboardSlice.actions;
export default dashboardSlice.reducer;




// import {createSlice} from '@reduxjs/toolkit';
// import {fetchDashboardData} from './dashboardActions';

// const dashboardSlice = createSlice({
//   name: 'dashboards',
//   initialState: {
//     user: null,
//     videos: [],
//     hashtags: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     saveVideos: (state, {payload}) => {      
//       // console.log('payload: ----->', payload.videos.data[0].thumbnail);
//       state.user = payload.user;
//       state.videos = [state.videos, ...payload.videos.data];
//       // state.videos = payload.videos.data;
//       state.hashtags =payload.hashtags;
//     },
//   }, 
// });

// export const {saveVideos} = dashboardSlice.actions;

// export default dashboardSlice.reducer;
