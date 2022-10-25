import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView } from 'react-native';
import Popular from './components/Popular';

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <ScrollView>
        <Popular />
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}