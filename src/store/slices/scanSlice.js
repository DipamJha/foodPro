import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  scanHistory: [],
  currentScan: null,
  loading: false,
  error: null,
};

const scanSlice = createSlice({
  name: 'scan',
  initialState,
  reducers: {
    setScanHistory: (state, action) => {
      state.scanHistory = action.payload;
    },
    addScan: (state, action) => {
      state.scanHistory.unshift(action.payload);
    },
    setCurrentScan: (state, action) => {
      state.currentScan = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setScanHistory, addScan, setCurrentScan, setLoading, setError } = scanSlice.actions;
export default scanSlice.reducer;