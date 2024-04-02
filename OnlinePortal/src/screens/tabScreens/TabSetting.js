import React, { useContext, useState } from "react";
import { StyleSheet, Text, FlatList, TouchableOpacity, View, Button, Modal, Image } from "react-native";
import { Context as getEnrollCoursesContext } from '../../context/GetEnrollCoursesContext';
import { Context as AuthContext } from '../../context/AuthContext';
import { Context as CourseContext } from '../../context/CourseContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { ActivityIndicator } from "react-native";



const TabHome = ({ navigation }) => {
  const { stateT, getEnrollCourses,clear } = useContext(getEnrollCoursesContext);
  const { state,signout,oneTeacherById } = useContext(AuthContext);
  const { myState, fetchCourses } = useContext(CourseContext);
  const studentId = state.user_id;
  console.log(state.user_id)
  const id=studentId;
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [isMenuVisible2, setMenuVisible2] = useState(false);


  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
   
  };
  const toggleMenu2 = () => {
    setMenuVisible2(!isMenuVisible2);
   
  };

  const closeMenu = () => {
    setMenuVisible(false);
  };

  React.useEffect(() => {
   
    navigation.setOptions({
      title: 'University Portal',
      headerRight: () => (
        <TouchableOpacity
          onPress={() => { toggleMenu() }} style={{ marginRight: 10 }}><FontAwesome name="user-circle-o"
            size={24} color="black" />
        </TouchableOpacity>
      ),headerLeft:false
    });
    const unsubscribe = navigation.addListener('focus', async () => {

      // await fetchCourses();
      oneTeacherById({id});
      closeMenu()
      // getEnrollCourses({ studentId });
    });

    return unsubscribe;
  }, [navigation]);



  if (state.user_detail !== '') {
    return (
      <View style={{ flex: 1, marginBottom: 60, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', paddingTop: 15 ,alignItems:'flex-start'}}>

        <TouchableOpacity style={{ width: 150, height: 150, marginBottom: 15, borderRadius: 5, borderWidth: 0.5, shadowColor: 'green', justifyContent: 'center', alignItems: 'center' }}
        onPress={()=>{navigation.navigate("EnrolledCoursesList",{id:state.user_detail.email})}}
        >
          <MaterialCommunityIcons name="google-classroom" size={44} color="black" />
          <Text>Classes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ width: 150, height: 150, marginBottom: 15, borderRadius: 5, borderWidth: 0.5, shadowColor: 'green', justifyContent: 'center', alignItems: 'center' }}
          onPress={() => navigation.navigate("Event")}
        >
        <MaterialIcons name="event" size={44} color="black" />
          <Text>Events</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={{ width: 150, height: 150, marginBottom: 15, borderRadius: 5, borderWidth: 0.5, shadowColor: 'green', justifyContent: 'center', alignItems: 'center' }}>
        <MaterialCommunityIcons name="timetable" size={44} color="black" />
          <Text>Time Table</Text>
        </TouchableOpacity> */}



        {isMenuVisible && (
          <Modal visible={true} animationType="fade" transparent={true}>
            <TouchableOpacity style={styles.modalContainer} onPress={toggleMenu}>
              <TouchableOpacity style={styles.menu}>
                <View style={{ height: 40, alignItems: 'flex-end', justifyContent: 'center' }}>
                  <TouchableOpacity
                    onPress={() => { toggleMenu() }}><Entypo name="cross" size={24} color="black" />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity><View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Image source={require('../../images/no-profile-pic-icon-12.jpg')} style={{ height: 100, width: 100 }}></Image>
                  <View style={{paddingVertical:5}}>{state.user_detail===""?null:<Text>{state.userEmail}</Text>}</View>

                </View></TouchableOpacity>
               <TouchableOpacity><View style={{backgroundColor:'black',height:5}}></View></TouchableOpacity>
                <View style={{backgroundColor:'#c0c0c0',height:40,borderBottomWidth:.5,justifyContent:'center',}}>
                  <TouchableOpacity onPress={()=>{
                    return(
                     toggleMenu2()
                    )
                  }}>
                    <Text style={{fontSize:20,marginLeft:5}}>Detail</Text>
                  </TouchableOpacity>
                </View>
                <View style={{backgroundColor:'#c0c0c0',height:40,borderBottomWidth:.5,justifyContent:'center',}}>
                  <TouchableOpacity onPress={()=>{navigation.navigate("ResetTeacherPassword",{userId:id})
                  }}>
                    <Text style={{fontSize:20,marginLeft:5}}>Reset Password</Text>
                  </TouchableOpacity>
                </View>
                <View style={{backgroundColor:'#c0c0c0',height:40,borderBottomWidth:.5,justifyContent:'center',}}>
                  <TouchableOpacity onPress={()=>{
                   
                      signout();
                      clear();
                    
                  }}>
                    <Text style={{fontSize:20,marginLeft:5}}>Sign Out</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => { console.log("only for full view") }}>
                  <View style={styles.view}></View>
                </TouchableOpacity>

              </TouchableOpacity>
            </TouchableOpacity>
          </Modal>
        )}
        {isMenuVisible2 && (
          <Modal visible={true} animationType="fade" transparent={true}>
            <TouchableOpacity style={styles.modalContainer2} onPress={toggleMenu2}>
              <TouchableOpacity style={styles.menu2}>
              <View style={{height:400,width:300,padding:10}}>
                <Text style={{fontSize:22}}>Name:</Text>
                <Text style={{fontSize:22}}>{state.user_detail.name}</Text>
                <Text style={{fontSize:22}}>Email:</Text>
                <Text style={{fontSize:22}}>{state.user_detail.email}</Text>
                <Text style={{fontSize:22}}>Status:</Text>
                <Text style={{fontSize:22}}>{state.user_detail.status}</Text>
              </View>
              </TouchableOpacity>
            </TouchableOpacity>
          </Modal>
        )}
      </View>
    )
  }
  else {
    return (
      <>
        <View style={{ flex: 1, marginBottom: 60 }}>
          <View style={{ width: 300, height: 300, backgroundColor: 'red' }}>
            <ActivityIndicator></ActivityIndicator>
          </View>
        </View>
      </>
    );
  }
};

const styles = StyleSheet.create({

  modalContainer: {
    flex: 1,
    alignItems: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    justifyContent: 'flex-start'
  },
  modalContainer2: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    justifyContent: 'center'
  },
  menu: {
    backgroundColor: 'white',
    width: 200,
    borderRadius: 4,

  },
  menu2: {
    backgroundColor: 'white',
    width: 300,
    borderRadius: 4,

  },

  text: {
    backgroundColor: 'red',
    padding: 10
  },
  view: {

    padding: 10, height: "100%"
  }
});

export default TabHome;
