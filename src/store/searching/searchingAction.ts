import apiCall from '../../services';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {setLoading, showMessage} from '../common'; 
import { RootState } from '../store';
import { saveSearch } from './searchingSlice';

export const getSearch = createAsyncThunk('search',async (term: object, {dispatch,getState}) => { 
    // console.log('data:----', term);
    const state = getState() as RootState; 
    const token = state.userSlice.token;  
    // const token = '29|p0eICVzuHaHbw3fkm92svdmV5SQdWfQpIwyveQM984c04bf8';  
    dispatch(setLoading(true));
    try {
      const res = await apiCall({path: 'search?',method: 'GET',params:term,token}); 
      // console.log('searchResponse--->>: ', res);
      dispatch(saveSearch({data:res.data,type:'video'}));
      dispatch(setLoading(false));
      if (res.success === true) {  
        // dispatch(showMessage(res?.message));
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
});
