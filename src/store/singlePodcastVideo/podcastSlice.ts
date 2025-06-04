import {createSlice} from '@reduxjs/toolkit';

export const initialState = {
    videos: [],
    hashtags: []
};

export const singlePodcastSlice = createSlice({
    name: 'videos',
    initialState,
    reducers: {
        setSinglePodcastVideo(state, action) {
            state.videos = action.payload.videos;
            state.hashtags = action.payload.hashtags;
        }
    }
});
 
export const { setSinglePodcastVideo } = singlePodcastSlice.actions;
 
export default  singlePodcastSlice.reducer;
