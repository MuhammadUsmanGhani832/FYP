import React, { useContext, useState } from 'react';
import { StyleSheet, View, Image, FlatList, TouchableOpacity, ActivityIndicator, TextInput, Modal, } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import { Context as CourseContext } from '../context/CourseContext'
import { Alert } from 'react-native';
import { Context as AuthContext } from '../context/AuthContext';
import { Context as ClassContext } from '../context/ClassContext';
import { useFocusEffect } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';


const DetailScreenForClass = ({ navigation, route }) => {
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const id = route.params.id;
    const email = route.params.email;
    const { stateForClassWork, fetchClassWork, createClassWork, removeFunctionChat } = useContext(ClassContext);
    const { myState, enrollApi } = useContext(CourseContext);
    const { state, signup, clearErrorMessage, check_email } = useContext(AuthContext);
    const title = state.user_detail.name;


    const course_are = myState.fetch_courses.find((t) => t._id === id);
    //    console.log(course_id);
    //    console.log(user_id); courseId, title, description, dueDate,
    const courseId = id;
    const [isMenuVisible, setMenuVisible] = useState(false);
    const callFunction = async () => {

        await setDueDate(new Date().getHours() + ":" + new Date().getMinutes() + " (" + new Date().getUTCDate() + "/" + new Date().getMonth() + "/" + new Date().getFullYear() + ")");
        console.log(dueDate);
        createClassWork({ courseId, title, description, dueDate })
        fetchClassWork({ courseId });
        setDescription("")
    }

    useFocusEffect(
        React.useCallback(() => {
            fetchClassWork({ courseId });
            navigation.setOptions({
                title: 'Class',
                headerRight: () => (
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity
                            onPress={() => { navigation.navigate("ClassChat", { courseId }) }} style={{ marginRight: 10 }}><Ionicons name="ios-chatbubble-ellipses" size={24} color="black" />
                        </TouchableOpacity>
                        {state.portal === "teacher" ? <TouchableOpacity
                            onPress={() => toggleMenu()} style={{ marginRight: 10 }}>
                            <MaterialCommunityIcons name="menu-open" size={24} color="black" />
                        </TouchableOpacity> : null}
                    </View>

                ),
            });
            return () => {
                removeFunctionChat()
                closeMenu();
                // Usel for cleanup functions

            };
        }, [])
    );

    const toggleMenu = () => {
        setMenuVisible(!isMenuVisible);

    };
    const closeMenu = () => {
        setMenuVisible(false);
    };
    return (
        <>
            <View style={{ flex: 1 }}><Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', padding: 5, borderBottomWidth: 1 }}>{course_are.course_name}</Text>
                <View style={{ flex: 1, backdgroundColor: 'yellow' }}>
                    {stateForClassWork.length === 0 ? <View style={{ flex: 1, justifyContent: 'center' }}>
                        <ActivityIndicator size="large" />
                        <Text style={{ textAlign: 'center', marginTop: 10 }}>Loading...</Text>
                    </View> : <FlatList
                        inverted={true}
                        data={stateForClassWork}
                        keyExtractor={(item) => item._id}
                        renderItem={({ item }) => {
                            return (
                                <View>
                                    {item.title==="Lecture"?<View style={{
                                    borderRadius: 5,
                                    backgroundColor: "red",
                                    marginHorizontal: 10,
                                    marginVertical: 10,
                                }}>
                                    <Text style={{
                                        fontSize: 14,
                                        backgroundColor: 'red',
                                        borderTopLeftRadius: 5,
                                        borderTopRightRadius: 5,
                                        paddingHorizontal: 5,
                                        color: '#800080',
                                        borderBottomWidth: 0.3,
                                        borderBottomColor: 'black'
                                    }}>{item.title}    {item.dueDate}</Text>
                                    <Text style={{
                                        textAlign: 'left',
                                        paddingHorizontal: 5,
                                        fontSize: 20
                                    }}>{item.description}</Text>
                                    <Text style={{
                                        textAlign: 'left',
                                        paddingHorizontal: 5,
                                        fontSize: 12
                                    }}></Text>
                                </View>:item.title==="Assignment"?<View style={{
                                    borderRadius: 5,
                                    backgroundColor: "lightblue",
                                    marginHorizontal: 10,
                                    marginVertical: 10,
                                }}>
                                    <Text style={{
                                        fontSize: 14,
                                        backgroundColor: 'lightblue',
                                        borderTopLeftRadius: 5,
                                        borderTopRightRadius: 5,
                                        paddingHorizontal: 5,
                                        color: '#800080',
                                        borderBottomWidth: 0.3,
                                        borderBottomColor: 'black'
                                    }}>{item.title}    {item.dueDate}</Text>
                                    <Text style={{
                                        textAlign: 'left',
                                        paddingHorizontal: 5,
                                        fontSize: 20
                                    }}>{item.description}</Text>
                                    <Text style={{
                                        textAlign: 'left',
                                        paddingHorizontal: 5,
                                        fontSize: 12
                                    }}></Text>
                                </View>:item.title==="Quiz"?<View style={{
                                    borderRadius: 5,
                                    backgroundColor: "lightyellow",
                                    marginHorizontal: 10,
                                    marginVertical: 10,
                                }}>
                                    <Text style={{
                                        fontSize: 14,
                                        backgroundColor: 'lightyellow',
                                        borderTopLeftRadius: 5,
                                        borderTopRightRadius: 5,
                                        paddingHorizontal: 5,
                                        color: '#800080',
                                        borderBottomWidth: 0.3,
                                        borderBottomColor: 'black'
                                    }}>{item.title}    {item.dueDate}</Text>
                                    <Text style={{
                                        textAlign: 'left',
                                        paddingHorizontal: 5,
                                        fontSize: 20
                                    }}>{item.description}</Text>
                                    <Text style={{
                                        textAlign: 'left',
                                        paddingHorizontal: 5,
                                        fontSize: 12
                                    }}></Text>
                                </View>:<View style={{
                                    borderRadius: 5,
                                    backgroundColor: "#d3d3d3",
                                    marginHorizontal: 10,
                                    marginVertical: 10,
                                }}>
                                    <Text style={{
                                        fontSize: 14,
                                        backgroundColor: '#d3d3d3',
                                        borderTopLeftRadius: 5,
                                        borderTopRightRadius: 5,
                                        paddingHorizontal: 5,
                                        color: '#800080',
                                        borderBottomWidth: 0.3,
                                        borderBottomColor: 'black'
                                    }}>{item.title}    {item.dueDate}</Text>
                                    <Text style={{
                                        textAlign: 'left',
                                        paddingHorizontal: 5,
                                        fontSize: 20
                                    }}>{item.description}</Text>
                                    <Text style={{
                                        textAlign: 'left',
                                        paddingHorizontal: 5,
                                        fontSize: 12
                                    }}></Text>
                                </View>}
                                </View>
                            )
                        }}
                    />}
                    {state.portal === "teacher" ? <View style={{ flexDirection: 'row', padding: 10, borderTopWidth: .5 }}>
                        <TextInput onChangeText={(newtext) => setDescription(newtext)}
                            value={description}
                            placeholder='Text'
                            style={{ borderWidth: .5, width: '80%', height: 50, fontSize: 25, padding: 10, borderRadius: 4 }}
                        />
                        <TouchableOpacity onPress={() => callFunction()} style={{ width: 50, height: 50, borderRadius: 50, borderWidth: 1, marginLeft: 10, justifyContent: 'center', alignItems: 'center' }}><MaterialCommunityIcons name="send" size={24} color="black" /></TouchableOpacity>
                    </View> : null}
                </View>
            </View>
            {isMenuVisible && (
                <Modal visible={true} animationType="fade" transparent={true}>
                    <TouchableOpacity style={styles.modalContainer} onPress={toggleMenu}>
                        <TouchableOpacity style={styles.menu}>
                            <View style={{ height: 40, alignItems: 'flex-end', justifyContent: 'center' }}>
                                <TouchableOpacity
                                    onPress={() => { toggleMenu() }}><Entypo name="cross" size={24} color="black" />
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity>
                                <View style={{ backgroundColor: 'black', height: 5 }}></View>
                            </TouchableOpacity>
                            <View
                                style={{
                                    backgroundColor: 'white',
                                    height: 40,
                                    borderBottomWidth: .5,
                                    justifyContent: 'center',
                                }}
                            >
                                <TouchableOpacity
                                    onPress={() => {
                                        return (
                                           navigation.navigate("CreateClassWork",{id})
                                        )
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 20,
                                            marginLeft: 5
                                        }}
                                    >Add Quiz</Text>
                                </TouchableOpacity>
                            </View>
                            <View
                                style={{
                                    backgroundColor: 'white',
                                    height: 40,
                                    borderBottomWidth: .5,
                                    justifyContent: 'center',
                                }}
                            >
                                <TouchableOpacity
                                    onPress={() => {
                                        return (
                                            navigation.navigate("CreateClassWork1",{id})
                                        )
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 20,
                                            marginLeft: 5
                                        }}
                                    >Add Assignment</Text>
                                </TouchableOpacity>
                            </View>
                            <View
                                style={{
                                    backgroundColor: 'white',
                                    height: 40,
                                    borderBottomWidth: .5,
                                    justifyContent: 'center',
                                }}
                            >
                                <TouchableOpacity
                                    onPress={() => {
                                        return (
                                            navigation.navigate("CreateClassWork2",{id})
                                        )
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 20,
                                            marginLeft: 5
                                        }}
                                    >Add Lecture Link</Text>
                                </TouchableOpacity>
                            </View>
                            <View
                                style={{
                                    backgroundColor: 'white',
                                    height: 40,
                                    borderBottomWidth: .5,
                                    justifyContent: 'center',
                                }}
                            >
                                <TouchableOpacity
                                    onPress={() => {
                                        return (
                                            navigation.navigate("DetailScreenForView",{id})
                                        )
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 20,
                                            marginLeft: 5
                                        }}
                                    >Students Attendance</Text>
                                </TouchableOpacity>
                            </View>
                            <View
                                style={{
                                    backgroundColor: 'white',
                                    height: 40,
                                    borderBottomWidth: .5,
                                    justifyContent: 'center',
                                }}
                            >
                                <TouchableOpacity
                                    onPress={() => {
                                        return (
                                            navigation.navigate("StudentListforResult",{id})
                                        )
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 20,
                                            marginLeft: 5
                                        }}
                                    >Students Result</Text>
                                </TouchableOpacity>
                            </View>
                            
                            <TouchableOpacity onPress={() => { console.log("only for full view") }}>
                                <View style={styles.view}></View>
                            </TouchableOpacity>

                        </TouchableOpacity>
                    </TouchableOpacity>
                </Modal>
            )}
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
    }, modalContainer: {
        flex: 1,
        alignItems: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
        justifyContent: 'flex-start'
    },
    menu: {
        backgroundColor: 'white',
        width: 200,
        borderRadius: 4,

    },
    view: {
  
      padding: 10, height: "100%"
    }
});

export default DetailScreenForClass;