import {createSlice} from '@reduxjs/toolkit';

export const initialState = {
    videos: [],
    hashtags: []
};

export const videoSlice = createSlice({
    name: 'videos',
    initialState,
    reducers: {
        setVideosData(state, action) {
            state.videos = action.payload.videos;
            state.hashtags = action.payload.hashtags;
        }
    }
});
 
export const { setVideosData } = videoSlice.actions;
 
export default  videoSlice.reducer;
