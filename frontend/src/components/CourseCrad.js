import React from 'react';
// import './CourseCard.css';


const CourseCard = ({ course }) => {
  return (
    <div className="course-card">
      <img src={course.img} alt={course.title} className="course-image" />
      <h5 className="course-title">{course.title}</h5>
      <p className="course-description">{course.description}</p>
      <p className="course-duration">Duration: {course.duration} hours</p>
      <p className="course-category">Category: {course.category}</p>
      <p className="course-teacher">Teacher: {course.teacher}</p>
      <p className="course-price">Price: {course.price} Dt</p>
      <button className="enroll-button">Enroll Now</button>
    </div>
  );
};

export default CourseCard;
