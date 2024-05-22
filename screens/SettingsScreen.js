import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, StyleSheet, ImageBackground, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SettingsScreen = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [settingType, setSettingType] = useState('');
  const [newValue, setNewValue] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  const handleSettingPress = (type) => {
    setSettingType(type);
    setIsModalVisible(true);
  };

  const handleSaveChanges = () => {
    // Implementează logica pentru a salva schimbările în sistem
    console.log(`New ${settingType}:`, newValue);
    setIsModalVisible(false);
  };

  return (
    <ImageBackground source={require('../assets/background.jpg')} style={styles.container}>
      <View style={styles.settingsContainer}>
        <TouchableOpacity onPress={() => handleSettingPress('name')} style={styles.setting}>
          <Ionicons name="person-outline" size={24} color="black" />
          <Text style={styles.settingText}>Change Name</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleSettingPress('email')} style={styles.setting}>
          <Ionicons name="mail-outline" size={24} color="black" />
          <Text style={styles.settingText}>Change Email</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleSettingPress('password')} style={styles.setting}>
          <Ionicons name="lock-closed-outline" size={24} color="black" />
          <Text style={styles.settingText}>Change Password</Text>
        </TouchableOpacity>

        <View style={styles.setting}>
          <Ionicons name="notifications-outline" size={24} color="black" />
          <Text style={styles.settingText}>Notifications</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={(value) => setNotificationsEnabled(value)}
            style={styles.switch}
          />
        </View>
      </View>

      <Modal visible={isModalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Change {settingType.charAt(0).toUpperCase() + settingType.slice(1)}</Text>
            <TextInput
              value={newValue}
              onChangeText={setNewValue}
              placeholder={`Enter new ${settingType}`}
              style={styles.input}
            />
            <View style={styles.actionButtonsContainer}>
              <TouchableOpacity onPress={handleSaveChanges} style={[styles.actionButton, styles.saveButton]}>
                <Text style={styles.buttonText}>Save Changes</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setIsModalVisible(false)} style={[styles.actionButton, styles.cancelButton]}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:"20%",
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  settingsContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width:"100%",
    padding: 20,
    marginBottom: 20,
  },
  setting: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    height:50,
    paddingBottom:10,
    borderBottomWidth:1,
    borderColor:"#D8D9DA",
  },
  settingText: {
    marginLeft: 10,
    fontSize: 16,
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  actionButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: 'blue',
  },
  cancelButton: {
    backgroundColor: 'red',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  switch: {
    marginLeft: 10,
  },
});

export default SettingsScreen;
