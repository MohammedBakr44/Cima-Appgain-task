import { Text, View, ScrollView, Image, TouchableHighlight } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import useConfiguration from '../hooks/useConfiguration';
import { API_KEY } from '@env';
import Movie from './Movie';
import TV from './TV';
import * as SplashScreen from 'expo-splash-screen';
const Popular = ({ nav }) => {
    const [popularMovies, setPopularMovies] = useState([]);
    const [popularTV, setPopularTV] = useState([]);
    const [imageUrl, images] = useConfiguration();
    const [loading, setLoading] = useState(true);
    const getPopularMovies = async () => {
        try {
            const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
            const data = await res.json();
            return await data.results;
        } catch (err) { console.log(err) };
    }

    const getPopularTV = async () => {
        try {
            const res = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=1`);
            const data = await res.json();
            return data.results;
        } catch (err) { console.log(err) }
    }
    useEffect(() => {
        let ignoreRequest = false;
        // ignoreRequest is used to prevent the effect from being run twice, the cleanup changes ignoreRequest to true which leads to ignoring the code block
        if (!ignoreRequest) {
            getPopularMovies().then(data => {
                setPopularMovies(data);
                setLoading(false);
            });
            getPopularTV().then(data => setPopularTV(data));
        }
        return () => ignoreRequest = true;

    }, []);
    const onLayoutRootView = useCallback(async () => {
        if (!loading) {
            // This tells the splash screen to hide immediately! If we call this after
            // `setAppIsReady`, then we may see a blank screen while the app is
            // loading its initial state and rendering its first pixels. So instead,
            // we hide the splash screen once we know the root view has already
            // performed layout.
            await SplashScreen.hideAsync();
        }
    }, [loading]);

    return (
        <View className="m-2" onLayout={onLayoutRootView}>
            <View>
                {popularMovies[0] && <Image resizeMode="cover" className="rounded w-max mt-10 h-52" source={{ uri: `${imageUrl}original${popularMovies[0]['backdrop_path']}` }} />}
            </View>
            <Text className="p-2 mt-2 text-xl">Most popular Movies</Text>
            <ScrollView horizontal={true}>
                {popularMovies.map(movie => (
                    <TouchableHighlight key={movie.id} onPress={() => nav(movie)} underlayColor="white">
                        <Movie movie={movie} />
                    </TouchableHighlight>
                ))}
            </ScrollView>
            <Text className="p-2 mt-2 text-xl">Most popular TV Shows</Text>
            <ScrollView horizontal={true}>
                {popularTV.map(tv => (
                    <TouchableHighlight key={tv.id} onPress={() => nav(tv)} underlayColor="white">
                        <TV series={tv} />
                    </TouchableHighlight>
                ))}
            </ScrollView>
        </View>
    )
}

export default Popular;