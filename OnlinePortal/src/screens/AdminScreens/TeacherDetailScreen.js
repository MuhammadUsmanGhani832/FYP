import { Button } from '@rneui/base';
import React, { useContext } from 'react';
import { Entypo } from '@expo/vector-icons';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Context as AuthContext } from '../../context/AuthContext';
import { disableBackButton, enableBackButton } from '../../components/BackButtonHandler'
import { useFocusEffect } from '@react-navigation/native';
const TeacherDetailScreen = ({ navigation, route }) => {
    const { state, signout, oneStudentById, removeTeacher } = useContext(AuthContext);
    const stName = route.params.name;
    const stEmail = route.params.email;
    const id = route.params.id;
    useFocusEffect(
        React.useCallback(() => {

            enableBackButton();
            return () => {

            };
        }, [])
    );
    function callback() {
        navigation.goBack();
    }
    return (
        <View style={{ flex: 1 }}>
            <TouchableOpacity style={{ width: 150, height: 150, marginBottom: 15, borderRadius: 5, borderWidth: 0.5, shadowColor: 'green', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', position: 'relative', bottom: -20 }}
                onPress={() => { removeTeacher({ id, callback }) }}

            >
                <Entypo name="remove-user" size={40} color="black" />
                <Text>Remove Teacher</Text>
            </TouchableOpacity>
            <View style={styles.detailContainer}>
                <Text style={styles.header}>Detail</Text>
                <Text style={styles.title}>Name:</Text>
                <Text style={styles.text}>{stName}</Text>
                <Text style={styles.title}>Email:</Text>
                <Text style={styles.text}>{stEmail}</Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({

    detailContainer: {
        margin: 15,
        padding: 5,
        borderWidth: .5,
        borderRadius: 5,
        backgroundColor: '#ADD8E6'
    },
    header: {
        fontSize: 24,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    text: {
        fontSize: 14,
        marginBottom: 10

    },
});

export default TeacherDetailScreen;