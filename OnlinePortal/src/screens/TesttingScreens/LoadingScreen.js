// App.js
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList,StyleSheet,Modal } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';


const socket = io('https://9bce1e67bb32-2980149167387609208.ngrok-free.app'); // Replace with your server URL

export default  LoadingScreen=()=> {
  const [user, setUser] = useState('');
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    // Load user from AsyncStorage
    AsyncStorage.getItem('user').then((savedUser) => {
      if (savedUser) setUser(savedUser);
    });

    // Listen for new messages from server
    socket.on('newMessage', (message) => {
      setMessageList((prevList) => [...prevList, message]);
    });

    // Listen for initial message list from server
    socket.on('messageList', (messages) => {
      setMessageList(messages);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      const data = { user, text: message };
      socket.emit('sendMessage', data);
      setMessage('');
    }
  };
  const [isMenuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  const closeMenu = () => {
    setMenuVisible(false);
  };

  const handleBackPress = () => {
    if (isMenuVisible) {
      closeMenu();
      return true; // Prevent default back button behavior
    }
    return false; // Allow default back button behavior
  };
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 18, marginBottom: 8 }}>Chat App</Text>
      <FlatList
        data={messageList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 8 }}>
            <Text>{`${item.user}: ${item.text}`}</Text>
          </View>
        )}
      />
      <TextInput
        placeholder="Enter your message"
        value={message}
        onChangeText={(text) => setMessage(text)}
        style={{ borderWidth: 1, borderColor: 'gray', borderRadius: 4, padding: 8, marginBottom: 8 }}
      />
      <TouchableOpacity  onPress={toggleMenu} style={{ backgroundColor: 'blue', padding: 8, borderRadius: 4 }}>
        <Text style={{ color: 'white', textAlign: 'center' }}>Send</Text>
      </TouchableOpacity>
      {isMenuVisible && (
        <Modal visible={true} animationType="fade" transparent={true}>
          <TouchableOpacity style={styles.modalContainer} onPress={closeMenu}>
            <View style={styles.menu}>
              <Text style={styles.text}>Menu Item 1</Text>
              <Text style={styles.text}>Menu Item 2</Text>
              <Text style={styles.text}>Menu Item 3</Text>
              <TouchableOpacity onPress={()=>navigation.navigate("LoadingScreen")}>
                <Text style={styles.text}>Close Menu</Text><View style={styles.view}></View>
              </TouchableOpacity>
              
            </View>
          </TouchableOpacity>
        </Modal>
      )}
    </View>
  );
}
const styles=StyleSheet.create({
  modalContainer: {
    flex: 1,
    
    alignItems: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    justifyContent:'flex-start'
  },
  menu: {
    backgroundColor: 'white',
    width: 200,
    borderRadius: 4,
   
  },
  text:{
    backgroundColor:'red',
padding:10
  },
  view:{
    backgroundColor:'red',
padding:10,height:"100%"
  }
})