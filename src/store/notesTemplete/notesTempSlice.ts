import { createSlice } from '@reduxjs/toolkit';
 
const  notesTempSlice = createSlice({
    name: 'notes Templates',
    initialState:{
        singleNotes:[],
        tempContent:[],
        data:[],
        currentHeading:'',
        saveTemplates:[],
        saveTemplatesDetails:[],
    },
    reducers: { 
        saveNotesTemp(state, {payload}) { 
            state.data=payload
        }, 
        saveSingleNotesTemp(state, {payload}) { 
            state.singleNotes=payload
        }, 
        saveAllNotesTemp(state, {payload}) { 
            state.tempContent=payload
        }, 
        saveHeading(state, {payload}) { 
            state.currentHeading=payload
        }, 
        saveTemplates(state, {payload}) {  
            state.saveTemplates=payload
        }, 
        saveTemplatesDetails(state, {payload}) {  
            state.saveTemplatesDetails=payload
        }, 
    },
});

export const { saveNotesTemp,saveAllNotesTemp,saveSingleNotesTemp ,saveHeading,saveTemplates,saveTemplatesDetails} =  notesTempSlice.actions;
export default  notesTempSlice.reducer;
