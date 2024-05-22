import React from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NewsScreen from './NewsScreen';
import SearchScreen from './SearchScreen';
import AddScreen from './AddScreen';
import SettingsScreen from './SettingsScreen';
import ProfileScreen from './ProfileScreen';

const HomeScreen = () => {
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer independent={true}>
   <Tab.Navigator
  initialRouteName="News"
  screenOptions={{
    tabBarLabelStyle: {
      fontSize: 12,
      marginTop: 2
    },
    tabBarStyle: [
      {
        display: 'flex'
      },
      null
    ]
  }}
>
        <Tab.Screen
          name="News"
          component={NewsScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="newspaper-outline" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="search-outline" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Add"
          component={AddScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="add-circle-outline" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="settings-outline" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-outline" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  tabText: {
    fontSize: 12,
    marginTop: 2,
  },
});

export default HomeScreen;
