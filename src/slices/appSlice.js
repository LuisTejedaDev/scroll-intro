import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    dimensions: {
        width: 0,
        height: 0
    },
    topDimensions: {
        topWidth: 0,
        topHeight: 0
    },
    bottomDimensions: {
        bottomWidth: 0,
        bottomHeight: 0
    },
} 

export const navSlice = createSlice({
    name: 'nav',
    initialState,
    reducers: {
        setDimensions: (state, action) => {state.dimensions = action.payload},
        setTopDimensions: (state, action) => {state.topDimensions = action.payload},
        setBottomDimensions: (state, action) => {state.bottomDimensions = action.payload},
    }
})

export const {setDimensions, setTopDimensions, setBottomDimensions} = navSlice.actions

export const selectDimensions = (state) => state.navApp.dimensions;
export const selectTopDimensions = (state) => state.navApp.topDimensions;
export const selectBottomDimensions = (state) => state.navApp.bottomDimensions;

export default navSlice.reducer