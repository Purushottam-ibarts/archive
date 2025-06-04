import { createSlice } from '@reduxjs/toolkit';
 

const downloadSlice = createSlice({
    name: 'download',
    initialState:{
        data:[],
    },
    reducers: { 
        saveDownload(state, {payload}) { 
            state.data=payload
        }, 
    },
});

export const { saveDownload } =  downloadSlice.actions;
export default  downloadSlice.reducer;
