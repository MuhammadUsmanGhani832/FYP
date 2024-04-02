import AsyncStorage from '@react-native-async-storage/async-storage';
import trackerApi from "../api/tracker";
import * as RootNavigation from '../RootNavigation';
import createDataContextClass from './createDataContextClass';

const authReducer = (state, action) => {
  switch (action.type) {
    case "fetch_courses":
      return action.payload
    case "remove_courses_chat":
    return []
    
    default:
      return state;
  }
};
const fetchClassWork = (dispatch) => async ({ courseId }) => {
  try {
  
    const response = await trackerApi.get(`/classwork/${courseId}`);
    let res=response.data.reverse();
    dispatch({type:"fetch_courses",payload:res})
   
     
   
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: "Something went wrong with sign in",
    });
  }
};
const fetchClassWork2 = (dispatch) => async ({ courseId }) => {
  try {
  
    const response = await trackerApi.get(`/classwork2/${courseId}`);
    let res=response.data.reverse();
    dispatch({type:"fetch_courses",payload:res})
   
     
   
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: "Something went wrong with sign in",
    });
  }
};


const createClassWork = (dispatch) => async ( { courseId,title,description,dueDate }) => {
    
    const response = await trackerApi.post("/classchat", { courseId,title,description,dueDate } ); 
  
    // callback
};
const createClassWork2 = (dispatch) => async ( { courseId,title,description,dueDate}) => {

    const response = await trackerApi.post("/classchat2", { courseId,title,description,dueDate } ); 
  
 
};
const createClassWork3 = (dispatch) => async ( { courseId,title,description,dueDate,callback}) => {

    const response = await trackerApi.post("/classchat", { courseId,title,description,dueDate } ); 
  callback();
 
};
const removeFunctionChat = (dispatch) => async () => {

   
    dispatch({type:"remove_courses_chat",})
 
};


export const { Provider, Context } = createDataContextClass(
  authReducer,
  {createClassWork,fetchClassWork,createClassWork2,fetchClassWork2,removeFunctionChat,createClassWork3},
 []
);