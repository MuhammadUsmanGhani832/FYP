import {useContext} from 'react'
import {Text,StyleSheet,View} from 'react-native';
import { Context as CourseContext } from '../context/CourseContext'
const ListForm=({id})=>{
    const { myState} = useContext(CourseContext);
    const course=myState.fetch_courses.find((t)=>t._id===id);
    return<View style={styles.view}>
         <View style={styles.listItem}>
                                    <View style={styles.firstview}>
                                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 10 }}>{course.course_name}</Text>
                                        <Text style={{ fontStyle: "italic", marginLeft: 10, marginBottom: 5 }}>Teacher: {course.instructor_name}</Text>
                                    </View>
                                    <View style={styles.secondview}>
                                         <Text>{course.course_description}</Text>
                                    </View>

                                </View>
        
    
   </View>
}
const styles=StyleSheet.create({
    

    listItem: {
        backgroundColor: '#D3D3D3',
        height: 90, marginHorizontal: 5, marginVertical: 5, flexDirection: 'row', borderRadius: 5
    },
    firstview: {
        flex: 3,
        justifyContent: 'space-around'
    },
    secondview: {
        flex: 1, backgroundColor: '#d3d3d', borderRadius: 5, alignItems:'center',justifyContent:'center'
    },
})
export default ListForm;