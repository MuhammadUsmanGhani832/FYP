import { useContext, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Context as CourseContext } from '../../context/CourseContext';
import { Input, Button } from 'react-native-elements';

const AddSubjectToStudentTranscript = ({ navigation, route }) => {
  const { fetchSubjects, addSubjectToStudentTranscript } = useContext(CourseContext);
  const [courseID, setCourseID] = useState('');
  const [CourseTitle, setCourseTitle] = useState('');
  const [CR_HRS, setCR_HRS] = useState('');
  const [GRADE, setGRADE] = useState('');
  const id = route.params.id;
  useEffect(() => {

    return () => {
      fetchSubjects({ id });
    };
  }, []);

  function callback() {
    return navigation.goBack();
  }
  return (<View style={{ flex: 1, padding: 10 }}>
    <Input
      label="Course ID"
      value={courseID}
      onChangeText={setCourseID}
      autoCorrect={false}
      autoCapitalize="characters"
    />
    <Input
      label="Course Title"
      value={CourseTitle}
      onChangeText={setCourseTitle}
      autoCapitalize="none"
      autoCorrect={false}
    />
    <Input
      label="CR_HRS"
      value={CR_HRS}
      onChangeText={setCR_HRS}
      autoCapitalize="none"
      autoCorrect={false}
      keyboardType={'numeric'}
    />
    <Input
      label="GRADE"
      value={GRADE}
      onChangeText={setGRADE}
      autoCapitalize="none"
      autoCorrect={false}
    />
    <Button
      title={"Add Subject"}
      onPress={() => addSubjectToStudentTranscript({ courseID, CourseTitle, CR_HRS, GRADE, id, callback })}
    />
  </View>)
}
const styles = StyleSheet.create({

});

export default AddSubjectToStudentTranscript;