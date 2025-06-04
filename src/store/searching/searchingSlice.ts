import { createSlice } from '@reduxjs/toolkit';
  
const searchSlice = createSlice({
    name: 'search',
    initialState:{
        search:[],
    },
    reducers: { 
        saveSearch(state, {payload}) { 
            console.log('payload: ', payload);
            state.search=payload;
        }, 
    },
});

export const { saveSearch } =  searchSlice.actions;
export default  searchSlice.reducer;
