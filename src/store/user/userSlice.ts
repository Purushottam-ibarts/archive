import {createSlice} from '@reduxjs/toolkit'; 

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    user: {
      // email: '',
      // first_name: '',
      // last_name: '',
      // company: '',
      // password: '',
      // c_password: '',
      // role: 1,
      // is_authorized: 1,
      // is_active: 1,
      // id:'',
    },
    privilege:0,
    token: null,  
    mode:'',
    otp: '',
    initalRoute: 'Splash', 
    profile:false,
    notifications:[],
  },
  reducers: {
    saveToken: (state, {payload}) => {
      // console.log('Token---: ', state);
      state.token = payload;
    }, 
    saveUserData: (state, {payload}) => {
      // console.log('User: ', state);
      state.user = payload;
    }, 
    savePrivilege: (state, {payload}) => {
      // console.log('savePrivilege User:>>>>>>>> ', payload);
      state.privilege = payload;
    }, 
    profileStatus: (state,{payload}) => { 
      // console.log('payload: ', payload);
      state.profile = payload;
    },
    saveNotifications: (state,{payload}) => { 
      // console.log('payload: ', payload);
      state.notifications = payload;
    }
  },
});

export const {saveToken,saveUserData,profileStatus,savePrivilege,saveNotifications} = usersSlice.actions;

export default usersSlice.reducer;
