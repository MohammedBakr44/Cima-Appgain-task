import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Linking from 'expo-linking';
import Home from './screens/Home';
import MovieScreen from './screens/MovieScreen';
import TVScreen from './screens/TVScreen';

const Stack = createNativeStackNavigator();

const prefix = Linking.createURL('/');
export default function App() {
  const config = {
    screens: {
      Movie: {
        path: 'movie/:id'
      },
      TV: {
        path: 'tv/:id'
      },
      Home: {
        path: 'open',
        // screens: {
        //   Movie: {
        //     path: 'movie/:id',
        //     parse: {
        //       id: id => `${id}`
        //     }
        //   },
        //   TV: {
        //     path: 'tv/:id',
        //     parse: {
        //       id: id => `${id}`
        //     }
        //   }
        // }
      },
    }
  }
  const linking = {
    prefixs: [prefix],
    config
  }
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Movie" component={MovieScreen} options={{ title: 'Movie info' }} />
        <Stack.Screen name="TV" component={TVScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}