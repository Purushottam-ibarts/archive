import {createAsyncThunk} from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { setLoading, showMessage } from '../../common';
import apiCall from '../../../services';
import {saveComments, savePost } from './postSlice'; 

export const getPost = createAsyncThunk('get-posts',async (_, {dispatch, getState}) => { 
    const state = getState() as RootState; 
    const token = state.userSlice.token;   
    // console.log('token: ', token);
    // const token = 'p0eICVzuHaHbw3fkm92svdmV5SQdWfQpIwyveQM984c04bf8';   
    dispatch(setLoading(true));
    try {
      const res = await apiCall({path: 'get-posts',method: 'GET',token}); 
      // console.log('PostRes:---', res);
      if (res.status === true) {  
          // console.log('res: ', res);
        dispatch(savePost(res.posts));
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
  },
);

export const  postCreation = createAsyncThunk('create-post',async (data: object, {dispatch,getState}) => {
  const state = getState() as RootState; 
  const token = state.userSlice.token;  
  // const token = 'p0eICVzuHaHbw3fkm92svdmV5SQdWfQpIwyveQM984c04bf8';  
  dispatch(setLoading(true));
  try {
    const res = await apiCall({path: 'create-post',method: 'POST',token,body: data,isForm:true}); 
    // console.log('Post Creation:======== ', res);
    if (res.status === true) {   
      dispatch(setLoading(false));
      dispatch(showMessage(res.message));
      return res;
    } else {
      dispatch(setLoading(false));
      dispatch(showMessage(res.message));
      return res;
    }
  } catch (error) {
      console.log('error: ', error);
    dispatch(setLoading(false));
  }
},
);

export const  deletePost = createAsyncThunk('delete-post',async (id: object, {dispatch,getState}) => {
  // console.log('id: ', id);
  const state = getState() as RootState; 
  const token = state.userSlice.token;   
  dispatch(setLoading(true));
  try {
    const res = await apiCall({path: `delete-post/${id}`,method: 'DELETE',token,}); 
    // console.log('Post Deleted:======== ', res);
    if (res.status === true) {  
      // dispatch(savePost(res.data));
      dispatch(setLoading(false));
      dispatch(showMessage(res.message));
      return res;
    } else {
      dispatch(setLoading(false));
      dispatch(showMessage(res.message));
      return res;
    }
  } catch (error) {
      console.log('error: ', error);
    dispatch(setLoading(false));
  }
}); 