'use client'

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVideos, deleteVideo } from '@/store/videoSlice';
import { RootState } from '@/store/store';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const AdminVideosPage = () => {
  const dispatch = useDispatch();
  const { videos, isLoading, error } = useSelector((state: RootState) => state.videos);

  useEffect(() => {
    dispatch(getVideos());
  }, [dispatch]);

  const handleDelete = (videoId) => {
    dispatch(deleteVideo(videoId));
  };

  return (
    <div>
      <h1>Admin Videos Page</h1>
      {isLoading && <p>Loading videos...</p>}
      {error && <p>Error fetching videos: {error}</p>}
      <Link href="/videos/add">
        <Button>Add Video</Button>
      </Link>
      <div>
        {videos.length > 0 ? (
          videos.map((video) => (
            <div key={video._id}>
              <h3>{video.title}</h3>
              <Button onClick={() => handleDelete(video._id)}>Delete</Button>
            </div>
          ))
        ) : (
          <p>No videos available</p>
        )}
      </div>
    </div>
  );
};

export default AdminVideosPage;
