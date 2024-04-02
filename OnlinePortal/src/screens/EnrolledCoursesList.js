import React, { useEffect, useContext } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import { disableBackButton, resetBackButton, enableBackButton } from '../components/BackButtonHandler';
import { Context as CourseContext } from '../context/CourseContext';
import { FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Context as GetEnrollCoursesContext } from '../context/GetEnrollCoursesContext';
import ListForm from '../components/ListForm'
import { ActivityIndicator } from 'react-native';


const EnrolledCoursesList = ({navigation,route}) => {
    const { myState, createCourse,fetchCourses ,enrollApi } = useContext(CourseContext);
    const { stateT, getEnrollCourses } = useContext(GetEnrollCoursesContext);
  const email=route.params.id;
 useFocusEffect(
        React.useCallback(() => {
    
            enableBackButton();
            fetchCourses();
            getEnrollCourses({email});
    
          return () => {
    
            disableBackButton();
            // Useful for cleanup functions
    
          };
        }, [])
      );
      console.log(stateT.get_courses)
    return (
        <View style={styles.container}>
            {stateT.get_courses.length===0?<View style={{flex:1,justifyContent:'center'}}><ActivityIndicator></ActivityIndicator></View>:<FlatList data={stateT.get_courses}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity style={styles.studentList} onPress={() => {  navigation.navigate('DetailScreenForClass', { id: item.courseId,email })  }}>
                        <ListForm id={`${item.courseId}`}></ListForm>
                        </TouchableOpacity>
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
        borderRadius: 4, padding: 5, alignSelf: 'center'
    }

})
export default EnrolledCoursesList;