import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import {  Button, Input } from 'react-native-elements';
import Spacer from './Spacer';
import { Text } from '@rneui/themed';

const AuthForm = ({ headerText, errorMessage, onSubmit, submitButtonText }) => {
  const [email, setEmail] = useState('');
 

  return (
    <>
     
    </>
  );
};

const styles = StyleSheet.create({
  errorMessage: {
    fontSize: 16,
    color: 'red',
    marginLeft: 15,
    marginTop: 15
  }
});

export default AuthForm;
