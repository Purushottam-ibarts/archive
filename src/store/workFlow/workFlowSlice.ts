import { createSlice } from '@reduxjs/toolkit'; 
  
export const workFlowSlice = createSlice({
  name: 'workflow',
  initialState:{
    workflow:[], 
    hashtags:[],
  },
  reducers: {
    saveWorkFlow(state, {payload}) { 
    //   console.log('payload: ', payload.data); 
        state.hashtags = payload; 
    },
  },
});


export const { saveWorkFlow } = workFlowSlice.actions;

export default workFlowSlice.reducer;
