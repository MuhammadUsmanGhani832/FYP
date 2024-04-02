import react, { useContext, useEffect,useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Context as CourseContext } from '../../context/CourseContext';
import { FlatList } from 'react-native';
import { Input,Button } from 'react-native-elements';

const TranscriptEdit = ({ navigation, route }) => {
    const { myState, fetchSubjects,single_fetch ,update_subjects,remove_subject} = useContext(CourseContext);
    const subjectId = route.params.id;
    const studentId = route.params.stId;
    const st1 = route.params.courseID;
    const st2 = route.params.CourseTitle;
    const st3 = route.params.CR_HRS;
    const st4 = route.params.GRADE;

    useEffect( () => {
      

        return () => {
            

        };
    }, []);

  const [courseID, setCourseID] = useState(st1); 
  const [CourseTitle, setCourseTitle] = useState(st2); 
  const [CR_HRS, setCR_HRS] = useState(st3); 
  const [GRADE, setGRADE] = useState(st4); 
  function callback(){
    return navigation.goBack();
  }
    return (
        <View style={{ flex: 1 }}>
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
      
       <View style={{marginHorizontal:10}}>
       <Button
          title={"Update Subject"}
          onPress={() => update_subjects({ studentId,subjectId,courseID, CourseTitle, CR_HRS, GRADE,callback})}
        />
       </View>
       <View style={{marginHorizontal:10,marginTop:10}}>
       <Button
          title={"Remove Subject"}
          onPress={() => remove_subject({ studentId,subjectId,callback})}
        />
       </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: 10
    }, header: {

    }
});

export default TranscriptEdit;