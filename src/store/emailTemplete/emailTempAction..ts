import {createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {setLoading, showMessage} from '../common';
import apiCall from '../../services'; 
import { saveEmailTemp } from './emailTempSlice';

export const getEmailTemp = createAsyncThunk('email-template',async (_, {dispatch, getState}) => { 
    const state = getState() as RootState; 
    const token = state.userSlice.token;  
    dispatch(setLoading(true));
    try {
      const res = await apiCall({path: 'email-template',method: 'GET',token}); 
      // console.log('res:--->>> ', res);
      if (res.success === true) {  
        dispatch(saveEmailTemp(res));
        dispatch(setLoading(false)); 
        return res;
      } else {
        dispatch(setLoading(false));
        // dispatch(showMessage(res.data.message));
        return res;
      }
    } catch (error) {
      // console.log(error, 'error');
      dispatch(setLoading(false));
    }
  },
);

export const storeEmailTemp = createAsyncThunk('send-email-template',async(data: object, {dispatch, getState}) => {
    // console.log('data: ', data);
    const state = getState() as RootState;
    const token = state.userSlice.token;
    // const token = '29|p0eICVzuHaHbw3fkm92svdmV5SQdWfQpIwyveQM984c04bf8';
    dispatch(setLoading(true));
    try {
      const res = await apiCall({path: 'send-email-template',method: 'POST',token,body: data,isForm: true,});
      console.log('res:--->> ', res);
      // if (res.status === true) {
        // dispatch(saveEmailTemp(res.data));
      //   dispatch(saveToken(res.token));
        dispatch(setLoading(false));
        dispatch(showMessage(res.message));
        return res;
      // } else {
      //   dispatch(setLoading(false));
      //   dispatch(showMessage(res.data.message));
      //   return res;
      // }
    } catch (error) {
      console.log(error, 'error');
      dispatch(setLoading(false));
    }
  },
);
