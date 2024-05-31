import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MessagesScreen = () => {
  const [friendsWithMessages, setFriendsWithMessages] = useState([]);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    // Funcție pentru extragerea id-ului din local storage
    const getUserIdFromStorage = async () => {
      try {
        const id = await AsyncStorage.getItem('id');
        if (id) {
          setUserId(id);
        }
      } catch (error) {
        console.error('Eroare la extragerea id-ului din local storage:', error);
      }
    };

    getUserIdFromStorage(); // Apelăm funcția pentru a extrage id-ul din local storage
  }, []);

  useEffect(() => {
    const fetchFriendsWithMessages = async () => {
      try {
        if (userId) {
          // Trimitem id-ul utilizatorului către server utilizând endpoint-ul corespunzător
          const response = await fetch(`http://192.168.0.60:3000/api/messagesBySender/${userId}`);
          const data = await response.json();
          // Obținem numele prietenilor cu care avem mesaje din răspunsul primit
          const friendNames = Object.values(data.receiverUsernames);
          setFriendsWithMessages(friendNames);
        }
      } catch (error) {
        console.error('Eroare la extragerea prietenilor cu mesaje:', error);
      }
    };

    fetchFriendsWithMessages();
  }, [userId]);

  return (
    <ImageBackground source={require('../assets/background.jpg')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Listă mesage</Text>
        <FlatList
          data={friendsWithMessages}
          renderItem={({ item }) => (
            <View style={styles.messageContainer}>
              <Text style={styles.messageText} numberOfLines={2} ellipsizeMode="tail">{item}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    paddingTop:50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  listContainer: {
    alignItems: 'stretch',
  },
  messageContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    width: '90%',
    alignSelf: 'center',
    alignItems: 'flex-start',
  },
  messageText: {
    fontSize: 16,
    color: '#333',
    minWidth: '100%',
  },
});

export default MessagesScreen;
