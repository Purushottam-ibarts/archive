import apiCall from '../../services';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {setLoading, showMessage} from '../common';
import {RootState} from '../store';
import {saveSpeechRecord} from './speechToTextSlice';
import {saveToken} from '../user/userSlice';

export const storeSpeechRecord = createAsyncThunk('speechToText',async(data: object, {dispatch, getState}) => {
    // console.log('data: ', data);
    const state = getState() as RootState;
    const token = state.userSlice.token;
    // const token = 'PMi085gynmgI9ZxLqwDTx3DgcInGIQm49kWzlYX6efb865b0';
    dispatch(setLoading(true));
    try {
      const res = await apiCall({path: 'assist/store-speech-record',method: 'POST',token,body: data,isForm: true,});
      // console.log('res:--->> ', res);
      // if (res.status === true) {
      //   dispatch(saveSpeechRecord(res.data));
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
