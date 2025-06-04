import {createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {setLoading, showMessage} from '../common';
import apiCall from '../../services';
import { savePlans } from './pricingSlice';
import { savePrivilege, saveUserData } from '../user/userSlice';

export const getPlans = createAsyncThunk('get-plans',async (_, {dispatch, getState}) => { 
    const state = getState() as RootState; 
    const token = state.userSlice.token;   
    // const token = 'p0eICVzuHaHbw3fkm92svdmV5SQdWfQpIwyveQM984c04bf8';   
    dispatch(setLoading(true));
    try {
      const res = await apiCall({path: 'get-plans',method: 'GET',token}); 
      if (res.status === true) {  
          // console.log('res: ', res);
        dispatch(savePlans(res.plans));
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

export const  postPaymentIntent = createAsyncThunk('create-payment-intent',async (data: object, {dispatch,getState}) => {
  const state = getState() as RootState; 
  const token = state.userSlice.token;  
  // const token = 'p0eICVzuHaHbw3fkm92svdmV5SQdWfQpIwyveQM984c04bf8';  
  dispatch(setLoading(true));
  try {
    const res = await apiCall({path: 'create-payment-intent',method: 'POST',token,body: data,isForm:true}); 
    // console.log('create-payment-intent:======== ', res);
    if (res.status === true) {  
      // dispatch(savePost(res.data));
      // dispatch(setLoading(false));
      // dispatch(showMessage(res.message));
      return res;
    } else {
      dispatch(setLoading(false));
      // dispatch(showMessage(res.message));
      return res;
    }
  } catch (error) {
      console.log('error: ', error);
    dispatch(setLoading(false));
  }
});

export const  addSubscriiption = createAsyncThunk('add-subscription',async (data: object, {dispatch,getState}) => {
  // console.log('data: ', data);
  const state = getState() as RootState; 
  const token = state.userSlice.token;  
  // console.log('token: ', token);
  // const token = '5|n2n2vgOdh6kl4wA9pZLBrsOwM46HrB2iHl34ihBg10c4e109';  
  dispatch(setLoading(true));
  try {
    const res = await apiCall({path: 'add-subscription',method: 'POST',token,body: data}); 
    // console.log(':========>>>>> ', res);
    if (res.status === true) {   
      // console.log(':========>>>>> ', res.planId);
      dispatch(savePrivilege(res?.planId));
      // dispatch(savePost(res.data));
      // dispatch(setLoading(false));
      // dispatch(showMessage(res.message));
      return res;
    } else {
      dispatch(setLoading(false));
      // dispatch(showMessage(res.message));
      return res;
    }
  } catch (error) {
      console.log('error: ', error);
    dispatch(setLoading(false));
  }
});