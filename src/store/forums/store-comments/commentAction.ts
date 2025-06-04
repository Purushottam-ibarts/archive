import {createAsyncThunk} from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { setLoading, showMessage } from '../../common';
import apiCall from '../../../services'; 
import { saveComment } from './commentSlice';

export const getComments = createAsyncThunk('get-comments',async (id, {dispatch, getState}) => { 
  console.log('id: ', id);
    const state = getState() as RootState; 
    const token = state.userSlice.token;
    dispatch(setLoading(true));
    try {
      const res = await apiCall({path: `get-comments/${id}`,method: 'GET',token}); 
      // console.log('PostRes:---', res);
      if (res.status === true) {  
          console.log('getComments res: ', res);
        dispatch(saveComment(res.comments));
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

export const  postComments = createAsyncThunk('store-comment',async (data: object, {dispatch,getState}) => {
  console.log('data: ', data);
  const state = getState() as RootState; 
  const token = state.userSlice.token;  
  // const token = 'p0eICVzuHaHbw3fkm92svdmV5SQdWfQpIwyveQM984c04bf8';  
  dispatch(setLoading(true));
  try {
    const res = await apiCall({path: 'store-comment',method: 'POST',token,body: data,isForm:true}); 
    // console.log('Post Comments:======== ', res);
    if (res.status === true) {  
      // dispatch(saveComment(res.data));
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

export const  postCommentsReply = createAsyncThunk('store-reply',async (data: object, {dispatch,getState}) => {
  // console.log('data: ', data);
  const state = getState() as RootState; 
  const token = state.userSlice.token;
  dispatch(setLoading(true));
  try {
    const res = await apiCall({path: 'store-reply',method: 'POST',token,body: data,isForm:true}); 
    // console.log('Post Comments:======== ', res);
    if (res.status === true) {  
      // dispatch(saveComment(res.data));
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
