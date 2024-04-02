import React, { useEffect, useContext } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Platform, ActivityIndicator } from 'react-native'
import { disableBackButton, resetBackButton, enableBackButton } from '../../components/BackButtonHandler';
import { Context as CourseContext } from '../../context/CourseContext';
import { FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';



const CourseList = ({ navigation }) => {
    const { myState, createCourse, fetchCourses, enrollApi } = useContext(CourseContext);

    useFocusEffect(
        React.useCallback(() => {

            enableBackButton();
            fetchCourses();

            //clean up function
            return () => {
                disableBackButton();
            };
        }, [])
    );
    console.log(myState.fetch_courses)
    return (
        <View style={styles.container}>
            {myState.fetch_courses.length === 0 ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={"large"}></ActivityIndicator>
                <Text>Loading</Text>
            </View> : <FlatList data={myState.fetch_courses}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity style={styles.studentList} onPress={() => { navigation.navigate('DetailScreen', { id: item._id }) }}><Text>{item.course_name} - {item.instructor_name} </Text></TouchableOpacity>
                    )
                }}
            />}
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    }, studentList: {
        width: "95%",
        borderWidth: 0.3, marginTop: 5,
        borderRadius: 4, padding: 10, alignSelf: 'center',
        backgroundColor: '#ADD8E6'
    }

})
export default CourseList;