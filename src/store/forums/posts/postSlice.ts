import { createSlice } from '@reduxjs/toolkit';
 
const  postSlice = createSlice({
    name: 'post',
    initialState:{
        posts:[],
    },
    reducers: { 
        savePost(state, {payload}) { 
            state.posts= payload
        }, 
    },
});

export const { savePost } =  postSlice.actions;
export default  postSlice.reducer;
