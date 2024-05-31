// Message.js
import React from 'react';
import { View, Text } from 'react-native';

const MessageScreen = ({ route }) => {
  const { username } = route.params; // Obține parametrul username din rute

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Conversație cu {username}</Text>
    </View>
  );
};

export default MessageScreen;
