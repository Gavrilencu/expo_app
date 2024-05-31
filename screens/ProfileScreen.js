import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Preia datele utilizatorului din AsyncStorage la încărcarea paginii
    AsyncStorage.getItem('username')
      .then(username => {
        // Utilizează numele de utilizator pentru a obține celelalte informații despre utilizator
        // Aici poți face o altă cerere către server pentru a prelua mai multe informații despre utilizator
        const user = {
          username: username,
         // Exemplu de nume preluat de la server sau stocat în altă parte
          // Exemplu de imagine preluată local
          friends: ['Friend 1', 'Friend 2', 'Friend 3'], // Exemplu de lista de prieteni preluată de la server
          posts: ['Post 1', 'Post 2', 'Post 3'], // Exemplu de lista de postări preluată de la server
        };
        setUserData(user);
      })
      .catch(error => console.error('Error retrieving user data:', error));
  }, []);

  if (!userData) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={userData.image} style={styles.image} />
      <Text style={styles.username}>{userData.username}</Text>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Friends:</Text>
        <FlatList
          data={userData.friends}
          renderItem={({ item }) => (
            <Text style={styles.item}>{item}</Text>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Posts:</Text>
        <FlatList
          data={userData.posts}
          renderItem={({ item }) => (
            <Text style={styles.item}>{item}</Text>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  name: {
    fontSize: 18,
    marginBottom: 10,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    fontSize: 16,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 5,
  },
});

export default ProfileScreen;
