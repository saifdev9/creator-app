import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  feeds: [],
};

const feedSlice = createSlice({
  name: "feeds",
  initialState,
  reducers: {
    addFeed(state, action) {
      state.feeds = [...state.feeds, action.payload];
    },
    removeFeed(state, action) {
      state.feeds = state.feeds.filter((feed) => feed.id !== action.payload);
    },
    removeAll(state) {
      state.feeds = [];
    },
  },
});

export const { addFeed, removeAll, removeFeed } = feedSlice.actions;
export default feedSlice.reducer;

export const getFeeds = (state) => state.feeds.feeds;
