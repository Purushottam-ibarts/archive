import {createSlice} from '@reduxjs/toolkit';

export const initialState = {
    content: [],
    hashtags: []
};

export const coursesSlice = createSlice({
    name: 'courses',
    initialState,
    reducers: {
        saveCourses(state, action) { 
            state.content = action.payload.content;
            state.hashtags = action.payload.hashtags;
        }
    }
});
 
export const { saveCourses } = coursesSlice.actions;
 
export default  coursesSlice.reducer;
