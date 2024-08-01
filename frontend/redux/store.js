import { configureStore } from "@reduxjs/toolkit";
import taskSlice from "./reduxSlices/tasksSlice";


export const store = configureStore({
  reducer: {
    TASKSLICE: taskSlice,
  }
});
