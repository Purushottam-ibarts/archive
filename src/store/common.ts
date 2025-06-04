import {createSlice} from '@reduxjs/toolkit';
import {Alert, Platform, ToastAndroid} from 'react-native';
import Toast from 'react-native-simple-toast';
const initialState = { 
  loading: false,  
  loadingModal: false,
};

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setLoading: (state, {payload}) => {
      state.loading = payload;
    }, 
    setLoadingModal: (state, {payload}) => {
      state.loadingModal = payload;
    }, 
    showMessage: (_, {payload}) => { 
      Toast.show(payload, Toast.SHORT, {
        backgroundColor: '#102335',
      });
    }, 
  },
});

export const { setLoading,setLoadingModal,   showMessage,  } = commonSlice.actions;

export default commonSlice.reducer;
