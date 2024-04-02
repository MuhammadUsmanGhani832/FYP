import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Context as CourseContext } from '../../context/CourseContext';
import { FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const TranscriptView = ({ navigation, route }) => {
    const { myState, fetchSubjects } = useContext(CourseContext);
    // const stName = route.params.name;
    // const stEmail = route.params.email;
    // const stRollNum = route.params.rollNum;
    const id = route.params.id;
    useFocusEffect(
        React.useCallback(() => {
    
            fetchSubjects({id})
    
          return () => {
    
            
            // Useful for cleanup functions
    
          };
        }, [])
      );
  
    return (<View style={{ flex: 1 }}>
       
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
                    
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', borderBottomWidth: 0.5, alignItems: 'center', marginHorizontal: 5, flex: 1 }}>
                            <Text style={{ width: "20%" }}>{item.courseID}</Text>
                            <Text style={{ width: "60%" }}>{item.CourseTitle}</Text>
                            <Text style={{ width: "9%" }}>{item.CR_HRS}</Text>
                            <Text style={{ width: "11%" }}>{item.GRADE}</Text>
                        </View>
                   
                )
            }}
        />
        <View>
            <Text>cgpa</Text>
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

export default TranscriptView;