import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunks
export const getCourses = createAsyncThunk('courses/fetchCourses', async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/courses`);
  return response.data.courses;
});

export const addCourses = createAsyncThunk('courses/addCourse', async (course) => {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/courses/add`, course);
  return response.data; 
});

export const deleteCourses = createAsyncThunk('courses/deleteCourse', async (courseID) => {
  await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/courses/delete/${courseID}`);
  return courseID; 
});

// Slice
const coursesSlice = createSlice({
  name: 'courses',
  initialState: {
    courses: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCourses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCourses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.courses = action.payload || [];
      })
      .addCase(getCourses.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addCourses.fulfilled, (state, action) => {
        state.courses.push(action.payload); // Ensure the payload is the new course object
      })
      .addCase(deleteCourses.fulfilled, (state, action) => {
        state.courses = state.courses.filter(course => course._id !== action.payload);
      });
  },
});

// Export the reducer
export default coursesSlice.reducer;
