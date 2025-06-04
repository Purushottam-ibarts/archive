import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer, FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, } from 'redux-persist'
import userSlice from './user/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import common from './common';
import dashboardSlice from './dashboard/dashboardSlice';
import studentSlice from './students/studentsSlice';
import podcastSlice from './podsCast&Webinar/podsCastSlice'; 
import drawerSlice  from './drawer/drawerSlice'; 
import businessSlice  from './businessFinance/businesSlice';
import wellbeingSlice from './wellBeing/wellbeingSlice';
import guideLinesSlice  from './guidelines/guidelinesSlice';
import videoSlice from './video/videoSlice'; 
import blogsSlice from './blogs/blogSlice'
import coursesSlice from './courses/coursesSlice';
import downloadSlice from './downnload/downloadSlice';
import patientVideoSlice from './patientVideo/patientVideoSlice';
import speechToTextSlice from './speechToText/speechToTextSlice';
import editProfileSlice from './editPrrofile/editProfileSlice';
import manageUserSlice from './manageUser/manageUserSlice';
import plansSlice from './pricing/pricingSlice';
import searchSlice from './searching/searchingSlice'; 
import postSlice from './forums/posts/postSlice';
import commentSlice from './forums/store-comments/commentSlice';
import emailTempSlice from './emailTemplete/emailTempSlice';
import notesTempSlice from './notesTemplete/notesTempSlice';
import assignVideoSlice from './assignVideos/assignVideoSlice';
import { singlePodcastSlice } from './singlePodcastVideo/podcastSlice';
import singleDashboardSlice from './singleDashboardVideo/singleDashboardSlice';
import workFlowSlice from './workFlow/workFlowSlice';

const allReducer = combineReducers({
  common,
  userSlice,
  drawerSlice,
  blogsSlice,
  dashboardSlice,
  studentSlice,
  podcastSlice,
  businessSlice,
  wellbeingSlice,
  guideLinesSlice,
  videoSlice,
  singlePodcastSlice,
  singleDashboardSlice,
  coursesSlice,
  downloadSlice,
  patientVideoSlice,
  speechToTextSlice,
  editProfileSlice,
  manageUserSlice,
  plansSlice,
  searchSlice,
  postSlice,
  commentSlice,
  emailTempSlice,
  notesTempSlice,
  assignVideoSlice,
  workFlowSlice,
})

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['userSlice'],
  blacklist: ['dashboardSlice','postSlice']
}

const persistedReducers = persistReducer(persistConfig, allReducer);

export const store = configureStore({
  reducer: persistedReducers,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      // serializableCheck: { ignoredPaths: ['some.nested.path'] }
    }),
})

export const persister = persistStore(store);
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch