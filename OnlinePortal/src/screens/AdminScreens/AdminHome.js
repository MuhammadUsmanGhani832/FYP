import React, { useEffect, useContext, useDebugValue } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import { disableBackButton, enableBackButton } from '../../components/BackButtonHandler';
import { Context as AuthContext } from '../../context/AuthContext';
import { useFocusEffect } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
const AdminHome = ({ navigation }) => {
  const { signout } = useContext(AuthContext);

  useFocusEffect(
    React.useCallback(() => {
      disableBackButton();
      return () => {
        enableBackButton();
      };
    }, [])
  );

  return (
    <View style={{ flex: 1, marginBottom: 60, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', paddingTop: 15 }}>
      <TouchableOpacity style={{ width: 150, height: 150, marginBottom: 15, borderRadius: 5, borderWidth: 0.5, shadowColor: 'green', justifyContent: 'center', alignItems: 'center' }}
        onPress={() => { navigation.navigate('StudentList') }}
      >
        <Entypo name="user" size={40} color="black" />
        <Text>Student List</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ width: 150, height: 150, marginBottom: 15, borderRadius: 5, borderWidth: 0.5, shadowColor: 'green', justifyContent: 'center', alignItems: 'center' }}
        onPress={() => { navigation.navigate('TeacherList') }}

      >
        <FontAwesome5 name="chalkboard-teacher" size={40} color="black" />
        <Text>Teacher List</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ width: 150, height: 150, marginBottom: 15, borderRadius: 5, borderWidth: 0.5, shadowColor: 'green', justifyContent: 'center', alignItems: 'center' }}
        onPress={() => { navigation.navigate('CourseList') }}

      ><MaterialCommunityIcons name="google-classroom" size={40} color="black" />
        <Text>Courses List</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ width: 150, height: 150, marginBottom: 15, borderRadius: 5, borderWidth: 0.5, shadowColor: 'green', justifyContent: 'center', alignItems: 'center' }}
        onPress={() => navigation.navigate("Event")}

      ><MaterialIcons name="event" size={40} color="black" />
        <Text>Events</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ width: 150, height: 150, marginBottom: 15, borderRadius: 5, borderWidth: 0.5, shadowColor: 'green', justifyContent: 'center', alignItems: 'center' }}
        onPress={signout}

      ><Entypo name="log-out" size={40} color="black" />
        <Text>Logout</Text>
      </TouchableOpacity>




    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1, alignItems: 'center'
  },
  view: {
    backgroundColor: 'white',
    marginVertical: 10,
    height: 50,
    width: '80%', borderRadius: 6, borderWidth: 0.5,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  }
})
export default AdminHome;