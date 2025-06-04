import apiCall from '../../services';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {setLoading, showMessage} from '../common'; 
import { RootState } from '../store';   
import { saveWorkFlow } from './workFlowSlice';

export const getWorkFlow = createAsyncThunk('work-flow',async (_, {dispatch,getState}) => { 
  // console.log('----health-and-welbeing: ');
    const state = getState() as RootState; 
    const token = state.userSlice.token;  
    // const token = 'PMi085gynmgI9ZxLqwDTx3DgcInGIQm49kWzlYX6efb865b0';  
    dispatch(setLoading(true));
    try {
      const res = await apiCall({path: 'get-workflows',method: 'GET',token}); 
      // console.log('res:======== ', res);
      if (res.status === true) {  
        dispatch(saveWorkFlow({data:res.data,}));
        dispatch(setLoading(false));
        // showMessage(res?.message);
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
 