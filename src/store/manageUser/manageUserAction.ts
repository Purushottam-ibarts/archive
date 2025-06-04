import apiCall from '../../services';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {setLoading, showMessage} from '../common'; 
import { RootState } from '../store';  
import { saveManageUser } from './manageUserSlice';

export const  postManageUser = createAsyncThunk('user/store-user',async (data: object, {dispatch,getState}) => {
    const state = getState() as RootState; 
    const token = state.userSlice.token;  
    // const token = 'p0eICVzuHaHbw3fkm92svdmV5SQdWfQpIwyveQM984c04bf8';  
    dispatch(setLoading(true));
    try {
      const res = await apiCall({path: 'user/store-user',method: 'POST',token,body: data,isForm:true}); 
      // console.log('postusers:======== ', res);
      if (res.status === true) {  
        dispatch(saveManageUser(res.data));
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

export const getUsers = createAsyncThunk("user/get-users", async (_, { dispatch, getState }) => {
    const state = getState() as RootState;
    const token = state.userSlice.token;
    // const token = '8o9aM0RwXTcURwnJDinaMTq6TLRFmTkHFSsElFa8d37276d0';  
    dispatch(setLoading(true));
    try {
      const res = await apiCall({ path: `user/get-users`, method: "GET", token });  
      // console.log('Get Users--->> ', res.data);
      if (res.status === true) { 
        dispatch(saveManageUser(res.data));
        dispatch(setLoading(false));
        dispatch(showMessage(res.message));
        return res;
      } else {
        dispatch(setLoading(false));
        return res;
      }
    } catch (error) {
      dispatch(setLoading(false));
    }
  });