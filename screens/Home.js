import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useContext } from 'react';
import { Text, View, ScrollView, Button } from 'react-native';
import Popular from '../components/Popular';
import * as Linking from 'expo-linking';
const Home = ({ navigation }) => {
    const [link, setLink] = useState('');
    const nav = res => {
        if (res.title) {
            navigation.navigate('Movie', { id: res.id });
        } else {
            navigation.navigate('TV', { id: res.id });
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