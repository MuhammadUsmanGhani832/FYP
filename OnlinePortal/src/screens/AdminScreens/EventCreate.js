import React, { useContext, useState } from 'react';
import { StyleSheet, View, Image, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import { Alert } from 'react-native';
import { Context as AuthContext } from '../../context/AuthContext'
const EventCreate = ({ navigation, route }) => {
    const { state, createEvent, fetchEvent } = useContext(AuthContext)


    //    console.log(course_id);
    //    console.log(user_id);
    const title = "admin";

    const [description, setDescription] = useState('');
    const [createDate, setDueDate] = useState('');



    const callfunc = async () => {
        (new Date().getHours() + ":" + new Date().getMinutes() + " (" + new Date().getUTCDate() + "/" + new Date().getMonth() + "/" + new Date().getFullYear() + ")");

        createEvent({ title, description, createDate, callback })
    };
    function callback() {
        navigation.goBack();
    };
    return (
        <>
            <View style={{ flex: 1, marginTop: 15 }}>
                <Text style={styles.text}>Events Detail:</Text>
                <Input
                    onChangeText={(newtext) => setDescription(newtext)}
                    placeholder='Events....'


                />
                <Text style={styles.text}>Date of Event</Text>
                <Input onChangeText={(newtext) => setDueDate(newtext)}
                    placeholder='10 may'
                />

                <View style={{ alignSelf: 'center' }}>
                    <Button
                        title="Send"
                        buttonStyle={{
                            borderRadius: 5,
                        }}
                        titleStyle={{ fontWeight: 'bold' }}
                        containerStyle={{
                            height: 50,
                            width: 300,
                            marginVertical: 10,
                        }}
                        onPress={async () => {
                            callfunc();

                        }}
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

export default EventCreate;