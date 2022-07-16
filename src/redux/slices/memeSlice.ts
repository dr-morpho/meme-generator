import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

type AxiosItems = {
  id: string;
  name: string;
  url: string;
  width: number;
  height: number;
  box_count: number;
};

type MemeItemType = {
  id: string;
  name: string;
  url: string;
  width: number;
  height: number;
  box_count: number;
};

interface MemeStateType {
  items: MemeItemType[];
}

export const fetchMemes = createAsyncThunk<AxiosItems[]>('meme/fetchMeme', async () => {
  const response = await axios.get('https://api.imgflip.com/get_memes');
  return response.data.data.memes;
});

const memeState: MemeStateType = {
  items: [],
};

const memeSlice = createSlice({
  name: 'meme',
  initialState: memeState,
  reducers: {
    setMeme(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMemes.pending, (state) => {
      state.items = [];
    });
    builder.addCase(fetchMemes.fulfilled, (state, action) => {
      state.items = action.payload;
    });
    builder.addCase(fetchMemes.rejected, (state) => {
      state.items = [];
    });
  },
});

export const itemsMemeSelect = (state: RootState) => state.memeSlice.items;
export const { setMeme } = memeSlice.actions;
export default memeSlice.reducer;
