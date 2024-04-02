import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button, Text } from 'react-native-elements';

const CreateCourse = ({ onSubmit, submitButtonText, _course_name, _course_description, _instructor_name, _schedule, _location, _available_seats }) => {

  const [course_name, setCourse_name] = useState('');
  const [course_description, setCourse_description] = useState('');
  const [instructor_name, setInstructor_name] = useState('');
  const [schedule, setSchedule] = useState('');
  const [location, setLocation] = useState('');
  const [available_seats, setAvailable_seats] = useState(0);

  return (

    <ScrollView>
      <Text style={styles.text}>{_course_name}</Text>

      <Input
        title={_course_name} style={styles.textInput} onChangeText={(newtext) => setCourse_name(newtext)}
        placeholder='eg. Software engineering' autoCapitalize="words"
        autoCorrect={false}></Input>

      <Text style={styles.text}>{_course_description}</Text>
      <Input style={styles.textInput} onChangeText={(newtext) => setCourse_description(newtext)}
        placeholder='eg. BSSE-8' autocapitalize="characters" />

      <Text style={styles.text}>{_instructor_name}</Text>
      <Input style={styles.textInput} onChangeText={(newtext) => setInstructor_name(newtext)}
        placeholder='eg. sir name' autocapitalize="characters" autoCorrect={false}
      />

      <Text style={styles.text}>{_schedule}</Text>
      <Input style={styles.textInput} onChangeText={(newtext) => setSchedule(newtext)}
        placeholder='eg. Monday - Friday (2pm)' autocapitalize="characters" autoCorrect={false}
      />

      <Text style={styles.text}>{_location}</Text>
      <Input style={styles.textInput} onChangeText={(newtext) => setLocation(newtext)}
        placeholder='Online ...' autocapitalize="none" autoCorrect={false}
      />

      <Text style={styles.text}>{_available_seats}</Text>

      <Input style={styles.textInput} onChangeText={(newtext) => setAvailable_seats(newtext)}
        placeholder='eg. 60' keyboardType={'numeric'} autoCorrect={false}
      />
      <Button
        title={submitButtonText}
        onPress={() => onSubmit({ course_name, course_description, instructor_name, schedule, location, available_seats })}
      />
    </ScrollView>


  );
};

const styles = StyleSheet.create({

  text: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  inputText: {

  }

});

export default CreateCourse;
