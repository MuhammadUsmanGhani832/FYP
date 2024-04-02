import AsyncStorage from '@react-native-async-storage/async-storage';
import createDataContext3 from "./createDataContext3";
import trackerApi from "../api/tracker";
import * as RootNavigation from '../RootNavigation';

const authReducer = (stateT, action) => {
    switch (action.type) {

        case "get_courses":
            return {...stateT,get_courses:action.payload}
        case "get_enrolled_student_list":
            return {...stateT,get_enrolled_student:action.payload}
        case "clear":
            return {get_enrolled_student:[],get_courses:[]}

        default:
            return stateT;
    }
};

const getEnrollCourses = dispatch => async ({ email }) => {

    const response = await trackerApi.get(`/enrollments/${email}`);
    console.log(response.data);
    if (!response.data) {
        return null;
    }
    else {
        dispatch({ type: 'get_courses', payload: response.data });
    }
};
const getEnrollStudent = dispatch => async ({ courseId }) => {

    const response = await trackerApi.get(`/enrollments/course/${courseId}`);
    console.log(response.data);
    if (!response.data) {
        return null;
    }
    else {
        dispatch({ type: 'get_enrolled_student_list', payload: response.data });
    }
};
const clear = dispatch => async () => {

   dispatch({type:'clear'})
};





export const { Provider, Context } = createDataContext3(
    authReducer,
    {   getEnrollCourses,getEnrollStudent ,clear},
    {get_enrolled_student:[],get_courses:[]}
);
