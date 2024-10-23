import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import CourseList from "../components/CourseList";
import { setCourses } from "../redux/courseSlice";

const Home = () => {
  const API_URL = process.env.REACT_APP_BACKEND_URL;
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses.courses); 

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${API_URL}/courses`);

        console.log("Fetched courses:", response.data.courses); 
        dispatch(setCourses(response.data.courses));
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, [API_URL, dispatch]);

  return (
    <div className="home-container">
      <h1>Available Courses</h1>
      <div className="course-list">
        {courses.length === 0 ? (
          <p>No courses available at the moment.</p>
        ) : (
          courses.map((course) => (
            <CourseList key={course._id} course={course} />
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
