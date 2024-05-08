import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import AuthForm from '../../components/AuthForm';
import { Context as AuthContext } from '../../context/AuthContext';
import { disableBackButton, enableBackButton } from '../../components/BackButtonHandler';
import { useFocusEffect } from '@react-navigation/native';

const AdminSignIn = () => {
  const { state, admin_signin, clearErrorMessage, } = useContext(AuthContext);
  useFocusEffect(
    React.useCallback(() => {
      enableBackButton();
      return () => {
        clearErrorMessage();
        disableBackButton();
      };
    }, [])
  );

  return (
    <View style={{
      marginTop: 50,
      padding: 10,
      display: 'flex',
      flexDirection: "column"
    }}>
      <AuthForm
        headerText="Admin"
        errorMessage={state.errorMessage}
        submitButtonText="Sign In"
        onSubmit={admin_signin}
      />
    </View>
  )
}
const styles = StyleSheet.create({
});

export default AdminSignIn;