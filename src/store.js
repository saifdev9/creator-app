import { configureStore } from "@reduxjs/toolkit";
import feedReducer from "./feedSlice";

function loadState() {
  try {
    const storedValue = localStorage.getItem("feeds");
    return storedValue ? JSON.parse(storedValue) : [];
  } catch (error) {
    console.log(error);
  }
}

function saveState(state) {
  try {
    localStorage.setItem("feeds", JSON.stringify(state));
  } catch (error) {
    console.log(error);
  }
}

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    feeds: feedReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  saveState({ feeds: store.getState().feeds });
});
