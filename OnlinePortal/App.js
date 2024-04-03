import * as React from 'react';
import { Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './src/RootNavigation';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
const Stack = createStackNavigator();
//  All screens  
//  All screens  
//  All screens  
//  All screens 
import LocalStorageCheck from './src/screens/AuthScreens/LocalStorageCheck'
import Signin from './src/screens/AuthScreens/Signin';
import TeacherLogin from './src/screens/AuthScreens/TeacherLogin';
import TeacherSignup from './src/screens/AuthScreens/TeacherSignup'
import EnterYourEmail from './src/screens/AuthScreens/EnterYourEmail';
import DetailScreen from './src/screens/AdminScreens/DetailScreen';
import DetailScreenForClass from './src/screens/DetailScreenForClass';
import CreateNewCourse from './src/screens/AdminScreens/CreateNewCourse';
import CreateClassWork from './src/screens/CreateClassWork';
import CreateClassWork2 from './src/screens/CreateClassWork2';
import CreateClassWork1 from './src/screens/CreateClassWork1';
import AdminSignIn from './src/screens/AuthScreens/AdminSignIn';
import AdminHome from './src/screens/AdminScreens/AdminHome';
import StudentList from './src/screens/AdminScreens/StudentList'
import TeacherList from './src/screens/AdminScreens/TeacherList';
import CourseList from './src/screens/AdminScreens/CourseList';
import EnrolledCoursesList from './src/screens/EnrolledCoursesList';
import AddStudent from './src/screens/AdminScreens/AddStudent'
import AddTeacher from './src/screens/AdminScreens/AddTeacher'
import StudentDetailScreen from './src/screens/AdminScreens/StudentDetailScreen';
import TeacherDetailScreen from './src/screens/AdminScreens/TeacherDetailScreen';
import StudentTranscript from './src/screens/AdminScreens/StudentTranscript';
import AddSubjectToStudentTranscript from './src/screens/AdminScreens/AddSubjectToStudentTranscript';
import TranscriptEdit from './src/screens/AdminScreens/TranscriptEdit';
import ResetPassword from './src/screens/ResetPassword';
import TranscriptView from './src/screens/StudentScreen/TranscriptView';
import TabSetting from './src/screens/tabScreens/TabSetting';
import ResetTeacherPassword from './src/screens/ResetTeacherPassword'
import ClassChat from './src/screens/ClassChat';
import TabHome from './src/screens/tabScreens/TabHome';
import DetailScreenForView from './src/screens/DetailScreenForView'
import StudentListforResult from './src/screens/TeacherScreens/StudentListforResult'
import StudentResult from './src/screens/TeacherScreens/StudentResult';
import ResultCourseList from './src/screens/StudentScreen/ResultCourseList';
import AttendenceSubjectsList from './src/screens/StudentScreen/AttendenceSubjectsList';
import Result from './src/screens/StudentScreen/Result';
import Attendence from './src/screens/StudentScreen/Attendence';
import Event from './src/screens/AdminScreens/Event';
import EventCreate from './src/screens/AdminScreens/EventCreate';
function MyStack() {
  return (
    <Stack.Navigator
    >
      {/* <Stack.Screen name="LoadingScreen" component={LoadingScreen} options={{
        title: "create class work"}} /> */}
      <Stack.Screen name="LocalStorageCheck" component={LocalStorageCheck} options={{ headerShown: false }} />
      <Stack.Screen name="TabHome" component={TabHome}
        options={({ navigation }) => ({
          title: "University Portal",
          headerRight: () => (
            <TouchableOpacity
              onPress={() => { toggleMenu() }} style={{ marginRight: 10 }}><FontAwesome name="user-circle-o"
                size={24} color="black" />
            </TouchableOpacity>
          )
        })}
      />

      <Stack.Screen name="CreateClassWork" component={CreateClassWork} options={{
        title: "create class work"
      }} />
      <Stack.Screen name="Event" component={Event} options={{
        title: "Events"
      }} />
      <Stack.Screen name="EventCreate" component={EventCreate} options={{
        title: "Event Create"
      }} />
      <Stack.Screen name="CreateClassWork2" component={CreateClassWork2} options={{
        title: "create class work"
      }} />
      <Stack.Screen name="StudentListforResult" component={StudentListforResult} options={{
        title: "create class work"
      }} />
      <Stack.Screen name="ResultCourseList" component={ResultCourseList} options={{
        title: "Result Course List"
      }} />
      <Stack.Screen name="AttendenceSubjectsList" component={AttendenceSubjectsList} options={{
        title: "Attendence Subjects List"
      }} />
      <Stack.Screen name="Result" component={Result} options={{
        title: "Result"
      }} />
      <Stack.Screen name="Attendence" component={Attendence} options={{
        title: "Attendence"
      }} />
      <Stack.Screen name="StudentResult" component={StudentResult} options={{
        title: "Students Result"
      }} />
      <Stack.Screen name="CreateClassWork1" component={CreateClassWork1} options={{
        title: "create class work"
      }} />
      <Stack.Screen name="CreateNewCourse" component={CreateNewCourse} options={{
        title: "Course Detail",
      }} />
      <Stack.Screen name="DetailScreenForClass" component={DetailScreenForClass} />
      <Stack.Screen name="DetailScreenForView" component={DetailScreenForView} options={{ title: 'Attendence List' }} />
      <Stack.Screen name="ClassChat" component={ClassChat} options={{
        title: "Class Chat"
      }} />
      <Stack.Screen name="DetailScreen" component={DetailScreen} options={{
        title: "Class Detail"
      }} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} options={{
        title: "Reset Password"
      }} />
      <Stack.Screen name="ResetTeacherPassword" component={ResetTeacherPassword} options={{
        title: "Reset Password"
      }} />
      <Stack.Screen name="EnterYourEmail" component={EnterYourEmail} options={{ headerShown: false }} />
      <Stack.Screen name="Signin" component={Signin} options={{ headerShown: false }} />
      <Stack.Screen name="Teacher_Signin" component={TeacherLogin} options={{ headerShown: false }} />
      <Stack.Screen name="Teacher_Signup" component={TeacherSignup} options={{ headerShown: false }} />
      <Stack.Screen name='Tab' component={MyTabs} options={{ headerShown: false }} />
      <Stack.Screen name='AdminSignIn' component={AdminSignIn} options={{ headerShown: false }} />
      <Stack.Screen name='AdminHome' component={AdminHome} options={{ headerLeft: () => null, title: "Admin" }} />
      <Stack.Screen name='AddStudent' component={AddStudent} options={{ title: "Add Student" }} />
      <Stack.Screen name='AddTeacher' component={AddTeacher} options={{ title: "Add Teacher" }} />
      <Stack.Screen name='TranscriptView' component={TranscriptView} options={{ title: "Transcript View" }} />
      <Stack.Screen name='TranscriptEdit' component={TranscriptEdit} options={{ title: "edit subject" }} />
      <Stack.Screen name='AddSubjectToStudentTranscript' component={AddSubjectToStudentTranscript} options={{ title: "Add Subject" }} />
      <Stack.Screen name='StudentTranscript' component={StudentTranscript} options={({ navigation, route }) => ({
        title: 'Student Transcript',
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.navigate('AddSubjectToStudentTranscript', { id: route.params.id })} style={{ marginRight: 10 }}><AntDesign name="pluscircleo" size={24} color="black" /></TouchableOpacity>
        ),
      })} />
      <Stack.Screen name='StudentDetailScreen' component={StudentDetailScreen} options={({ navigation, route }) => ({
        title: `${route.params.name}`,
      })} />
      <Stack.Screen name='TeacherDetailScreen' component={TeacherDetailScreen} options={({ navigation, route }) => ({
        title: `${route.params.name}`,
      })} />
      <Stack.Screen
        name='StudentList'
        component={StudentList}
        options={({ navigation }) => ({
          title: 'Student List',
          headerRight: () => (
            <Button
              onPress={() => navigation.navigate('AddStudent')}
              title="Add Student"
              color="gray"
            />
          ),
        })}
      />
      <Stack.Screen
        name='CourseList'
        component={CourseList}
        options={({ navigation }) => ({
          title: 'Course List',
          headerRight: () => (
            <Button
              onPress={() => navigation.navigate('CreateNewCourse')}
              title="Add Course"
              color="gray"
            />
          ),
        })}
      />
      <Stack.Screen
        name='EnrolledCoursesList'
        component={EnrolledCoursesList}
        options={({ navigation }) => ({
          title: 'Course List',

        })}
      />
      <Stack.Screen
        name='TeacherList'
        component={TeacherList}
        options={({ navigation }) => ({
          title: 'Teacher List',
          headerRight: () => (
            <Button
              onPress={() => navigation.navigate('AddTeacher')}
              title="Add Teacher"
              color="gray"
            />
          ),
        })}
      />
      <Stack.Screen name="TabSetting" component={TabSetting}
        options={({ navigation }) => ({

          title: "University Portal",
          headerRight: () => (
            <TouchableOpacity
              onPress={() => { toggleMenu() }} style={{ marginRight: 10 }}><FontAwesome name="user-circle-o"
                size={24} color="black" />
            </TouchableOpacity>
          )
        })}
      />


    </Stack.Navigator>
  );
}

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabCourses from './src/screens/tabScreens/TabCourses';
import { FontAwesome } from '@expo/vector-icons';
const Tab = createBottomTabNavigator();
function MyTabs() {
  return (
    <Tab.Navigator screenOptions={{
      tabBarItemStyle: {
        fontSize: 12,
        height: 50,
        backgroundColor: "#FAF9F6",
        borderRadius: 5,
        marginBottom: 5
      },
      tabBarInactiveTintColor: "black",
      tabBarActiveTintColor: "blue",

    }

    }>

      <Tab.Screen name="TabCourses" component={TabCourses} options={({ navigation }) => ({
        title: 'Classes',
        tabBarLabel: 'Courses',
        tabBarIcon: ({ focused }) => (
          <Feather
            name="list"
            size={24}
            color={focused ? "blue" : "black"}
          />),
        headerRight: () => (
          <TouchableOpacity onPress={() => { }} style={{ marginRight: 10 }}><FontAwesome name="user-circle-o" size={24} color="black" />
          </TouchableOpacity>
        )
      })} />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer ref={navigationRef}><MyStack></MyStack></NavigationContainer>
  );
}


import { createStackNavigator } from '@react-navigation/stack';
import { Provider as AuthProvider } from './src/context/AuthContext';
import { Provider as TrackProvider } from './src/context/TrackContext';
import { Provider as CourseProvider } from './src/context/CourseContext';
import { Provider as ClassProvider } from './src/context/ClassContext';
import { Provider as GetEnrollCoursesContext } from './src/context/GetEnrollCoursesContext';
import { Provider as StudentProvider } from './src/context/createStudentContext/StudentContext';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default () => {
  return <AuthProvider>
    <TrackProvider>
      <CourseProvider>
        <GetEnrollCoursesContext>
          <ClassProvider>
            <StudentProvider><App /></StudentProvider></ClassProvider>
        </GetEnrollCoursesContext>
      </CourseProvider>
    </TrackProvider>
  </AuthProvider>
}