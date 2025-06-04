import {createSlice} from '@reduxjs/toolkit';

export const initialState = {
    videos: [],
    hashtags: []
};

export const singleDashboardSlice = createSlice({
    name: 'videos',
    initialState,
    reducers: {
        setSingleDashboardVideo(state, action) {
            state.videos = action.payload.videos;
            state.hashtags = action.payload.hashtags;
        }
    }
});
 
export const { setSingleDashboardVideo } = singleDashboardSlice.actions;
 
export default  singleDashboardSlice.reducer;
