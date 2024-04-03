import React, { useContext } from 'react'
import { View, Text } from "react-native"
import { useFocusEffect } from '@react-navigation/native';
import { Context as GetEnrollCourses } from '../../context/GetEnrollCoursesContext';
import { FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Context as StudentContext } from '../../context/createStudentContext/StudentContext';

const StudentListforResult = ({ navigation, route }) => {
    const { studentState, addResult, fetchResult, clearValue } = useContext(StudentContext);
    const { stateT, getEnrollStudent } = useContext(GetEnrollCourses);
    const id = route.params.id;
    const courseId = id;
    useFocusEffect(
        React.useCallback(() => {
            getEnrollStudent({ courseId });
        }, [])
    );
    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={stateT.get_enrolled_student}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            onPress={async () => {
                                await fetchResult({ email: item.email, courseId: id })
                                navigation.navigate("StudentResult", { id, email: item.email });

                            }}
                            style={{
                                borderWidth: 0.5,
                                height: 40,
                                justifyContent: 'center',
                                marginBottom: 5,
                                marginHorizontal: 10,
                                borderRadius: 4, padding: 5
                            }}>
                            <Text>{item.email}</Text>
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    )
}

export default StudentListforResult;