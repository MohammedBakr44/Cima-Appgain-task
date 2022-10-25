import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, Image } from 'react-native';
import useConfiguration from '../hooks/useConfiguration';
import { API_KEY } from '@env';
const Movie = ({ movie }) => {
    const [imageUrl, images] = useConfiguration();
    return (
        <View className="bg-movie h-80 w-44 m-5 p-2 rounded">
            <View>
                <Image style={{ height: 200, width: '100%', aspectRatio: .8 }} resizeMode="cover" className="rounded" source={{ uri: `${imageUrl}${images[2]}${movie['poster_path']}` }} />
                <Text className="text-white p-2">{movie['title']}</Text>
                <Text className="text-white p-2">{movie['release_date']}</Text>
            </View>
        </View>
    )
}

export default Movie;