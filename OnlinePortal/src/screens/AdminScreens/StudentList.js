import React, { useEffect, useContext } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Platform, ActivityIndicator } from 'react-native'
import { disableBackButton, enableBackButton } from '../../components/BackButtonHandler';
import { Context as AuthContext } from '../../context/AuthContext';
import { FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const StudentList = ({ navigation }) => {
    const { state, fetchStudentList } = useContext(AuthContext);
    useFocusEffect(
        React.useCallback(() => {

            enableBackButton();
            fetchStudentList();

            return () => {
                disableBackButton();
                // Useful for cleanup functions

            };
        }, [])
    );




    return (
        <View style={styles.container}>
            {state.students.length === 0
                ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size={'large'}></ActivityIndicator>
                    <Text>Loading...</Text>
                </View>
                : <FlatList data={state.students}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity style={styles.studentList} onPress={() => { navigation.navigate("StudentDetailScreen", { email: item.email, name: item.name, rollNum: item.rollNum, id: item._id }) }}><Text>{item.name} - {item.rollNum} </Text></TouchableOpacity>
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
        borderRadius: 4, padding: 10, alignSelf: 'center', backgroundColor: '#ADD8E6'
    }

})
export default StudentList;