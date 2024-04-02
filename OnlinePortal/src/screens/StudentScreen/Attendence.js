import React, { useContext, useState } from 'react'
import { View, StyleSheet, TextInput,ActivityIndicator } from "react-native"
import { useFocusEffect } from '@react-navigation/native';
import { Context as GetEnrollCourses } from '../../context/GetEnrollCoursesContext';
import { FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Context as StudentContext } from '../../context/createStudentContext/StudentContext';
import { Input, Button, Text } from 'react-native-elements';

const Attendence = ({ navigation, route }) => {
    const { studentState, addResult, getAttendence ,clearAttend} = useContext(StudentContext);
    const email = route.params.email;
    const id = route.params.id;
    const courseId = id;


    useFocusEffect(
        React.useCallback(() => {
            getAttendence({ email, courseId })
            return () => {
                clearAttend()
            };
        }, [])
    );
console.log(studentState.attendenceList)
    function callback() {
        return navigation.goBack();
    }
    
    
    return (
        <View style={{ flex: 1 }}>
            {studentState.attendenceList.length===0?<View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <ActivityIndicator size={'large'}></ActivityIndicator>
                <Text>Loading...</Text>
            </View>:<FlatList data={studentState.attendenceList}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity style={styles.studentList} >
                    <Text>{item.email}   ({item.date} )   {item.status!=="true"?<Text>Present</Text>:<Text>Absent</Text>}</Text></TouchableOpacity>
                    )
                }}
            />}
        </View>
    )
}
const styles = StyleSheet.create({

    text: {
        fontSize: 18,
        fontWeight: 'bold'
    }, textInput: {
        backgroundColor: '#d3d3d3', paddingHorizontal: 5, height: 50, marginHorizontal: 5, borderRadius: 5
    },studentList: {
        width: "95%",
        borderWidth: 0.3, marginTop: 5,
        borderRadius: 4, padding: 10, alignSelf: 'center'
    }

});

export default Attendence;