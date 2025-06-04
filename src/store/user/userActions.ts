import apiCall from '../../services';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {saveNotifications, savePrivilege, saveReminder, saveToken, saveUserData} from './userSlice';
import {setLoading, showMessage} from '../common';
import { RootState } from "../store";

export const register = createAsyncThunk('register',async (data: object, {dispatch}) => { 
    dispatch(setLoading(true));
    try {
      const res = await apiCall({path: 'register',method: 'POST',body: data,}); 
      if (res.success === true) {
        dispatch(saveUserData(res.data.user));
        // dispatch(saveToken(res.token));
        dispatch(setLoading(false));
        showMessage(res?.message);
        return res;
      } else {
        dispatch(setLoading(false));
        dispatch(showMessage(res.data.message));
        return res;
      }
    } catch (error) {
      // console.log(error, 'error');
      dispatch(setLoading(false));
    }
  },
);

export const login = createAsyncThunk('login',async (data: object, {dispatch}) => {
  // console.log('data: ', data);
    dispatch(setLoading(true));
    try {
      const res = await apiCall({path: 'login',method: 'POST', body: data,});
      // console.log('res: ', res);
      if (res.success === true && !res.data.error) { 
        dispatch(saveUserData(res.data.user));
        dispatch(saveToken(res.data.token));
        dispatch(setLoading(false));
        showMessage(res.data.message);
        return res;
      } else {
        dispatch(setLoading(false));
        dispatch(showMessage(res.data.message));
        return res;
      }
    } catch (error) {
      console.log(error, 'error');
      dispatch(setLoading(false));
    }
  },
);
export const googleLogin = createAsyncThunk('login',async (data: object, {dispatch}) => {
  // console.log('data: ', data);
    dispatch(setLoading(true));
    try {
      const res = await apiCall({path: 'auth/google',method: 'POST', body: data,isForm:true});
      // console.log('res:--->> ', res);
      if (res.status === true) { 
        dispatch(saveUserData(res.data));
        dispatch(savePrivilege(res?.data?.privilege));
        dispatch(saveToken(res.token));
        dispatch(setLoading(false));
        showMessage(res.data.message);
        return res;
      } else {
        dispatch(setLoading(false));
        dispatch(showMessage(res.data.message));
        return res;
      }
    } catch (error) {
      console.log(error, 'error');
      dispatch(setLoading(false));
    }
  },
);

export const AppleLogin = createAsyncThunk('login',async (data: object, {dispatch}) => {
  // console.log('data: ', data);
    dispatch(setLoading(true));
    try {
      const res = await apiCall({path: '/auth/apple',method: 'POST', body: data,isForm:true});
      // console.log('res:--->> ', res);
      if (res.status === true) { 
        dispatch(saveUserData(res.data));
        dispatch(savePrivilege(res?.data?.privilege));
        dispatch(saveToken(res.token));
        dispatch(setLoading(false));
        showMessage(res.data.message);
        return res;
      } else {
        dispatch(setLoading(false));
        dispatch(showMessage(res.data.message));
        return res;
      }
    } catch (error) {
      console.log(error, 'error');
      dispatch(setLoading(false));
    }
  },
);

export const forgot = createAsyncThunk('forgot',async (data: object, {dispatch}) => {
  // console.log('data: ', data);
    dispatch(setLoading(true));
    try {
      const res = await apiCall({ path: 'forgot', method: 'POST',body: data,});
      if (res.success === true && !res.data.error) {
        console.log(res);
        dispatch(setLoading(false));
        showMessage(res.data.message);
        return res;
      } else {
        dispatch(setLoading(false));
        dispatch(showMessage(res.data.message));
        return res;
      }
    } catch (error) {
      console.log(error, 'error');
      dispatch(setLoading(false));
    }
  },
);

export const resetPassword = createAsyncThunk(
  'resetPassword',
  async (data: object, {dispatch, getState}) => {
    const state = getState() as RootState;
    const token = state.userSlice.token;
    dispatch(setLoading(true));
    try {
      const res = await apiCall({
        path: 'reset',
        method: 'POST',
        body: data,
        token: token
      });
      if (res.success === true && !res.data.error) { 
        dispatch(setLoading(false));
        showMessage(res.data.message);
        return res;
      } else {
        dispatch(setLoading(false));
        dispatch(showMessage(res.data.message));
        return res;
      }
    } catch (error) {
      console.log(error, 'error');
      dispatch(setLoading(false));
    }
  },
);

 
export const getUsers = createAsyncThunk("user/get-users", async (_, { dispatch, getState }) => {
  const state = getState() as RootState;
  const token = state.userSlice.token;
  dispatch(setLoading(true));
  try {
    const res = await apiCall({ path: `user/get-users`, method: "GET", token });  
    // console.log('Get Users--->> ', res.data);
    if (res.success === true) { 
      // dispatch(saveReminder(res?.data?.values))
      // dispatch(setLoading(false));
      return res;
    } else {
      dispatch(setLoading(false));
      return res;
    }
  } catch (error) {
    dispatch(setLoading(false));
  }
});


export const filterData = createAsyncThunk("hashtag-filter", async (data:{contentType:string,nameOfHashtag:string}, { dispatch, getState }) => {
  // console.log('data: ', data);
  const state = getState() as RootState;
  const token = state.userSlice.token;
  // const token = '29|p0eICVzuHaHbw3fkm92svdmV5SQdWfQpIwyveQM984c04bf8';  
  dispatch(setLoading(true));
  try {
    const res = await apiCall({ path: `hashtag-filter?contentType=${data.contentType}&nameOfHashtag=${data.nameOfHashtag}`, method: "GET", token, });  
    // const res = await apiCall({ path: `hashtag-filter?contentType=video&nameOfHashtag=Wellbeing`, method: "GET", token, });  
    // console.log('Get Filter--->> ', res.data);
    if (res.success === true) { 
      // dispatch(saveReminder(res?.data?.values))
      // dispatch(setLoading(false));
      return res;
    } else {
      dispatch(setLoading(false));
      return res;
    }
  } catch (error) {
    console.log('error: ', error);
    dispatch(setLoading(false));
  }
});

export const getNotifications = createAsyncThunk("hashtag-filter", async (_, { dispatch, getState }) => { 
  const state = getState() as RootState;
  const token = state.userSlice.token; 
  dispatch(setLoading(true));
  try {
    const res = await apiCall({ path: `get-notifications`, method: "GET", token, });
    // console.log('Get notifications--->> ', res);
    if (res.success === true) { 
      dispatch(saveNotifications(res?.notification))
      dispatch(setLoading(false));
      return res;
    } else {
      dispatch(setLoading(false));
      return res;
    }
  } catch (error) {
    console.log('error: ', error);
    dispatch(setLoading(false));
  }
});