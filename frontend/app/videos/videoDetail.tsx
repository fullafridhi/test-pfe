'use client'

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVideoById } from '../../store/videoSlice';

const VideoDetailPage = ({ videoId }) => {
  const dispatch = useDispatch();
  const { video, isLoading, error } = useSelector((state) => state.videos);

  useEffect(() => {
    dispatch(getVideoById(videoId));
  }, [dispatch, videoId]);

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error fetching video: {error}</p>}
      {video && (
        <div>
          <h1>{video.title}</h1>
          <p>{video.description}</p>
          <p>Teacher: {video.teacher}</p>
          <p>Views: {video.views}</p>
          <video controls src={video.link}></video>
        </div>
      )}
    </div>
  );
};

export default VideoDetailPage;
