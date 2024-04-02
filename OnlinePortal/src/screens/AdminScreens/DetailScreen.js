import React, { useContext, useState } from 'react';
import { StyleSheet, View, Image, FlatList, TouchableOpacity } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import { Context as CourseContext } from '../../context/CourseContext'
import { Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { disableBackButton, enableBackButton } from '../../components/BackButtonHandler'
import { Context as AuthContext } from '../../context/AuthContext';


const DetailScreen = ({ navigation, route }) => {
    const { myState, enrollApi } = useContext(CourseContext);
    const { state, signup, clearErrorMessage, deleteCourse } = useContext(AuthContext);
    const id = route.params.id;
    const course_are = myState.fetch_courses.find((t) => t._id === id);
    const course_id = id;
    const user_id = state.user_id;
    const [email, setEmail] = useState('');

    React.useEffect(() => {

        navigation.setOptions({
            title: 'Course Detail',
            headerRight: () => (
                <TouchableOpacity
                    onPress={() => {
                        Alert.alert(
                            'Delete',
                            'you want to delete this course?',
                            [
                                { text: 'Cancel', onPress: () => console.log('Cancel Pressed!') },
                                { text: 'OK', onPress: () => { deleteCourse({ id, callback }) } },
                            ],
                            { cancelable: false }
                        )
                    }} style={{ marginRight: 10 }}>
                    <FontAwesome name="trash-o" size={24} color="black" />
                </TouchableOpacity>
            ), headerLeft: false
        });
        const unsubscribe = navigation.addListener('focus', async () => {
            enableBackButton();
        });

        return unsubscribe;
    }, [navigation]);

    function callback() {
        return navigation.goBack();
    }
    return (
        <>
            <View style={{ borderBottomWidth: 0.5 }}>
                <Text style={{ textAlign: 'center', fontSize: 30, fontWeight: 'bold', padding: 20 }}>{course_are.course_name}</Text>
                <Text style={{ fontSize: 18, paddingHorizontal: 10, paddingBottom: 10 }}>Class: {course_are.course_description}</Text>

                <Text style={{ fontSize: 18, paddingHorizontal: 10, paddingBottom: 10 }}>Instructor Name: {course_are.instructor_name}</Text>
                <Text style={{ fontSize: 18, paddingHorizontal: 10, paddingBottom: 10 }}>Status: {course_are.location}</Text>
                <Text style={{ fontSize: 18, paddingHorizontal: 10, paddingBottom: 10 }}>Schedule: {course_are.schedule}</Text>
                <Text style={{ fontSize: 18, paddingHorizontal: 10, paddingBottom: 10 }}>Available Seats: {course_are.available_seats}</Text>
            </View>
            <View style={{ padding: 10 }}>
                <Text style={{ textAlign: 'center', color: 'red' }}>For enroll any Student or Teacher in this class enter there University Email</Text>
                <Input
                    label="Email"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <Button
                    onPress={() => enrollApi({ email, course_id, callback })}
                    title="Enrol in this class"
                />
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

export default DetailScreen;