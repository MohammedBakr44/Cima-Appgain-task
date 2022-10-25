import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView } from 'react-native';
import Popular from './components/Popular';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import MovieScreen from './screens/MovieScreen';
import TVScreen from './screens/TVScreen';
const Stack = createNativeStackNavigator();



export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Movie" component={MovieScreen} options={{ title: 'Movie info' }} />
        <Stack.Screen name="TV" component={TVScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}