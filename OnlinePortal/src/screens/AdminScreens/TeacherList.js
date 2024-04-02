import React, { useEffect, useContext } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import { disableBackButton, resetBackButton, enableBackButton } from '../../components/BackButtonHandler';
import { Context as AuthContext } from '../../context/AuthContext';
import { FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';



const TeacherList = ({ navigation }) => {
    const { state, fetchTeacherList } = useContext(AuthContext);

    useFocusEffect(
        React.useCallback(() => {

            enableBackButton();
            fetchTeacherList();

            return () => {
            };
        }, [])
    );




    return (
        <View style={styles.container}>
            {state.teachers.length === 0 ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={'large'}></ActivityIndicator>
                <Text>Loading...</Text>
            </View> : <FlatList data={state.teachers}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity style={styles.studentList} onPress={() => { navigation.navigate("TeacherDetailScreen", { email: item.email, name: item.name, rollNum: item.rollNum, id: item._id }) }}><Text>{item.name} - {item.email} </Text></TouchableOpacity>
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
export default TeacherList;