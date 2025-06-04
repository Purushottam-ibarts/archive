import { createSlice } from '@reduxjs/toolkit';
 
const  commentSlice = createSlice({
    name: 'comment',
    initialState:{
        comments:[],
    },
    reducers: { 
        saveComment(state, {payload}) { 
            state.comments= payload
        }, 
    },
});

export const { saveComment } =  commentSlice.actions;
export default  commentSlice.reducer;
