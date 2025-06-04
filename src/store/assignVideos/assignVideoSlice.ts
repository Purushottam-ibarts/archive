import { createSlice } from '@reduxjs/toolkit';
 
const  assignVideoSlice = createSlice({
    name: 'asign video',
    initialState:{
        data:[],
    },
    reducers: { 
        saveAssignVideo(state, {payload}) { 
            state.data=payload
        }, 
        saveStoreVideoComp(state, {payload}) { 
            state.data=payload
        }, 
        saveSurveyForm(state, {payload}) { 
            state.data=payload
        }, 
        saveWatchTime(state, {payload}) { 
            state.data=payload
        }, 
    },
});

export const { saveAssignVideo,saveStoreVideoComp,saveSurveyForm,saveWatchTime } =  assignVideoSlice.actions;
export default  assignVideoSlice.reducer;
