import { createSlice } from '@reduxjs/toolkit';
 

const  studentSlice = createSlice({
    name: 'students',
    initialState:{
        hashtags:[],
        content:[],
        noteCotent:''
    },
    reducers: { 
        saveStudents(state, {payload}) { 
            console.log('payload: ', payload);
            if(payload.type === 'video'){
            state.hashtags=payload.data.hashtags;
            state.content=payload.data.content;
            }else{
            state.hashtags=payload.data.hashtags;
            state.content=payload.data.content;
            }
        }, 
        saveStudentNote(state, {payload}) { 
            // console.log('payload: ', payload); 
            state.noteCotent=payload;
        }, 
    },
});

export const { saveStudents,saveStudentNote } =  studentSlice.actions;
export default  studentSlice.reducer;
