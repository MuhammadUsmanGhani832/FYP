import React, { useContext, useState  } from 'react'
import { View, StyleSheet, TextInput ,ScrollView} from "react-native"
import { useFocusEffect } from '@react-navigation/native';
import { Context as GetEnrollCourses } from '../../context/GetEnrollCoursesContext';
import { FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Context as StudentContext } from '../../context/createStudentContext/StudentContext';
import { Input, Button, Text } from 'react-native-elements';

const StudentResult = ({ navigation, route }) => {
    const { studentState, addResult ,fetchResult,clearValue} = useContext(StudentContext);
    const email = route.params.email;
    const id = route.params.id;
    const courseId = id; 
    useFocusEffect(
        React.useCallback(() => {
            fetchResult({ email, courseId });
           
            return () => {
                clearValue()
            };
        }, [])
    );

    const [final, setCourse_name] = useState(studentState.studentList.final);
    const [mid, setCourse_description] = useState(studentState.studentList.mid);
    const [quiz, setInstructor_name] = useState(studentState.studentList.quiz);
    const [assignment, setSchedule] = useState(studentState.studentList.assignment);
    const [presentation, setLocation] = useState(studentState.studentList.presentation);
    const [other, setAvailable_seats] = useState(studentState.studentList.other);
    const total = 100;
   

    function callback() {
        return navigation.goBack();
    }
    
   
        
    return (
        <ScrollView  keyboardShouldPersistTaps='handled'>
            <Text style={styles.text}>Final</Text>

            <TextInput
           
                defaultValue={`${final}`}
                style={styles.textInput}
                onChangeText={(newtext) => setCourse_name(newtext)}
               
                keyboardType='numeric'
            ></TextInput>

            <Text style={styles.text}>Mid</Text>
            <TextInput style={styles.textInput} onChangeText={(newtext) => setCourse_description(newtext)}
               keyboardType='numeric'
                defaultValue={`${mid}`}
                />

            <Text style={styles.text}>Quiz</Text>
            <TextInput style={styles.textInput} onChangeText={(newtext) => setInstructor_name(newtext)}
                keyboardType='numeric'
                defaultValue={`${quiz}`}
            />

            <Text style={styles.text}>Assignment</Text>
            <TextInput style={styles.textInput} onChangeText={(newtext) => setSchedule(newtext)}
                keyboardType='numeric'
                defaultValue={`${assignment}`}
            />

            <Text style={styles.text}>Presentation</Text>
            <TextInput style={styles.textInput} onChangeText={(newtext) => setLocation(newtext)}
                keyboardType='numeric'
                defaultValue={`${presentation}`}
            />

            <Text style={styles.text}>Other</Text>

            <TextInput style={styles.textInput} onChangeText={(newtext) => setAvailable_seats(newtext)}
             keyboardType='numeric'
                defaultValue={`${other}`}
            />



            <Button onPress={() => addResult({ final, mid, quiz, assignment, presentation, other, total, email, courseId, callback })}
                title={`ADD`}
                buttonStyle={{
                    backgroundColor: '#1ABC9C',
                    borderRadius: 3,
                }}
                containerStyle={{
                    width: 200,
                    marginHorizontal: 50,
                    marginVertical: 10,
                }}
            />
        </ScrollView>
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

export default StudentResult;