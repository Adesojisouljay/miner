import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedCurrency: 'NGN',
};

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setCurrency: (state, action) => {
      state.selectedCurrency = action.payload;
    },
  },
});

export const { setCurrency } = currencySlice.actions;

export const currencyReducer = currencySlice.reducer;
