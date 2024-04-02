import React, { useState, useContext } from 'react';
import { View } from 'react-native';
import Spacer from '../components/Spacer';
import { Text, Button, Input } from 'react-native-elements';
import { Context as AuthContext } from '../context/AuthContext';

const ResetTeacherPassword = ({ navigation, route }) => {
  const { state, resetPasswordTeacher,clearMessage ,resetMessage} = useContext(AuthContext);
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');
  const userId = route.params.userId;
const callback=()=>{
    return (
       setTimeout(()=>{
         navigation.goBack()
         clearMessage()
       }, 3000)
    )
}
  const passwordCheck = () => {
    if (password === password2) {
      const newPassword = password;
      resetPasswordTeacher({ userId, oldPassword, newPassword,callback });
    } else {
      setError('Passwords do not match');
    }
  };

  return (
    <>
      <Spacer>
        {state.resetMessage!=='' ? <Text style={{ color: 'green', textAlign: 'center', marginTop: 10  }}>{state.resetMessage}</Text> : null}
      </Spacer>

      <Input
        secureTextEntry
        label="Old Password"
        value={oldPassword}
        onChangeText={setOldPassword}
        autoCapitalize="none"
        autoCorrect={false}
      />{state.errorMessage ? <Text style={{ color: 'red' }}>{state.errorMessage}</Text> : null}
      <Input
        secureTextEntry
        label="New Password"
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
        autoCorrect={false}
      />
      
  
      {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
      <Input
        secureTextEntry
        label="Re-enter New Password"
        value={password2}
        onChangeText={setPassword2}
        autoCapitalize="none"
        autoCorrect={false}
      />

      <Spacer>
        <Button
          title="Submit"
          onPress={passwordCheck}
        />
      </Spacer>
    </>
  );
};

export default ResetTeacherPassword;
