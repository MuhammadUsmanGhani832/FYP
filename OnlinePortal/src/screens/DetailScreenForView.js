import React, { useContext, useState } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { Context as GetEnrollCourses } from '../context/GetEnrollCoursesContext';
import { useFocusEffect } from '@react-navigation/native';
import trackerApi from "../api/tracker";

// this screen handle student attendence
// this screen handle student attendence
const DetailScreenForView = ({ navigation, route }) => {
    const [attendance, setAttendance] = useState({});
    const { stateT, getEnrollStudent } = useContext(GetEnrollCourses);
    const id = route.params.id;
    const courseId = id;
    const email = route.params.email;
    const submitAttendance = async () => {
        try {
            const attendanceArray = Object.entries(attendance).map(([email, status]) => ({
                email: email,
                status,
            }));
            await trackerApi.post('/attendance', { attendanceArray, courseId });
            navigation.goBack();
        } catch (error) {
            console.error('Error submitting attendance:', error);
        }
    };
    React.useEffect(() => {
        const initialAttendance = {};
        stateT.get_enrolled_student.forEach((student) => {
            const email = student.email;
            initialAttendance[email] = false;
        });

        setAttendance(initialAttendance);
    }, [stateT.get_enrolled_student]);

    const renderItem = ({ item }) => {
        const toggleAttendance = () => {
            setAttendance((prevState) => ({
                ...prevState,
                [item.email]: !prevState[item.email],
            }));
        };
        return (
            <View>
                {item.email !== email ? <View style={{ display: 'flex', borderWidth: 0.5, height: 40, justifyContent: 'space-between', marginBottom: 5, marginHorizontal: 10, borderRadius: 4, flexDirection: 'row', padding: 10 }}>
                    <Text>{item.email}</Text>
                    <TouchableOpacity onPress={toggleAttendance} >
                        <Text >{attendance[item.email] ? 'Present' : 'Absent'}</Text>
                    </TouchableOpacity>
                </View> : null}
            </View>
        );
    };
    useFocusEffect(
        React.useCallback(() => {
            getEnrollStudent({ courseId });
        }, [])
    );
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