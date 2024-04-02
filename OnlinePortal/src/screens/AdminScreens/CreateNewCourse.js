import React, { useContext } from "react";
import { StyleSheet, Text, FlatList, TouchableOpacity, View, SafeAreaView, StatusBar, Platform } from "react-native";

import CreateCourse from "../../components/CreateCourse";
import { Context as CourseContext } from '../../context/CourseContext';
import { disableBackButton, enableBackButton } from '../../components/BackButtonHandler'
const TabHome = ({ navigation }) => {
  const { myState, createCourse } = useContext(CourseContext);


  React.useEffect(() => {
    enableBackButton()
    const unsubscribe = navigation.addListener('focus', async () => {

      enableBackButton()
      // getEnrollCourses({ studentId });
    });

    return unsubscribe;
  }, [navigation]);
  return (

    <SafeAreaView style={styles.screenPadding}>

      <CreateCourse
        onSubmit={createCourse}
        _course_name={"Course Name:"}
        _course_description={"Course Class Name:"}
        _instructor_name={"Professor Name:"}
        _schedule={"Schedule:"}
        _location={"Status"}
        _available_seats={"available_seats:"}
        submitButtonText={"Create New Course"}
      />
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  screenPadding: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    marginHorizontal: 2, padding: 10
  },
});

export default TabHome;
