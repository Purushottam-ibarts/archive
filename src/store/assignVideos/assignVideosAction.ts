import {createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {setLoading, showMessage} from '../common';
import apiCall from '../../services';   
import { saveAssignVideo, saveStoreVideoComp, saveSurveyForm, saveWatchTime } from './assignVideoSlice';

export const getSelectedVideoUsers = createAsyncThunk('fetch-selected-items',async (_, {dispatch, getState}) => { 
    const state = getState() as RootState; 
    const token = state.userSlice.token;   
    // const token = 'PMi085gynmgI9ZxLqwDTx3DgcInGIQm49kWzlYX6efb865b0';   
    dispatch(setLoading(true));
    try {
      const res = await apiCall({path: 'fetch-selected-items',method: 'GET',token}); 
    //   console.log('res:--->>> ', res);
      if (res.status === true) {  
        dispatch(saveAssignVideo(res));
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

export const storeAssignVideos = createAsyncThunk('assign-videos',async(data: object, {dispatch, getState}) => {
    // console.log('data: ', data);
    const state = getState() as RootState;
    const token = state.userSlice.token;
    // const token = 'PMi085gynmgI9ZxLqwDTx3DgcInGIQm49kWzlYX6efb865b0';
    dispatch(setLoading(true));
    try {
      const res = await apiCall({path:'assign-videos',method: 'POST',token,body: data,isForm: true,});
      console.log('res:--->> ', res);
      // if (res.status === true) {
        dispatch(saveAssignVideo(res.data));
      //   dispatch(saveToken(res.token));
      //   dispatch(setLoading(false));
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
export const storeVideoComplete = createAsyncThunk('video-completed',async(data: object, {dispatch, getState}) => {
    // console.log('data: ', data);
    const state = getState() as RootState;
    const token = state.userSlice.token;
    // const token = 'PMi085gynmgI9ZxLqwDTx3DgcInGIQm49kWzlYX6efb865b0';
    dispatch(setLoading(true));
    try {
      const res = await apiCall({path:'video-completed',method: 'POST',token,body: data,isForm: true,});
      console.log('res:--->> ', res);
      // if (res.status === true) {
        dispatch(saveStoreVideoComp(res.data));
      //   dispatch(saveToken(res.token));
      //   dispatch(setLoading(false));
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

export const storeSurveyForm = createAsyncThunk('save-survey-form',async(data: object, {dispatch, getState}) => {
    console.log('storeSurveyForm data: ', data);
    const state = getState() as RootState;
    const token = state.userSlice.token;
    // const token = 'PMi085gynmgI9ZxLqwDTx3DgcInGIQm49kWzlYX6efb865b0';
    dispatch(setLoading(true));
    try {
      const res = await apiCall({path:'save-survey-form',method: 'POST',token,body: data,isForm: true,});
      console.log('res:--->> ', res);
      // if (res.status === true) {
        // dispatch(saveSurveyForm(res.data));
      //   dispatch(saveToken(res.token));
      //   dispatch(setLoading(false));
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

export const storeWatchTime = createAsyncThunk('store-watch-time',async(data: object, {dispatch, getState}) => {
    // console.log('data:>>> ', data);
    const state = getState() as RootState;
    const token = state.userSlice.token;
    // const token = 'PMi085gynmgI9ZxLqwDTx3DgcInGIQm49kWzlYX6efb865b0';
    dispatch(setLoading(true));
    try {
      const res = await apiCall({path:'store-watch-time?',method: 'POST',token,params: data});
      // console.log('res:--->> ', res);
      // if (res.status === true) {
        // dispatch(saveWatchTime(res.data)); 
      //   dispatch(setLoading(false));
        // dispatch(showMessage(res.message));
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

export const updateWatchTime = createAsyncThunk('update-watch-time',async(data: object, {dispatch, getState}) => {
    // console.log('data:>>> ', data);
    const state = getState() as RootState;
    const token = state.userSlice.token;
    // const token = 'PMi085gynmgI9ZxLqwDTx3DgcInGIQm49kWzlYX6efb865b0';
    dispatch(setLoading(true));
    try {
      const res = await apiCall({path:'update-watch-time?',method: 'POST',token,params: data});
      // console.log('res:--->> ', res);
      // if (res.status === true) {
        // dispatch(saveWatchTime(res.data)); 
      //   dispatch(setLoading(false));
        // dispatch(showMessage(res.message));
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
 