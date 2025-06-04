import {createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {setLoading} from '../common';
import apiCall from '../../services';
import { saveDownload } from './downloadSlice';

export const getDownload = createAsyncThunk('downloads',async (_, {dispatch, getState}) => { 
    const state = getState() as RootState; 
    const token = state.userSlice.token;   
    // const token = 'PMi085gynmgI9ZxLqwDTx3DgcInGIQm49kWzlYX6efb865b0';   
    dispatch(setLoading(true));
    try {
      const res = await apiCall({path: 'downloads',method: 'GET',token}); 
      console.log('res: ', res);
      if (res.status === true) {  
        dispatch(saveDownload(res.data));
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

export const getCertificate = createAsyncThunk('certificate-pdf',async (_, {dispatch, getState}) => { 
  const state = getState() as RootState; 
  const token = state.userSlice.token;  
  // console.log('token: ', token);
  dispatch(setLoading(true));
  try {
    const res = await apiCall({path: 'certificate-pdf',method: 'GET',token}); 
    // console.log('certificate res: ', res);
    if (res.status === true) {  
      dispatch(saveDownload(res.data));
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
