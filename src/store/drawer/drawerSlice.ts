import { createSlice,nanoid } from '@reduxjs/toolkit'
  
export const drawerSlice = createSlice({
  name: 'drawerData',
  initialState:{
    drawersData:[]
  },
  reducers: {
    AddDrawerData:(state,action)=>{ 
        state.drawersData = action.payload 
    },
  },
})

export const {  AddDrawerData} = drawerSlice.actions
export default drawerSlice.reducer