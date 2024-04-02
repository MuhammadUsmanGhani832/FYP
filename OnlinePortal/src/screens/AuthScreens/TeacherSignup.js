import React, { useContext, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import AuthForm from '../../components/AuthForm';
import { Context as AuthContext } from '../../context/AuthContext';

const TeacherSignup = ({ navigation }) => {

  const { state, teacher_signup, clearErrorMessage, } = useContext(AuthContext);

  useEffect(() => {

    //clean up function
    return () => {
      clearErrorMessage();
    }
  }, [])
  return (
    <>
      <AuthForm
        headerText="Add new teacher"
        errorMessage={state.errorMessage}
        submitButtonText="Sign Up as teacher"
        onSubmit={teacher_signup}

      />
    </>
  )
}
const styles = StyleSheet.create({
});

export default TeacherSignup;