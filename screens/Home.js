import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useContext } from 'react';
import { Text, View, ScrollView } from 'react-native';
import Popular from '../components/Popular';
import { movieContext } from '../components/Popular';
const Home = ({ navigation }) => {
    const nav = res => {
        if (res.title) {
            navigation.navigate('Movie', { name: res.title, id: res.id });
        } else {
            navigation.navigate('TV', { name: res.name, id: res.id });
        }
    }
    return (
        <View className="flex-1 items-center justify-center bg-white">
            <ScrollView>
                <Popular nav={nav} />
            </ScrollView>
            <StatusBar style="auto" />
        </View>
    )
}

export default Home;