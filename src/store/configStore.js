import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/user";
import loadingSlice from "./slices/loading";

export const store = configureStore({
  reducer: {
    user: userSlice,
    loading: loadingSlice,
  },
  devTools: true,
});
