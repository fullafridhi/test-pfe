import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunks
export const getAllVideos = createAsyncThunk('videos/fetchAll', async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/videos`);
  return response.data; 
});

export const addVideo = createAsyncThunk('videos/add', async ({ courseId, video }) => {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/videos/${courseId}`, video);
  return response.data.video; 
});

export const getCourseVideos = createAsyncThunk('videos/fetchByCourse', async (courseId) => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/videos/course/${courseId}`);
  return response.data.course.videos; 
})

// Slice
const videoSlice = createSlice({
  name: 'videos',
  initialState: {
    videos: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllVideos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllVideos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.videos = action.payload || [];
      })
      .addCase(getAllVideos.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addVideo.fulfilled, (state, action) => {
        state.videos.push(action.payload);
      })
      .addCase(getCourseVideos.fulfilled, (state, action) => {
        state.videos = action.payload;
      });
  },
});


export default videoSlice.reducer;
