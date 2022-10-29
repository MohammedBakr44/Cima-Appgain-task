import { View, Text, Image, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { API_KEY } from "@env";
import useConfiguration from '../hooks/useConfiguration';
const TVDetails = ({ id }) => {
    const [tv, setTV] = useState({});
    const [imageUrl, images] = useConfiguration();
    const [genresState, setGenresState] = useState([]);
    const [cast, setCast] = useState([]);

    const getTV = async () => {
        try {
            const res = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=en-US`);
            const data = await res.json();
            return await data;
        } catch (err) { console.log(err) };
    }

    const getCast = async () => {
        try {
            const res = await fetch(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=${API_KEY}&language=en-US`);
            const data = await res.json();
            return await data.cast;
        } catch (err) { console.log(err) }
    }

    useEffect(() => {
        let ignoreRequest = false;
        // ignoreRequest is used to prevent the effect from being run twice, the cleanup changes ignoreRequest to true which leads to ignoring the code block
        if (!ignoreRequest && id) {
            getTV().then(data => {
                setTV(data);
                setGenresState([]);
                data.genres.forEach((item) => setGenresState(genres => [...genres, item.name]));
            });
            getCast().then(data => {
                setCast(data);
            })
        }
        return () => ignoreRequest = true;

    }, [id]);
    console.log(tv);
    return (
        <View>
            <View>
                <Image source={{
                    uri: `${imageUrl}original${tv['backdrop_path']}`
                }} className="w-screen h-52" />
                {/*  */}
                <View className="absolute z-10 flex p-2 flex-col flex-wrap justify-end w-full h-full">
                    <Text className="text-white mx-1 text-xl font-bold w-3/4">{tv.name}</Text>
                    <Text className="text-white mx-1 basis-1/7">{genresState.join(', ')} - {tv['episode_run_time']}min</Text>
                    <Text className="text-white mb-2 mx-1">Language: {tv['original_language']}</Text>
                </View>
                <View className="flex-1 absolute bg-black opacity-50 h-full w-full">
                </View>
            </View>
            <View className="p-2 mt-1 flex flex-row flex-wrap">
                <Text className="text-l font-bold basis-full mb-1">Synopsis</Text>
                <Text className="text-[#434343] w-3/4">{tv.overview}</Text>
                <Text ClassName="">{tv['first_air_date']}</Text>
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
                        </View>)
                        )}
                    </View>
                </View>
            </ScrollView>
            <Text>{id}</Text>
        </View>
    )
}

export default TVDetails;