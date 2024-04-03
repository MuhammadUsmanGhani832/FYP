import AsyncStorage from '@react-native-async-storage/async-storage';
import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
import * as RootNavigation from '../RootNavigation';

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "signin":
      return {
        ...state,
        errorMessage: "",
        token: action.payload,
        userEmail: action.profileEmail,
        user_id: action.userId,
        portal: action.portalCheck
      };
    case "clear_error_message":
      return { ...state, errorMessage: "" };
    case "signout":
      return {
        token: null,
        errorMessage: "",
        userEmail: "",
        user_id: "",
        teachers: [],
        students: [],
        user_detail: [],
        portal: "",
        resetMessage: '',
        events_data: []

      };
    case "fetch_student_list":
      return { ...state, students: action.fetching };
    case "fetch_teacher_list":
      return { ...state, teachers: action.fetching };
    case "user_detail":
      return { ...state, user_detail: action.payload };
    case "not_found":
      return { ...state, errorMessage: action.payload };
    case "resetPassword":
      return { ...state, resetMessage: action.payload };
    case "clearMessage":
      return { ...state, resetMessage: "", errorMessage: '' };
    case "events":
      return { ...state, events_data: action.payload };
    default:
      return state;
  }
};

const tryLocalSignin = (dispatch) => async () => {
  const token = await AsyncStorage.getItem("token");
  const user_id = await AsyncStorage.getItem("user_id");
  const userEmail = await AsyncStorage.getItem("userEmail");
  const portal = await AsyncStorage.getItem("portal");

  if (token) {
    dispatch({ type: "signin", payload: token, userId: user_id, profileEmail: userEmail, portalCheck: portal });

    if (portal === "admin") {
      RootNavigation.navigate("AdminHome");
    } else if (portal === "teacher") {
      RootNavigation.navigate("TabSetting");
    } else {
      RootNavigation.navigate('TabHome')
    }
  } else {
    RootNavigation.navigate("EnterYourEmail");
  }
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: "clear_error_message" });
};

const signup = (dispatch) => async ({ name, email, rollNum, password }) => {
  try {
    await AsyncStorage.setItem("userEmail", email);
    const response = await trackerApi.post("/signup", { name, email, rollNum, password });

    if (response.data === "Email or roll number already exists") {
      dispatch({ type: 'add_error', payload: response.data });
    } else {
      RootNavigation.navigate("StudentList");
    }
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: err,
    });
  }
};
const signin = (dispatch) => async ({ email, password }) => {
  let user = 1234;
  await AsyncStorage.setItem("userEmail", email);
  const response = await trackerApi.post("/signin", { email, password });

  if (response.data == "Invalid password") {
    return dispatch({ type: 'add_error', payload: response.data })
  } else {
    user = response.data.user._id;
    await AsyncStorage.setItem("token", response.data.token);
    await AsyncStorage.setItem("user_id", user);
    await AsyncStorage.setItem("portal", "student");
    dispatch({ type: "signin", payload: response.data.token, profileEmail: email, userId: user, portalCheck: 'student' });
    RootNavigation.navigate("TabHome");
  }
};

const oneStudentById = (dispatch) => async ({ id }) => {
  try {
    const response = await trackerApi.get(`/one_users/${id}`);
    let user = response.data;
    console.log(user)
    dispatch({ type: "user_detail", payload: user });
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: "Something went wrong with sign in",
    });
  }
};
const removeStudent = (dispatch) => async ({ id, callback }) => {

  const response = await trackerApi.delete(`/users/${id}`);
  callback()
};
const removeTeacher = (dispatch) => async ({ id, callback }) => {

  const response = await trackerApi.delete(`/teacher/${id}`);
  callback()
};
const deleteCourse = (dispatch) => async ({ id, callback }) => {

  const response = await trackerApi.delete(`/courses/${id}`);
  callback()
};


const resetPassword = (dispatch) => async ({ userId, oldPassword, newPassword, callback }) => {

  const response = await trackerApi.put(`/users/${userId}/password`, { oldPassword, newPassword });
  if (response.data === "Password updated successfully") {
    dispatch({ type: "resetPassword", payload: response.data });
    callback()
  }
  else if (response.data === "Old password is incorrect") {
    dispatch({ type: "add_error", payload: response.data });
  } else {
    dispatch({ type: "resetPassword", payload: 'your request cant proceed Contact to Admin' });
  }

};

const fetchStudentList = (dispatch) => async () => {
  try {
    const response = await trackerApi.get(`/users`);
    let myArray = response.data;
    console.log(myArray)
    myArray = myArray.reverse();
    dispatch({ type: "fetch_student_list", fetching: myArray });
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: "Internal Server Error",
    });
  }
};

// Admin login and sign up

const admin_signup = (dispatch) => async ({ email, password }) => {
  try {
    await AsyncStorage.setItem("userEmail", email);
    const response = await trackerApi.post("/admin_signup", { email, password });

    await AsyncStorage.setItem("token", response.data.token.token);
    await AsyncStorage.setItem("user_id", response.data.userId.userId);
    await AsyncStorage.setItem("teacher", "admin");

    dispatch({
      type: "signin", payload: response.data.token, profileEmail: email,
      userId: response.data.userId.userId, teacherCheck: 'false'
    });

    RootNavigation.navigate("AdminHome");
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: "Something went wrong with sign up",
    });
  }
};

