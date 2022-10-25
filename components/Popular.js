import { Text, View, ScrollView, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import useConfiguration from '../utils/useConfiguration';
import { API_KEY } from '@env';
import Movie from './Movie';
import TV from './TV';
const Popular = () => {
    const [popularMovies, setPopularMovies] = useState([]);
    const [popularTV, setPopularTV] = useState([]);
    const [imageUrl, images] = useConfiguration();
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
        console.log('Effect');
        // ignoreRequest is used to prevent the effect from being run twice, the cleanup changes ignoreRequest to true which leads to ignoring the code block
        if (!ignoreRequest) {
            getPopularMovies().then(data => setPopularMovies(data));
            getPopularTV().then(data => setPopularTV(data));
        }
        return () => ignoreRequest = true;

    }, []);
    return (
        <View className="m-2">
            <View>
                {popularMovies[0] && <Image resizeMode="cover" className="rounded w-max mt-10 h-80" source={{ uri: `${imageUrl}original${popularMovies[0]['backdrop_path']}` }} />}
            </View>
            <Text className="p-2 mt-2 text-xl">Most popular Movies</Text>
            <ScrollView horizontal={true}>
                {popularMovies.map(movie => (<Movie key={movie.id} movie={movie} />))}
            </ScrollView>
            <Text className="p-2 mt-2 text-xl">Most popular TV Shows</Text>
            <ScrollView horizontal={true}>
                {popularTV.map(tv => (<TV key={tv.id} series={tv} />))}
            </ScrollView>
        </View>
    )
}

export default Popular;