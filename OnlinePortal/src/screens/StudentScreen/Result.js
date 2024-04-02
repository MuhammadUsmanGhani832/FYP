import React, { useContext, useState } from 'react'
import { View, StyleSheet, TextInput } from "react-native"
import { useFocusEffect } from '@react-navigation/native';
import { Context as GetEnrollCourses } from '../../context/GetEnrollCoursesContext';
import { FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Context as StudentContext } from '../../context/createStudentContext/StudentContext';
import { Input, Button, Text } from 'react-native-elements';
import {disableBackButton, enableBackButton } from '../../components/BackButtonHandler'
const Result = ({ navigation, route }) => {
    const { studentState, addResult, fetchResult ,clearValue} = useContext(StudentContext);
    const email = route.params.email;
    const id = route.params.id;
    const courseId = id;


    useFocusEffect(
        React.useCallback(() => {
            fetchResult({ email, courseId });
            enableBackButton();
            return () => {
                clearValue()
            };
        }, [])
    );

    function callback() {
        return navigation.goBack();
    }
    const no=studentState.studentList.final+studentState.studentList.mid+studentState.studentList.quiz+studentState.studentList.assignment+studentState.studentList.presentation+studentState.studentList.other
    
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', borderBottomWidth: 0.5, alignItems: 'center', marginHorizontal: 5, marginBottom: 5, backgroundColor: "lightyellow" }}>
                <Text style={{ width: '14%', borderLeftWidth: 0.5, textAlign: 'center' }}>Final</Text>
                <Text style={{ width: '14%', borderLeftWidth: 0.5, textAlign: 'center' }}>Mid</Text>
                <Text style={{ width: '14%', borderLeftWidth: 0.5, textAlign: 'center' }}>Quiz</Text>
                <Text style={{ width: '14%', borderLeftWidth: 0.5, textAlign: 'center' }}>Assignment</Text>
                <Text style={{ width: '14%', borderLeftWidth: 0.5, textAlign: 'center' }}>Presentation</Text>
                <Text style={{ width: '14%', borderLeftWidth: 0.5, textAlign: 'center' }}>other</Text>
                <Text style={{ width: '16%', borderLeftWidth: 0.5, textAlign: 'center' }}>Total</Text>
            </View>


            <View style={{ flexDirection: 'row', justifyContent: 'space-around', borderBottomWidth: 0.5, alignItems: 'center', marginHorizontal: 5, }}>
                <Text style={{ width: '14%', borderLeftWidth: 0.5, textAlign: 'center' }}>{studentState.studentList.final}</Text>
                <Text style={{ width: '14%', borderLeftWidth: 0.5, textAlign: 'center' }}>{studentState.studentList.mid}</Text>
                <Text style={{ width: '14%', borderLeftWidth: 0.5, textAlign: 'center' }}>{studentState.studentList.quiz}</Text>
                <Text style={{ width: '14%', borderLeftWidth: 0.5, textAlign: 'center' }}>{studentState.studentList.assignment}</Text>
                <Text style={{ width: '14%', borderLeftWidth: 0.5, textAlign: 'center' }}>{studentState.studentList.presentation}</Text>
                <Text style={{ width: '14%', borderLeftWidth: 0.5, textAlign: 'center' }}>{studentState.studentList.other}</Text>
                <Text style={{ width: '16%', borderLeftWidth: 0.5, textAlign: 'center' }}>{no}/{studentState.studentList.total}</Text>
            </View>


        </View>
    )
}
const styles = StyleSheet.create({

    text: {
        fontSize: 18,
        fontWeight: 'bold'
    }, textInput: {
        backgroundColor: '#d3d3d3', paddingHorizontal: 5, height: 50, marginHorizontal: 5, borderRadius: 5
    }

});

export default Result;