import { configureStore } from "@reduxjs/toolkit";
import feedReducer from "./feedSlice";

export const store = configureStore({
  reducer: {
    feeds: feedReducer,
  },
});
