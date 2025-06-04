import { createSlice } from '@reduxjs/toolkit';
 
const   speechToTextSlice = createSlice({
    name: 'speechToText',
    initialState:{
        data:[],
    },
    reducers: { 
        saveSpeechRecord(state, {payload}) { 
            state.data=payload
        }, 
    },
});

export const { saveSpeechRecord } =  speechToTextSlice.actions;
export default  speechToTextSlice.reducer;
