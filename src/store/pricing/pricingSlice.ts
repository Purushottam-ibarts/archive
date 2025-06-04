import { createSlice } from '@reduxjs/toolkit';
 
const  plansSlice = createSlice({
    name: 'plans',
    initialState:{
        plans:[],
    },
    reducers: { 
        savePlans(state, {payload}) { 
            state.plans= payload
        }, 
    },
});

export const { savePlans } =  plansSlice.actions;
export default  plansSlice.reducer;
