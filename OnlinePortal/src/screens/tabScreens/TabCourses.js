import React, { useContext } from 'react';
import { StyleSheet, View, Image, FlatList, TouchableOpacity } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import { Context as CourseContext } from '../../context/CourseContext';
import { FontAwesome } from '@expo/vector-icons';
import { Context as AuthContext } from '../../context/AuthContext';
const TabCourses = ({ navigation }) => {
    const { state} = useContext(AuthContext);
    console.log(state.portal)
    const { myState, fetchCourses } = useContext(CourseContext);
    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
          // The screen is focused
          // Call any action
          await fetchCourses();
        
        });
    
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
      }, [navigation]);

    return (
        <>
            <View style={{ flex: 1, marginBottom: 60 }}>
                <View>
                    <FlatList
                        data={myState}
                        keyExtractor={item => item._id}
                        renderItem={({ item }) => {
                            return <TouchableOpacity
                                onPress={() => { navigation.navigate('DetailScreen', { id: item._id }) }}>
                                <View style={styles.listItem}>
                                    <View style={styles.firstview}>
                                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 10 }}>{item.course_name}</Text>
                                        <Text style={{ fontStyle: "italic", marginLeft: 10, marginBottom: 5 }}>Teacher: {item.instructor_name}</Text>
                                    </View>
                                    <View style={styles.secondview}>
                                         <Text>{item.course_description}</Text>
                                    </View>

                                </View>
                            </TouchableOpacity>

                        }}
                    />
                </View>
              {state.teacher==="true"?  <View style={{ position: 'absolute', bottom: 10, right: 5 }}>
                    <TouchableOpacity onPress={() => { navigation.navigate('CreateNewCourse') }}>
                        <View style={{ height: 60, width: 60, backgroundColor: '#1ABC9C', borderRadius: 50, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <FontAwesome name="plus" size={24} color="black" />
                        </View>
                    </TouchableOpacity>
                </View>:null}
            </View>


        </>
    )
}
const styles = StyleSheet.create({

    listItem: {
        backgroundColor: '#D3D3D3',
        height: 90, marginHorizontal: 5, marginVertical: 5, flexDirection: 'row', borderRadius: 5
    },
    firstview: {
        flex: 3,
        justifyContent:'space-around'
    },
    secondview: {
        flex: 1, borderRadius: 5,alignItems:'center',justifyContent:'center'
    },
});

export default TabCourses;