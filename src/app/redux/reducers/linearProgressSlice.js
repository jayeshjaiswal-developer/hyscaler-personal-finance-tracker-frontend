
import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    isClicked: false,
    isSideMenuClicked:-1,
  }


  export const linearProgressSlice = createSlice({
    name: 'linearProgress',
    initialState,
    reducers: {
      showLinearBar: (state) => {
        state.isClicked = true;
      },
      hideLinearBar: (state) => {
        state.isClicked = false
      },
      updateSideMenuClicked: (state,action)=>{
        state.isSideMenuClicked = action.payload;
      }
     
    },
  })
  
  export const { showLinearBar, hideLinearBar, updateSideMenuClicked } = linearProgressSlice.actions
  
  export default linearProgressSlice.reducer;
