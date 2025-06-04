import apiCall from '../../services';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {setLoading, showMessage} from '../common'; 
import { RootState } from '../store';
import { saveVideos } from './dashboardSlice';

export const fetchDashboardData = createAsyncThunk('dashboards/fetchDashboardData',async (data: object, {dispatch,getState}) => { 
    console.log('data:----', data);
    const state = getState() as RootState; 
    const token = state.userSlice.token;
    dispatch(setLoading(true));
    try {
      const res = await apiCall({path: 'dashboard?',method: 'GET',params: data,token}); 
      console.log('res: Vedios======== ', res);
      dispatch(showMessage(res?.message));
      dispatch(saveVideos({data:res?.data,type:'video'}));
      dispatch(setLoading(false));
      if (res.success === true) {  
        dispatch(showMessage(res?.message));
        return res;
      } else {
        // dispatch(setLoading(false));
        // dispatch(showMessage(res.data.message));
        return res;
      }
    } catch (error) {
      console.log(error, 'error');
      dispatch(setLoading(false));
    }
});


export const filterData = createAsyncThunk("hashtag-filter", async (data:{contentType:string,nameOfHashtag:string}, { dispatch, getState }) => {
  // console.log('data: ', data);
  const state = getState() as RootState;
  const token = state.userSlice.token; 
  dispatch(setLoading(true));
  try {
    const res = await apiCall({ path: `hashtag-filter?contentType=${data.contentType}&nameOfHashtag=${data.nameOfHashtag}`, method: "GET", token, });  
    dispatch(saveVideos({data:res.data,type:'filter'}));
    if (res.status === true) { 
      let data = res.data;
      let Data ={
        videos:{
          data
        }
      } 
      return res;
    } else {
      dispatch(setLoading(false));
      return res;
    }
  } catch (error) {
    console.log('error: --->', error);
    dispatch(setLoading(false));
  }
});

export const getWorkFlows = createAsyncThunk("get-workflows", async (data:{contentType:string,nameOfHashtag:string}, { dispatch, getState }) => {
  // console.log('data: ', data);
  const state = getState() as RootState;
  const token = state.userSlice.token;
  dispatch(setLoading(true));
  try {
    const res = await apiCall({ path: `get-workflows`, method: "GET", token, });  
    
    if (res.status === true) {  

      return res;
    } else {
      dispatch(setLoading(false));
      return res;
    }
  } catch (error) {
    console.log('error: --->', error);
    dispatch(setLoading(false));
  }
});