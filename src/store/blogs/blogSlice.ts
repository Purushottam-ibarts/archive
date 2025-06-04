import { createSlice } from '@reduxjs/toolkit';
 

const  blogsSlice = createSlice({
    name: 'blogs',
    initialState:{
        blogs:[],
        blogDetails:[],
    },
    reducers: { 
        saveBlogs(state, {payload}) { 
            state.blogs=payload
        }, 
        saveBlogDetails(state, {payload}) { 
            state.blogDetails=payload
        }, 
    },
});

export const { saveBlogs,saveBlogDetails } =  blogsSlice.actions;
export default  blogsSlice.reducer;
