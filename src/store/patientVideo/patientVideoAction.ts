import {createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {setLoading} from '../common';
import apiCall from '../../services';
import { savePatientVideo } from './patientVideoSlice';

export const getPatientVideo = createAsyncThunk('assist/patient-explainer-videos',async (_, {dispatch, getState}) => { 
    const state = getState() as RootState; 
    const token = state.userSlice.token;   
    // const token = 'PMi085gynmgI9ZxLqwDTx3DgcInGIQm49kWzlYX6efb865b0';   
    dispatch(setLoading(true));
    try {
      const res = await apiCall({path: 'assist/patient-explainer-videos',method: 'GET',token}); 
    //   console.log('res:--->>> ', res);
      if (res.status === true) {  
        dispatch(savePatientVideo(res));
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
