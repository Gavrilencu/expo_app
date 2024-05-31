// SearchScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SearchScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigation = useNavigation(); // Obține obiectul de navigare

  useEffect(() => {
    return () => {
      setSearchResults([]); // Curăță rezultatele căutării când componenta este dezmontată
    };
  }, []);

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      if (searchTerm.trim() !== '') {
        handleSearch();
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(delaySearch);
  }, [searchTerm]);

  const handleSearch = async () => {
    try {
      const response = await fetch('http://192.168.0.60:3000/api/searchByUsername', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: searchTerm }),
      });
      const data = await response.json();
      setSearchResults(data.users);
    } catch (error) {
      console.error('Eroare la căutare:', error);
    }
  };

  const navigateToMessage = (username) => {
    navigation.navigate('Message', { username }); // Navigare la pagină cu parametrul username
  };

  return (
    <ImageBackground source={require('../assets/background.jpg')} style={styles.background}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Caută utilizatori..."
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        <FlatList
          data={searchResults}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigateToMessage(item.username)}>
              <View style={styles.userContainer}>
                {item.username && <Text style={styles.username}>{item.username}</Text>}
                <Text style={styles.userId}>ID: {item.id}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
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
    paddingTop: 80,
    flex: 1,
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
    color: '#333',
  },
  userContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 3,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  userId: {
    color: '#666',
  },
});

export default SearchScreen;
