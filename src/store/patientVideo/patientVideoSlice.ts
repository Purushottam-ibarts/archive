import { createSlice } from '@reduxjs/toolkit';
 
const  patientVideoSlice = createSlice({
    name: 'patientVideo',
    initialState:{
        data:[],
        hashtags:[],
    },
    reducers: { 
        savePatientVideo(state, {payload}) { 
            // console.log('payload: ', payload);
            state.data=payload.data
            state.hashtags=payload.data.hashtags
        }, 
    },
});

export const { savePatientVideo } =  patientVideoSlice.actions;
export default  patientVideoSlice.reducer;
