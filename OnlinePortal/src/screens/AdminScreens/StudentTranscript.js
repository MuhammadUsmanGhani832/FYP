import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Context as CourseContext } from '../../context/CourseContext';
import { FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const StudentTranscript = ({ navigation, route }) => {
    const { myState, fetchSubjects, clearSubjects } = useContext(CourseContext);
    const stName = route.params.name;
    const stEmail = route.params.email;
    const stRollNum = route.params.rollNum;
    const id = route.params.id;
    useFocusEffect(
        React.useCallback(() => {
            fetchSubjects({ id })

            return () => {
                clearSubjects();
            };
        }, [])
    );

    return (<View style={{ flex: 1 }}>
        <Text style={{ textAlign: 'center', borderBottomWidth: 0.5 }}>{stName} - {stEmail} - ({stRollNum})</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', borderBottomWidth: 0.5, alignItems: 'center', marginHorizontal: 5, marginBottom: 5, backgroundColor: "gray" }}>
            <Text style={{ width: "20%" }}>Course ID</Text>
            <Text style={{ width: "60%" }}>Course Title</Text>
            <Text style={{ width: "9%" }}>CR. HRS.</Text>
            <Text style={{ width: "11%" }}>GRADE</Text>
        </View>
        <FlatList data={myState.fetch_subjects}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => {
                return (
                    <TouchableOpacity onPress={() => { navigation.navigate("TranscriptEdit", { id: item._id, stId: item.studentId, courseID: item.courseID, CourseTitle: item.CourseTitle, CR_HRS: item.CR_HRS, GRADE: item.GRADE }) }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', borderBottomWidth: 0.5, alignItems: 'center', marginHorizontal: 5, flex: 1, padding: 5 }}>
                            <Text style={{ width: "20%", paddingLeft: 5 }}>{item.courseID}</Text>
                            <Text style={{ width: "60%", paddingLeft: 5 }}>{item.CourseTitle}</Text>
                            <Text style={{ width: "9%" }}>{item.CR_HRS}</Text>
                            <Text style={{ width: "11%" }}>{item.GRADE}</Text>
                        </View>
                    </TouchableOpacity>
                )
            }}
        />
        <View>
            {/* <Text>cgpa</Text> */}
        </View>
    </View>)
}
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: 10
    }, header: {

    }
});

export default StudentTranscript;