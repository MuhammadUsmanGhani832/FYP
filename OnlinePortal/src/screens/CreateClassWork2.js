import React, { useContext, useState } from 'react';
import { StyleSheet, View, Image, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import { Context as CourseContext } from '../context/CourseContext'
import { Alert } from 'react-native';
import { Context as AuthContext } from '../context/AuthContext';
import { Context as ClassContext } from '../context/ClassContext'

const CreateClassWork2 = ({ navigation, route }) => {
    const { createClassWork3 } = useContext(ClassContext);
    const { myState, enrollApi } = useContext(CourseContext);
    const { state, signup, clearErrorMessage, } = useContext(AuthContext);
    const id = route.params.id;
    const course_are = myState.fetch_courses.find((t) => t._id === id);
    const courseId = id;

    //    console.log(course_id);
    //    console.log(user_id);
    const callback = () => {
        return navigation.goBack();
    }

    const title="Lecture";
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    return (
        <>
            <View style={{ flex: 1, marginTop: 15 }}>
                <Text style={styles.text}>Description:</Text>
                <TextInput
                    onChangeText={(newtext) => setDescription(newtext)}
                    placeholder='Lecture link....'
                    style={{  height: "40%", borderColor: 'gray', borderWidth: 1 ,marginHorizontal:10,borderRadius:4,padding:5}}
                    multiline={true}
                    numberOfLines={12}
                />
                <Text style={styles.text}>Due Date:</Text>
                <Input onChangeText={(newtext) => setDueDate(newtext)}
                    placeholder='4-may'
                />

                <View style={{ alignSelf: 'center' }}>
                <Button
                    title="Done"
                    loading={false}
                    loadingProps={{ size: 'small', color: 'white' }}
                    buttonStyle={{
                        backgroundColor: '#14BDAD',
                        borderRadius: 5,
                    }}
                    titleStyle={{ fontWeight: 'bold', fontSize: 23 }}
                    containerStyle={{

                        height: 50,
                        width: 300,
                        marginVertical: 10,

                    }}
                    onPress={() => { createClassWork3({ courseId, title, description, dueDate, callback }) }}
                /></View>
            </View>
        </>
    )
}
const styles = StyleSheet.create({

    text: {
        fontWeight: 'bold', marginHorizontal: 10
    }
});

export default CreateClassWork2;