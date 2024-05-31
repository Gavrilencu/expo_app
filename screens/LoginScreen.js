import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      setError('Completati toate cimpurile...');
      return;
    }

    if (!isValidEmail(email)) {
      setError('Introduceti o adresa de email valida');
      return;
    }

    const data = { email: email, password: password };
    
    fetch('http://192.168.0.60:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(result => {
      // Verifică dacă autentificarea a fost reușită și dacă răspunsul conține datele necesare
      if (result.authentication === true && result && result.email && result.username) {
        // Salvează datele în local storage
        AsyncStorage.setItem('email', result.email)
  .then(() => AsyncStorage.setItem('username', result.username))
  .then(() => AsyncStorage.setItem('id', result.id.toString())) // Salvăm id-ul ca un șir de caractere
  .then(() => {
    navigation.navigate('Home');
  })
  .catch(err => {
    console.error('Error saving data:', err);
    setError('A apărut o eroare. Vă rugăm să încercați din nou mai târziu.');
  });

      } else {
        setError(result.error);
      }
    })
    
    .catch(error => {
      console.error('Error:', error);
      setError('A apărut o eroare. Vă rugăm să încercați din nou mai târziu.');
    });
  };

  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  return (
    <ImageBackground source={require('../assets/background.jpg')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome Back!</Text>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#40A578' }]}
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#007bff' }]}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.buttonText}>Create an Account</Text>
        </TouchableOpacity>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Opacitate pentru a nu acoperi complet imaginea de fundal
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: '#fff', // Culoarea de fundal a câmpului de introducere
  },
  button: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
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
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  errorText: {
    color: 'red',
    marginBottom: 20,
  },
});

export default LoginScreen;
