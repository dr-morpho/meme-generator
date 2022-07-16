import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type ItemsType = {
  topText: string;
  bottomText: string;
  randomImage: string;
};

const memeState: ItemsType = {
  topText: '',
  bottomText: '',
  randomImage: 'http://i.imgflip.com/1bij.jpg',
};

const itemsSLice = createSlice({
  name: 'items',
  initialState: memeState,
  reducers: {
    memeTopText(state, action: PayloadAction<string>) {
      state.topText = action.payload;
    },
    memeBottomText(state, action: PayloadAction<string>) {
      state.bottomText = action.payload;
    },
    memeRandomImage(state, action: PayloadAction<string>) {
      state.randomImage = action.payload;
    },
  },
});

export const topTextSelector = (state: RootState) => state.ItemsSLice.topText;
export const bottomTexSelector = (state: RootState) => state.ItemsSLice.bottomText;
export const imageSelector = (state: RootState) => state.ItemsSLice.randomImage;

export const { memeTopText, memeBottomText, memeRandomImage } = itemsSLice.actions;
export default itemsSLice.reducer;
