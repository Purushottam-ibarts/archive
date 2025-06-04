import apiCall from '../../services';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {setLoading, showMessage} from '../common'; 
import { RootState } from '../store';  
import { saveEditProfile } from './editProfileSlice';

export const editProfile = createAsyncThunk('user/edit-profile',async (data: object, {dispatch,getState}) => {
    const state = getState() as RootState; 
    const token = state.userSlice.token;  
    // const token = '8o9aM0RwXTcURwnJDinaMTq6TLRFmTkHFSsElFa8d37276d0';  
    dispatch(setLoading(true));
    try {
      const res = await apiCall({path: 'user/edit-profile',method: 'POST',token,body: data,isForm:true}); 
      // console.log('EditProfile:======== ', res);
      if (res.status === true) {  
        dispatch(saveEditProfile(res.data));
        dispatch(setLoading(false));
        dispatch(showMessage(res.message));
        return res;
      } else {
        // dispatch(setLoading(false));
        // dispatch(showMessage(res.data.message));
        return res;
      }
    } catch (error) {
      dispatch(setLoading(false));
    }
  },
);
 
