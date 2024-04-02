import AsyncStorage from '@react-native-async-storage/async-storage';
import trackerApi from "../../api/tracker";
import * as RootNavigation from '../../RootNavigation';
import createStudentContext from './createStudentContext';

const authReducer = (state, action) => {
  switch (action.type) {
    case "fetch_student_list":
      return {...state, studentList: action.payload };
    case "fetch_attend_list":
      return {...state, attendenceList: action.payload };
    case "postStudenList":
      return { error: action.payload };
    case "clear":
      return {...state, studentList:{
        final: 0,
        mid: 0,
        quiz: 0,
        assignment: 0,
        presentation: 0,
        other: 0,
        total: 0
      }};
    case "clearAttend":
      return {...state, attendenceList:[]};

    default:
      return state;
  }
};
const fetchResult = (dispatch) => async ({ email, courseId }) => {
  try {

    const response = await trackerApi.get(`/get_result/${email}/${courseId}`);

    dispatch({ type: "fetch_student_list", payload: response.data })
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: "Something went wrong with sign in",
    });
  }
};
const getAttendence = (dispatch) => async ({ email, courseId }) => {
  try {

    const response = await trackerApi.get(`/attendance/${email}/${courseId}`);

    dispatch({ type: "fetch_attend_list", payload: response.data })
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: "Something went wrong with sign in",
    });
  }
};

const addResult = (dispatch) => async ({ final, mid, quiz, assignment, presentation, other, total, email, courseId, callback }) => {

  const response = await trackerApi.put("/update_result", { final, mid, quiz, assignment, presentation, other, total, email, courseId });


  callback();
  // callback
};
const clearValue = (dispatch) => async () => {


  dispatch({ type: 'clear' })
};
const clearAttend = (dispatch) => async () => {


  dispatch({ type: 'clearAttend' })
};

export const { Provider, Context } = createStudentContext(
  authReducer,
  { addResult, fetchResult, clearValue ,getAttendence,clearAttend},
  {
    studentList: {
      final: 0,
      mid: 0,
      quiz: 0,
      assignment: 0,
      presentation: 0,
      other: 0,
      total: 0
    }, error: '',
    attendenceList:[]
  }
);