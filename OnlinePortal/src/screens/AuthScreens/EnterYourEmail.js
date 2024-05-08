import React, { useContext, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Platform, StatusBar } from 'react-native';
import { Context as AuthContext } from '../../context/AuthContext'
import { Button, Input } from 'react-native-elements';
import Spacer from '../../components/Spacer';
import { Text } from '@rneui/themed';
import { useFocusEffect } from '@react-navigation/native';
const EnterYourEmail = ({ navigation }) => {
    const { check_email, state, clearErrorMessage } = useContext(AuthContext);
    const [email, setEmail] = useState('');

    useFocusEffect(
        React.useCallback(() => {
            return () => {
                clearErrorMessage();
            };
        }, [])
    );
    return (
        <View style={styles.container}>
            <Image source={require("../../images/no-profile-pic-icon-12.jpg")} style={{ width: 200, height: 200, alignSelf: 'center', marginTop: 20 }} />
            <Spacer>
                <Text h2 h2Style={{ textAlign: 'center' }}>Portal Login</Text>
                <Text style={{ textAlign: 'center' }}>Enter Email For Login</Text>
            </Spacer>
            <Input
                label="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                autoCorrect={false}
            />
            {state.errorMessage ? (
                <Text style={{ color: 'red', marginVertical: 10, marginTop: -20 }}>{state.errorMessage}</Text>
            ) : null}
            <Button
                title={"Login"}
                onPress={() => check_email({ email })}
            />

            <Text style={{ marginLeft: 15, position: 'absolute', top: 40, right: 20 }}><TouchableOpacity onPress
                ={() => navigation.navigate("AdminSignIn")}><Text>Admin</Text></TouchableOpacity>
            </Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 30,
        flex: 1,
        paddingHorizontal: 10
    }
});

export default EnterYourEmail;