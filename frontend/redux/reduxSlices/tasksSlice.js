import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  taskData: []
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasksData(state, action) {
      state.taskData = [...state.taskData, action.payload]; 
    },
  },
});

export const { setTasksData } = tasksSlice.actions;

export default tasksSlice.reducer;
