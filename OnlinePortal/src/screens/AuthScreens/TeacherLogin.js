import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Context as AuthContext } from '../../context/AuthContext';
import { Text, Button, Input } from 'react-native-elements';
import Spacer from '../../components/Spacer';

const TeacherLogin = ({ navigation, route }) => {

  const [password, setPassword] = useState('');
  const user = route.params.user;
  const { state, teacher_signin, clearErrorMessage } = useContext(AuthContext);

  const [email, setEmail] = useState(user.email);

  useEffect(() => {

    //clean up function
    return () => {
      clearErrorMessage();
    }
  }, [])
  return (
    <View style={styles.container}>
      <Spacer>
        <Text h2 h2Style={{ textAlign: "center", marginTop: 10 }}>Enter password</Text>
      </Spacer>
      <Text style={{ marginHorizontal: 10 }}>Welcome: {user.name}</Text>

      <Spacer />
      <Input
        secureTextEntry
        label="Password"
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {state.errorMessage !== '' ? (
        <Text style={{ color: 'red', marginHorizontal: 10, fontSize: 10 }}>{state.errorMessage}</Text>
      ) : null}c
      <Spacer>
        <Button
          title={"log in"}
          onPress={() => teacher_signin({ email, password })}
        />
      </Spacer>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    padding: 10, marginTop: 50
  }
});

export default TeacherLogin;
