import apiCall from '../../services';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {setLoading, showMessage} from '../common'; 
import { RootState } from '../store';  
import { saveGuideLies } from './guidelinesSlice';
 

export const getGuideLine = createAsyncThunk('guidelines',async (_, {dispatch,getState}) => {
    const state = getState() as RootState; 
    const token = state.userSlice.token;  
    // const token = 'PMi085gynmgI9ZxLqwDTx3DgcInGIQm49kWzlYX6efb865b0';  
    dispatch(setLoading(true));
    try {
      const res = await apiCall({path: 'guidelines',method: 'GET',token}); 
      // console.log('GuideLine:======== ', res);
      if (res.status === true) {  
        dispatch(saveGuideLies({data:res.data,type:'video'}));
        dispatch(setLoading(false));
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
    if (res.status === true) { 
      let data = res.data;
      let Data ={
        videos:{
          data
        }
      } 
      // console.log('Data: ', Data);
      dispatch(saveGuideLies({data:res.data,type:'filter'}));
      // dispatch(saveVideos(Data)); 
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