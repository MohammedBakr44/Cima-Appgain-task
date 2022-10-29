import { View, Text, Image, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import useConfiguration from '../hooks/useConfiguration';
import { API_KEY } from "@env";
const MovieDetails = ({ id }) => {
    const [movie, setMovie] = useState({});
    const [imageUrl, images] = useConfiguration();
    const [genresState, setGenresState] = useState([]);
    const [cast, setCast] = useState([]);
    const getMovie = async () => {
        try {
            const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`);
            const data = await res.json();
            return await data;
        } catch (err) { console.log(err) };
    }

    const getCast = async () => {
        try {
            const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`);
            const data = await res.json();
            return await data.cast;
        } catch (err) { console.log(err) }
    }

    useEffect(() => {
        let ignoreRequest = false;
        // ignoreRequest is used to prevent the effect from being run twice, the cleanup changes ignoreRequest to true which leads to ignoring the code block
        if (!ignoreRequest && id) {
            getMovie().then(data => {
                setMovie(data);
                setGenresState([]);
                data.genres.forEach((item) => setGenresState(genres => [...genres, item.name]));
            });

            getCast().then(data => {
                setCast(data);
            });
        }
        return () => ignoreRequest = true;

    }, [id]);
    console.log(movie);
    return (
        id &&
        <View>
            <View>
                <Image source={{
                    uri: `${imageUrl}original${movie['backdrop_path']}`
                }} className="w-screen h-52" />
                {/*  */}
                <View className="absolute z-10 flex p-2 flex-col flex-wrap justify-end w-full h-full">
                    <Text className="text-white mx-1 text-xl font-bold w-3/4">{movie.title}</Text>
                    <Text className="text-white mx-1 basis-1/7">{genresState.join(', ')} - {movie.runtime}min</Text>
                    <Text className="text-white mb-2 mx-1">Language: {movie['original_language']}</Text>
                </View>
                <View className="flex-1 absolute bg-black opacity-50 h-full w-full">
                </View>
            </View>
            <View className="p-2 mt-1 flex flex-row flex-wrap">
                <Text className="text-l font-bold basis-full mb-1">Synopsis</Text>
                <Text className="text-[#434343] w-3/4">{movie.overview}</Text>
                <Text ClassName="">{movie['release_date']}</Text>
            </View>
            <ScrollView horizontal={true}>
                <View className="p-2 mt-1">
                    <Text className="text-l font-bold mb-2">Cast</Text>
                    <View className="flex flex-row">
                        {cast && cast.map((actor, i) => (i < 6 && <View className="mx-4 w-20" key={actor.id}>
                            <Image source={{
                                uri: `${imageUrl}${images[0]}${actor['profile_path']}`
                            }} className="h-20 w-20 rounded-lg" />
                            <Text className="font-bold">{actor.character}</Text>
                            <Text>{actor.name}</Text>
                        </View>))}
                    </View>
                </View>
            </ScrollView>
            <Text>{id}</Text>
        </View>
    )
}

export default MovieDetails;