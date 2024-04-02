import AsyncStorage from '@react-native-async-storage/async-storage';
import createDataContext2 from "./createDataContext2";
import trackerApi from "../api/tracker";
import * as RootNavigation from '../RootNavigation';


const authReducer = (myState, action) => {
  switch (action.type) {
    case "fetch_courses":
      return { ...myState, fetch_courses: action.payload }

    case "fetch_subjects":
      return { ...myState, fetch_subjects: action.payload }

    case "single_subjects":
      return { ...myState, single_fetch_sub: action.payload }
    case "clearSubjects":
      return { ...myState, fetch_subjects: [] }

    default:
      return myState;
  }
};
const fetchCourses = dispatch => async () => {
  try {
    const response = await trackerApi.get('/courses');
    dispatch({ type: 'fetch_courses', payload: response.data });
  } catch (error) {
    console.log(error.message)
  }
};

// subjects    
// subjects    
// subjects    

const fetchSubjects = dispatch => async ({ id }) => {
  try {
    const response = await trackerApi.get(`/subjects/${id}`);
    const data = response.data.reverse();
    dispatch({ type: 'fetch_subjects', payload: response.data });
  } catch (error) {
    console.log(error.message)
  }
};
const update_subjects = dispatch => async ({ studentId, subjectId, courseID, CourseTitle, CR_HRS, GRADE, callback }) => {
  const response = await trackerApi.put(`/subjects/${studentId}/${subjectId}`, { courseID, CourseTitle, CR_HRS, GRADE });

  callback();
};
const remove_subject = dispatch => async ({ studentId, subjectId, callback }) => {
  const response = await trackerApi.delete(`/subjects/${studentId}/${subjectId}`,);

  callback();
};
const single_fetch = dispatch => async ({ studentId, subjectId }) => {
  const response = await trackerApi.get(`/subjects/${studentId}/${subjectId}`);

  dispatch({ type: 'single_subjects', payload: response.data });
};

const addSubjectToStudentTranscript = (dispatch) => async ({ courseID, CourseTitle, CR_HRS, GRADE, id, callback }) => {

  const response = await trackerApi.post(`/subjects/${id}`, { courseID, CourseTitle, CR_HRS, GRADE });

  callback();
};






const enrollApi = dispatch => async ({ email, course_id, callback }) => {

  const courseId = course_id;
  const response = await trackerApi.post('/enroll', { email, courseId });

  dispatch({ type: '..._courses', payload: response.data });
  callback();
};


const createCourse = (dispatch) => async ({ course_name, course_description, instructor_name, schedule, location, available_seats }) => {

  const response = await trackerApi.post("/courses", { course_name, course_description, instructor_name, schedule, location, available_seats });

  RootNavigation.navigate("CourseList");
};

const clearSubjects = (dispatch) => async () => {
  dispatch({ type: "clearSubjects" })
};


export const { Provider, Context } = createDataContext2(
  authReducer,
  { createCourse, fetchCourses, enrollApi, fetchSubjects, addSubjectToStudentTranscript, single_fetch, update_subjects, remove_subject, clearSubjects },
  { fetch_subjects: [], single_fetch_sub: [], fetch_courses: [] }
);
