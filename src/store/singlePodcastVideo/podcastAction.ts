import apiCall from '../../services';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {setLoading, showMessage} from '../common'; 
import { RootState } from '../store';  
import { setSinglePodcastVideo } from './podcastSlice';

export const getSinglePodcastVideo = createAsyncThunk('dashboard/78',async (_, {dispatch,getState}) => { 
  // console.log('getVideos: ');
    const state = getState() as RootState; 
    const token = state.userSlice.token;  
    // console.log('token:---->>.. ', token);
    // const token = 'PMi085gynmgI9ZxLqwDTx3DgcInGIQm49kWzlYX6efb865b0';  
    // console.log('token: ', token);
    dispatch(setLoading(true));
    try {
      const res = await apiCall({path: 'dashboard/78',method: 'GET',token}); 
      // console.log('dashboardResp:======== ', res);
      if (res.status === true) {  
        dispatch(setSinglePodcastVideo(res.data));
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
