import React, { useEffect, useContext } from 'react';
import { ActivityIndicator, View, Text, StyleSheet, Platform, StatusBar, SafeAreaView } from 'react-native'
import { Context as AuthContext } from '../../context/AuthContext';
import { useFocusEffect } from '@react-navigation/native';

const ResolveAuthScreen = () => {
  const { tryLocalSignin } = useContext(AuthContext);
  useFocusEffect(
    React.useCallback(() => {
      setTimeout(() => {
        tryLocalSignin();
      }, 2000);
      return () => {
      };
    }, [])
  );

  return (
    <>
      <SafeAreaView style={styles.screenPadding}>
        <View style={styles.firstView}>
          <Text>welcome to </Text>
          <Text style={styles.firstText}>Online portal</Text>
          <Text>for University Students</Text>
        </View>
        <View style={styles.secondView}>
          <ActivityIndicator size="large" color="#ADD8E6" />
          <Text>loading...</Text>
        </View>
      </SafeAreaView>
    </>
  );
};


const styles = new StyleSheet.create({
  screenPadding: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  firstView: {
    flex: 2, justifyContent: 'center',
    alignItems: 'center', backgroundColor: '#ADD8E6', width: '90%', borderRadius: 5, marginTop: 5
  },
  firstText: {
    fontSize: 32
  },
  secondView: {
    flex: 1, justifyContent: 'center',
  },
})
export default ResolveAuthScreen;
