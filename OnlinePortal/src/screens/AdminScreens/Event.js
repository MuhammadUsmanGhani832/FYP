import React, { useContext, useState } from 'react';
import { StyleSheet, View, Image, FlatList, TouchableOpacity, ActivityIndicator, TextInput, Modal, } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import { useFocusEffect } from '@react-navigation/native';
import { Context as AuthContext } from '../../context/AuthContext'
import { MaterialIcons } from '@expo/vector-icons';


const Event = ({ navigation, route }) => {
    const { state, createEvent, fetchEvent } = useContext(AuthContext)


    useFocusEffect(
        React.useCallback(() => {
            fetchEvent();
            navigation.setOptions({
                title: 'Events',
                headerRight: () => (
                    <View style={{ flexDirection: 'row' }}>
                        {state.portal === "admin" ? <TouchableOpacity
                            onPress={() => { navigation.navigate("EventCreate") }} style={{ marginRight: 10 }}><MaterialIcons name="event" size={24} color="black" />
                        </TouchableOpacity> : null}

                    </View>

                ),
            });
            return () => {

                // Usel for cleanup functions

            };
        }, [])
    );
    return (
        <>
            <View style={{ flex: 1 }}>
                {state.events_data.length === 0 ? <View style={{ flex: 1, justifyContent: 'center' }}><ActivityIndicator></ActivityIndicator>
                    <Text style={{ textAlign: 'center' }}>Connect to Server...</Text>
                </View> : <FlatList
                    inverted={true}
                    data={state.events_data}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => {
                        return (
                            <View>
                                <View style={{
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
                                    }}>{item.title}    {item.date}</Text>
                                    <Text style={{
                                        textAlign: 'left',
                                        paddingHorizontal: 5,
                                        fontSize: 20
                                    }}>{item.description}</Text>
                                    <Text style={{
                                        textAlign: 'left',
                                        paddingHorizontal: 5,
                                        fontSize: 12
                                    }}>Event on: {item.createDate}</Text>
                                </View>
                            </View>
                        )
                    }}
                />}
            </View>

        </>
    )
}
const styles = StyleSheet.create({


});

export default Event;