import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CourseCard from '../components/CourseCrad'; // Adjust the path as neede

const CourseList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('/api/courses'); 
        setCourses(response.data.courses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="course-list">
      {courses.map(course => (
        <CourseCard key={course._id} course={course} />
      ))}
    </div>
  );
};

export default CourseList;