const admin_signin = (dispatch) => async ({ email, password }) => {
  try {
    await AsyncStorage.setItem("userEmail", email);
    const response = await trackerApi.post("/admin_signin", { email, password });

    await AsyncStorage.setItem("token", response.data.token.token);
    await AsyncStorage.setItem("user_id", response.data.userId.userId);
    await AsyncStorage.setItem("portal", "admin");
    dispatch({ type: "signin", payload: response.data.token, profileEmail: email, userId: response.data.userId.userId, portalCheck: 'admin' });
    RootNavigation.navigate("AdminHome");
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: "Something went wrong with sign in",
    });
  }
};


const createEvent = (dispatch) => async ({ title, description, createDate, callback }) => {

  const response = await trackerApi.post(`/events`, { title, description, createDate });
  callback()

}
const fetchEvent = (dispatch) => async () => {

  try {
    const response = await trackerApi.get('/events');
    if (response.data === 'No events found') return;
    const data = response.data.reverse();
    dispatch({ type: 'events', payload: data })
  } catch (error) {
    console.log(error.message)
  }


}


// Teacher login and sign up
const resetPasswordTeacher = (dispatch) => async ({ userId, oldPassword, newPassword, callback }) => {

  const response = await trackerApi.put(`/teacher/${userId}/password`, { oldPassword, newPassword });
  if (response.data === "Password updated successfully") {
    dispatch({ type: "resetPassword", payload: response.data });
    callback()
  }
  else if (response.data === "Old password is incorrect") {
    dispatch({ type: "add_error", payload: response.data });
  } else {
    dispatch({ type: "resetPassword", payload: 'your request cant proceed Contact to Admin' });
  }

};
const oneTeacherById = (dispatch) => async ({ id }) => {
  try {
    const response = await trackerApi.get(`/one_teacher/${id}`);
    let user = response.data;
    dispatch({ type: "user_detail", payload: user });
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: "Something went wrong with sign in",
    });
  }
};


const teacher_signin = (dispatch) => async ({ email, password }) => {
  let user = 1234;
  await AsyncStorage.setItem("userEmail", email);
  const response = await trackerApi.post("/teacher_signin", { email, password });

  if (response.data == "Invalid password") {
    return dispatch({ type: 'add_error', payload: response.data })
  } else {
    user = response.data.user._id;
    await AsyncStorage.setItem("token", response.data.token);
    await AsyncStorage.setItem("user_id", user);
    await AsyncStorage.setItem("portal", "teacher");
    dispatch({ type: "signin", payload: response.data.token, profileEmail: email, userId: user, portalCheck: 'teacher' });
    RootNavigation.navigate("TabSetting");
  }
};

const teacher_signup = (dispatch) => async ({ name, email, password }) => {
  try {
    await AsyncStorage.setItem("userEmail", email);
    const response = await trackerApi.post("/teacher_signup", { name, email, password });

    if (response.data === "Email already exists") {
      dispatch({ type: 'add_error', payload: response.data });
    } else {
      RootNavigation.navigate("TeacherList");
    }
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: err,
    });
  }
};

const fetchTeacherList = (dispatch) => async () => {
  try {
    const response = await trackerApi.get(`/teacher`);
    let myArray = response.data;
    myArray = myArray.reverse();
    dispatch({ type: "fetch_teacher_list", fetching: myArray });
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: "Something went wrong with sign in",
    });
  }
};
// other functionss
const signout = (dispatch) => async () => {
  dispatch({ type: "signout" });
  RootNavigation.navigate("EnterYourEmail");
  await AsyncStorage.removeItem("token");
  await AsyncStorage.removeItem("user_id");
  await AsyncStorage.removeItem("userEmail");
};
const clearMessage = (dispatch) => async () => {
  dispatch({ type: "clearMessage" });
};

const check_email = (dispatch) => async ({ email }) => {
  const response = await trackerApi.get(`/check/${email}`);
  console.log(response.data.user);
  if (response.data.text === "student found") {
    RootNavigation.navigate("Signin", { user: response.data.user });
  } else if (response.data.text === "teacher found") {
    RootNavigation.navigate("Teacher_Signin", { user: response.data.user });
  } else if (response.data.text === "not found") {
    dispatch({ type: "not_found", payload: "No email found. Please provide a university email" });
  } else {
    dispatch({ type: "not_found", payload: "No email found. Please provide a university email" });
  }
};

export const { Provider, Context } = createDataContext(
  authReducer,
  {
    teacher_signin,
    signin,
    signout,
    signup,
    clearErrorMessage,
    tryLocalSignin,
    teacher_signup,
    check_email,
    admin_signin,
    admin_signup,
    fetchStudentList,
    fetchTeacherList,
    oneStudentById,
    resetPassword,
    resetPasswordTeacher,
    clearMessage,
    oneTeacherById,
    createEvent, fetchEvent, removeStudent, removeTeacher, deleteCourse
  },
  {
    token: null,
    errorMessage: "",
    userEmail: "",
    user_id: "",
    portal: "",
    students: [],
    teachers: [],
    user_detail: '',
    resetMessage: '',
    events_data: [],
  }
);
