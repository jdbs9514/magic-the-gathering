import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const URL = 'https://api.magicthegathering.io/v1/cards';

export const fetchApi = createAsyncThunk('cards/fetchApi', async() => {
  const response = await axios.get(URL).catch((error) => {
    console.log('Error: ', error);
    return [];
  });
  const cardsData = response.data.cards;
  return cardsData;
});


export const cardSlice = createSlice({
  name: 'cards',
  initialState: {
    list: [],
    status: 'idle',
    error: null
  },
  reducers: {
    setCardsList: (state, action) => {

    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchApi.fulfilled, (state, action) => {
        state.status = 'success';
        state.list = action.payload;

      })
      .addCase(fetchApi.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchApi.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  }
});

export default cardSlice.reducer;
export const { setCardsList } = cardSlice.actions;