import { createSlice } from '@reduxjs/toolkit';
 
const  emailTempSlice = createSlice({
    name: 'emailTemplates',
    initialState:{
        data:[],
    },
    reducers: { 
        saveEmailTemp(state, {payload}) { 
            state.data=payload
        }, 
    },
});

export const { saveEmailTemp } =  emailTempSlice.actions;
export default  emailTempSlice.reducer;
