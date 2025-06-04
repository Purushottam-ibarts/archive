import {createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {setLoading, showMessage} from '../common';
import apiCall from '../../services';  
import { saveAllNotesTemp, saveNotesTemp, saveSingleNotesTemp, saveTemplates, saveTemplatesDetails } from './notesTempSlice';

export const getNotesTemp = createAsyncThunk('all-templates',async (_, {dispatch, getState}) => { 
    const state = getState() as RootState; 
    const token = state.userSlice.token;     
    // console.log('token: ', token);
    dispatch(setLoading(true));
    try {
      const res = await apiCall({path: 'all-templates',method: 'GET',token}); 
      // console.log('res:--->>> ', res);
      if (res.status === true) {  
        // dispatch(saveNotesTemp(res));
        dispatch(saveAllNotesTemp(res));
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

export const getSingleNotesTemp = createAsyncThunk('notes-template',async (data: object, {dispatch,getState}) => { 
  // console.log('data:<><><>>>>>>>>>><< ', data);
  const state = getState() as RootState; 
  const token = state.userSlice.token;  
  // console.log('token: ', token);
  dispatch(setLoading(true));
  try {
    const res = await apiCall({path: `notes-template/${data}`,method: 'GET',token}); 
    if (res.status === 'success') {  
      dispatch(saveSingleNotesTemp(res.data));
      dispatch(setLoading(false));
      return res;
    } else {
      // dispatch(setLoading(false));
      // dispatch(showMessage(res.data.message));
      return res;
    }
  } catch (error) { 
    console.log('error: ', error);
    dispatch(setLoading(false));
  }
});

export const getSaveTemp = createAsyncThunk('saved-templates',async (_, {dispatch, getState}) => { 
  // console.log('getSaveTemp');
    const state = getState() as RootState; 
    const token = state.userSlice.token;     
    dispatch(setLoading(true));
    try {
      const res = await apiCall({path: 'saved-templates',method: 'GET',token}); 
      if (res.status === true) {   
        // console.log('savedTemplates res:--->>>>>>>> ', res.savedTemplates);
        dispatch(saveTemplates(res?.savedTemplates)); 
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
});

export const getSaveTemplates = createAsyncThunk('get-saved-templates',async (data, {dispatch, getState}) => { 
  // console.log('data: >>>>', data);
  // console.log('getSaveTemp');
    const state = getState() as RootState; 
    const token = state.userSlice.token;     
    // console.log('token: ', token);
    dispatch(setLoading(true));
    try {
      const res = await apiCall({path: `get-saved-templates/${data}`,method: 'GET',token}); 
      if (res.status === 'success') {  
        // console.log('get-saved-templates Res:--->>>>>>>> ', res);
        dispatch(saveTemplatesDetails(res?.data)); 
        dispatch(setLoading(false)); 
        return res;
      } else {
        dispatch(setLoading(false));
        // dispatch(showMessage(res.data.message));
        return res;
      }
    } catch (error) { 
      console.log('error: ', error);
      dispatch(setLoading(false));
    }
});

export const storeNotesTemp = createAsyncThunk('save-notes-template',async(data: object, {dispatch, getState}) => {
    // console.log('data: ', data);
    const state = getState() as RootState;
    const token = state.userSlice.token; 
    dispatch(setLoading(true));
    try {
      const res = await apiCall({path: 'save-notes-template',method: 'POST',token,body: data,isForm: true,});
        dispatch(saveNotesTemp(res.data)); 
        dispatch(showMessage(res.message));
        return res;
    } catch (error) {
      console.log(error, 'error');
      dispatch(setLoading(false));
    }
  },
);
