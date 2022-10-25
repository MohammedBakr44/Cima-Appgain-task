import { View, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import { API_KEY } from "@env";
const TVDetails = ({ id }) => {
    const [tv, setTV] = useState({});
    const getTV = async () => {
        try {
            const res = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=en-US`);
            const data = await res.json();
            return await data;
        } catch (err) { console.log(err) };
    }

    useEffect(() => {
        let ignoreRequest = false;
        // ignoreRequest is used to prevent the effect from being run twice, the cleanup changes ignoreRequest to true which leads to ignoring the code block
        if (!ignoreRequest) {
            getTV().then(data => setTV(data));
        }
        return () => ignoreRequest = true;

    }, []);
    console.log(tv);
    return (
        <View>
            <Text>Show: {tv.name}</Text>
        </View>
    )
}

export default TVDetails;