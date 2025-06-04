import {createAsyncThunk} from '@reduxjs/toolkit';
import {  saveStudentNote, saveStudents, } from './studentsSlice';
import {RootState} from '../store';
import {setLoading, showMessage} from '../common';
import apiCall from '../../services';

export const getStudents = createAsyncThunk('students',async (_, {dispatch, getState}) => { 
    const state = getState() as RootState; 
    const token = state.userSlice.token;   
    // const token = 'PMi085gynmgI9ZxLqwDTx3DgcInGIQm49kWzlYX6efb865b0';   
    dispatch(setLoading(true));
    try {
      const res = await apiCall({path: 'students',method: 'GET',token}); 
      // console.log('res: ', res);
      if (res.status === true) {  
        dispatch(saveStudents({data:res.data,type:'filter'}));
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

export const getStudentsNotes = createAsyncThunk('students/get_save_note?',async (noteId: object, {dispatch, getState}) => { 
  // console.log('noteId:-->>', noteId);
    const state = getState() as RootState; 
    const token = state.userSlice.token;   
    // const token = 'PMi085gynmgI9ZxLqwDTx3DgcInGIQm49kWzlYX6efb865b0';   
    dispatch(setLoading(true));
    try {
      const res = await apiCall({path:`students/get_save_note?noteId=${noteId.noteId}`,method: 'GET',token}); 
      // console.log('res:======>>> ', res.status);
      // console.log('students======>>>>>', res);
      if (res.status) {  
        dispatch(saveStudentNote(res.noteContent));
        // dispatch(setLoading(false)); 
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
export const  saveStudentsNotes = createAsyncThunk('/students/save_note',async (data: object, {dispatch,getState}) => {
  const state = getState() as RootState; 
  const token = state.userSlice.token;  
  // const token = 'p0eICVzuHaHbw3fkm92svdmV5SQdWfQpIwyveQM984c04bf8';  
  dispatch(setLoading(true));
  try {
    const res = await apiCall({path: 'students/save_note',method: 'POST',token,body: data,isForm:true}); 
    // console.log('Student Notes Saved:======== ', res);
    if (res.success) {   
      dispatch(setLoading(false));
      dispatch(showMessage(res.message));
      return res;
    } else {
      dispatch(setLoading(false));
      dispatch(showMessage(res.message));
      return res;
    }
  } catch (error) {
      console.log('error: ', error);
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
    // console.log('Get Filter--->> ', res.data);
    if (res.status === true) { 
      let data = res.data;
      let Data ={
        videos:{
          data
        }
      } 
      // console.log('Data: ', Data);
      dispatch(saveStudents({data:res.data,type:'filter'}));
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