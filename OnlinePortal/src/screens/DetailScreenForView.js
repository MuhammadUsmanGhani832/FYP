import React, { useContext, useState } from 'react';
import { StyleSheet, View, Image, FlatList, TouchableOpacity } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import { Context as CourseContext } from '../context/CourseContext'
import { Alert } from 'react-native';
import { Context as AuthContext } from '../context/AuthContext';
import { Context as GetEnrollCourses } from '../context/GetEnrollCoursesContext';
import { useFocusEffect } from '@react-navigation/native';
import trackerApi from "../api/tracker";

// this screen handle student attendence
const DetailScreenForView = ({ navigation, route }) => {
    const [attendance, setAttendance] = useState({});
    const { myState, enrollApi } = useContext(CourseContext);
    const { stateT, getEnrollStudent } = useContext(GetEnrollCourses);
    const { state, signup, clearErrorMessage, } = useContext(AuthContext);

    const id = route.params.id;
    const courseId = id;
    //    console.log(course_id);
    //    console.log(user_id);
    const submitAttendance = async () => {
        try {
          // Convert attendance object to an array of email and attendance status
          const attendanceArray = Object.entries(attendance).map(([email, status]) => ({
            email,
            status,
          }));
      
          // Send the attendance data to the server
          const response = await trackerApi.post('/attendance',{attendanceArray,courseId});
        navigation.goBack();
          // Handle the server response
        
        } catch (error) {
          console.error('Error submitting attendance:', error);
          // Handle the error or display a message to the user
        }
      };
    React.useEffect(() => {
        const initialAttendance = {};
        stateT.get_enrolled_student.forEach((email) => {
            initialAttendance[email] = false; // Assume everyone is absent initially
        });
        setAttendance(initialAttendance);
    }, []);
    const renderItem = ({ item }) => {
        const toggleAttendance = () => {
            setAttendance((prevState) => ({
                ...prevState,
                [item.email]: !prevState[item.email], // Toggle the attendance status
            }));
        }; return (
            <View style={{ borderWidth: 0.5, height: 40, justifyContent: 'center', marginBottom: 5, marginHorizontal: 10, borderRadius: 4 }}>
                <Text>{item.email}</Text>
                <TouchableOpacity onPress={toggleAttendance} >
                    <Text >{attendance[item.email] ? 'Present' : 'Absent'}</Text>
                </TouchableOpacity>
            </View>
        );
    };

    useFocusEffect(
        React.useCallback(() => {



            getEnrollStudent({ courseId });

            return () => {


                // Useful for cleanup functions

            };
        }, [])
    );
    console.log(stateT.get_enrolled_student)
    return (
        <>
            <View style={{ flex: 1, paddingTop: 5 }}>

                
                <FlatList
                    data={stateT.get_enrolled_student}
                    renderItem={renderItem}
                    keyExtractor={(item) => item._id}
                />
                 <Button title="Submit Attendance" onPress={submitAttendance} />
            </View>
        </>
    )
}
const styles = StyleSheet.create({

    list: {
        backgroundColor: 'white',
        marginVertical: 5,
        marginHorizontal: 10,
        height: 50,
        borderRadius: 5
    }
});

export default DetailScreenForView;