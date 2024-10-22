'use client'

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addVideo } from '@/store/videoSlice';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

const AddVideoPage = ({ courseId }) => {
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(addVideo({ title, link, courseId })); // Send the courseId with the video data
    router.push('/videos'); // Redirect after adding
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Video Link:</label>
        <input
          type="text"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          required
        />
      </div>
      <Button type="submit">Add Video</Button>
    </form>
  );
};

export default AddVideoPage;
