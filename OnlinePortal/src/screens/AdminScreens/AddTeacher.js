import React, { useState, useContext } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, } from 'react-native'
import { disableBackButton, enableBackButton } from '../../components/BackButtonHandler';
import { Context as AuthContext } from '../../context/AuthContext';
import { useFocusEffect } from '@react-navigation/native';
import { Button, Input } from 'react-native-elements';

const AddTeacher = ({ navigation }) => {
    const { state, fetchTeacherList, clearErrorMessage, teacher_signup } = useContext(AuthContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useFocusEffect(
        React.useCallback(() => {

            enableBackButton();

            return () => {
                fetchTeacherList();
                clearErrorMessage();
                disableBackButton();
            };
        }, [])
    );

    return (
        <View style={styles.container}>
            <Text style={styles.headText}>New Teacher </Text>
            <Input
                label="Teacher Name"
                value={name}
                onChangeText={setName}
                autoCapitalize="characters"
                autoCorrect={false}
            />
            <Input
                label="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                autoCorrect={false}
            />
            {state.errorMessage ? <Text style={{ color: 'red', marginBottom: 10, marginTop: -15, marginLeft: 10, fontSize: 10 }}>{state.errorMessage}</Text> : null}
            <Input
                label="Password"
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry
            />
            <Button
                title={"Save"}
                onPress={() => { return teacher_signup({ name, email, password }) }}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    headText: {
        fontSize: 30,
        fontWeight: 'bold',
        alignSelf: 'center'
    }, textInput: {
        borderWidth: 0.5,
        width: '95%',
        borderRadius: 6, height: 50, alignSelf: 'center'
    }
})
export default AddTeacher;