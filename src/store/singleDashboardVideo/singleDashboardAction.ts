import apiCall from '../../services';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {setLoading, showMessage} from '../common'; 
import { RootState } from '../store';  
import { setSingleDashboardVideo } from './singleDashboardSlice';
import { saveClear, saveVideos } from '../dashboard/dashboardSlice';

export const getSingleDashboardVideo = createAsyncThunk('dashboard/78',async (data: object, {dispatch,getState}) => { 
  // console.log('--------: ',data);
    const state = getState() as RootState; 
    const token = state.userSlice.token;  
    // console.log('token:---->>.. ', token);
    // const token = 'PMi085gynmgI9ZxLqwDTx3DgcInGIQm49kWzlYX6efb865b0';  
    // console.log('token: ', token);
    dispatch(setLoading(true));
    try {
      const res = await apiCall({path: `dashboard/${data}`,method: 'GET',token}); 
      // console.log('dashboardResp:=VVVV======= ', res.data.videos);
      // console.log('dashboardResp:=VVVV======= ', res.status);
      if (res.status === true) {  
        dispatch(showMessage(res?.message));
        // console.log('dashboardResp:==HHH====== ', res);
        dispatch(saveClear())
        let Data ={
          content:res?.data?.videos,
          hashtags:res?.data?.hashtags
        }
        dispatch(saveVideos({data:Data,type:'search'}));
        // dispatch(setSingleDashboardVideo(res.data));
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

