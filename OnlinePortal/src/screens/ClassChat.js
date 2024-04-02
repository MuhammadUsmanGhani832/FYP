import React, { useContext, useState } from 'react';
import { StyleSheet, View, Image, FlatList, TouchableOpacity,ActivityIndicator ,TextInput} from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import { Context as CourseContext } from '../context/CourseContext'
import { Alert } from 'react-native';
import { Context as AuthContext } from '../context/AuthContext';
import { Context as ClassContext } from '../context/ClassContext';
import { useFocusEffect } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ClassChat = ({ navigation, route }) => {
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const id = route.params.courseId;
    const email = route.params.email;
    const { stateForClassWork, fetchClassWork2, createClassWork2,removeFunctionChat } = useContext(ClassContext);
    const { myState, enrollApi } = useContext(CourseContext);
    const { state, signup, clearErrorMessage, check_email } = useContext(AuthContext);
    const title = state.user_detail.name;


    const course_are = myState.fetch_courses.find((t) => t._id === id);
    //    console.log(course_id);
    //    console.log(user_id); courseId, title, description, dueDate,
    const courseId = id;
    const callFunction = async() => {
      await  setDueDate(new Date().getHours() + ":" + new Date().getMinutes() + " (" + new Date().getUTCDate() + "/" + new Date().getMonth()+ "/" + new Date().getFullYear() + ")");
       
        createClassWork2({ courseId, title, description, dueDate })
        fetchClassWork2({ courseId });
        setDescription("")
    }

    useFocusEffect(
        React.useCallback(() => {
            fetchClassWork2({ courseId });
            navigation.setOptions({
                title: 'Chat',
                
              });
            return () => {
                removeFunctionChat()

                // Use for cleanup functions

            };
        }, [])
    );

    return (
        <><View style={{ flex: 1 }}>
            <View style={{ flex: 1, backdgroundColor: 'yellow' }}>
                {stateForClassWork.length===0? <View style={{flex:1,justifyContent:'center'}}>
                    <ActivityIndicator size="large" />
                    <Text style={{textAlign:'center',marginTop:10}}>Loading...</Text>
                </View>:<FlatList
                    inverted={true}
                    data={stateForClassWork}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => {
                        return (
                            <View style={{ borderRadius: 5, 
                            backgroundColor: "#d3d3d3",
                             marginHorizontal: 10, 
                             marginVertical: 10, }}>
                             <Text style={{ fontSize: 14,
                              backgroundColor: '#d3d3d3', 
                              borderTopLeftRadius: 5,
                               borderTopRightRadius: 5,
                                paddingHorizontal: 5, 
                                color: '#800080', 
                                borderBottomWidth: 0.3,
                                 borderBottomColor: 'black' }}>{item.title}    -{item.dueDate}</Text>
                             <Text style={{ textAlign: 'left',
                               paddingHorizontal: 5, 
                               fontSize: 20 }}>{item.description}</Text>
                                <Text style={{ textAlign: 'left', 
                                paddingHorizontal: 5, 
                                fontSize: 12 }}></Text>
                            </View>
                        )
                    }}
                />}
                <View style={{flexDirection:'row',padding:10,borderTopWidth:.5}}>
                    <TextInput onChangeText={(newtext) => setDescription(newtext)}
                        value={description}
                        placeholder='Text'
                        style={{borderWidth:.5,width:'80%',height:50,fontSize:25,padding:10,borderRadius:4}}
                    />
                    {/* navigation.navigate("CreateClassWork", { id: courseId }) } */}
                    <TouchableOpacity onPress={() => callFunction()} style={{width:50,height:50,borderRadius:50,borderWidth:1,marginLeft:10,justifyContent:'center',alignItems:'center'}}><MaterialCommunityIcons name="send" size={24} color="black" /></TouchableOpacity>
                </View>
            </View>
        </View>
        </>
    )
}
const styles = StyleSheet.create({

    list: {
        backgroundColor: 'white',
        marginVertical: 5,
        marginHorizontal: 10,
        height: 50,
        borderRadius: 5
    }
});

export default ClassChat;