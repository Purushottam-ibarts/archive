import {createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {setLoading} from '../common';
import apiCall from '../../services';
import { saveBlogDetails, saveBlogs } from './blogSlice';

export const getBlogs = createAsyncThunk('blogs',async (_, {dispatch, getState}) => { 
    const state = getState() as RootState; 
    const token = state.userSlice.token;   
    // const token = 'PMi085gynmgI9ZxLqwDTx3DgcInGIQm49kWzlYX6efb865b0';   

    dispatch(setLoading(true));
    try {
      const res = await apiCall({path: 'blogs',method: 'GET',token}); 
      // console.log('res--->>', res);
      if (res.status === true) {  
        let data = {
          blogs: res.blogs,
          hashtags: res.hashtags
        }
        dispatch(saveBlogs(data));
        dispatch(setLoading(false)); 
        return res;
      } else {
        // dispatch(setLoading(false));
        // dispatch(showMessage(res.data.message));
        return res;
      }
    } catch (error) {
      // console.log(error, 'error');
      dispatch(setLoading(false));
    }
});

export const getBlogDetails = createAsyncThunk('single-blog',async (blogId:any,{dispatch, getState}) => { 
  // console.log('blogId: ', blogId);
    const state = getState() as RootState; 
    const token = state.userSlice.token;   
    // const token = 'PMi085gynmgI9ZxLqwDTx3DgcInGIQm49kWzlYX6efb865b0';   
    dispatch(setLoading(true));
    try {
      const res = await apiCall({path: 'single-blog',params:blogId,method: 'GET',token}); 
      // console.log('res:---->>>>', res);
      if (res.status === true) {  
        dispatch(saveBlogDetails(res.blogs));
        dispatch(setLoading(false)); 
        return res;
      } else {
        // dispatch(setLoading(false));
        // dispatch(showMessage(res.data.message));
        return res;
      }
    } catch (error) {
      // console.log(error, 'error');
      dispatch(setLoading(false));
    }
});
