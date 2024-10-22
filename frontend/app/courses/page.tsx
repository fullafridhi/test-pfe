'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCourses, deleteCourses } from '../../store/coursesSlice';
import Link from 'next/link';

const CourseCard = ({ course, onDelete }) => (
  <div className="course-card">
    <h5>{course.title}</h5>
    <button className="delete-button" onClick={() => onDelete(course._id)}>
      Delete
    </button>
  </div>
);

const CoursesPage = () => {
  const dispatch = useDispatch();
  const { courses, isLoading, error } = useSelector((state) => state.courses);

  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);

  const handleDelete = (courseId) => {
    dispatch(deleteCourses(courseId));
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching courses: {error}</p>;

  return (
    <div>
      <h1>Courses</h1>
      <Link href="/courses/add">Add Course</Link>
      <div className="courses-list">
        {courses.length > 0 ? (
          courses.map((course) => (
            <CourseCard key={course._id} course={course} onDelete={handleDelete} />
          ))
        ) : (
          <p>No courses available</p>
        )}
      </div>
    </div>
  );
};

export default CoursesPage;
