import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, Image } from 'react-native';
import useConfiguration from '../utils/useConfiguration';
import { API_KEY } from '@env';
const TV = ({ series }) => {
    const [imageUrl, images] = useConfiguration();
    return (
        <View className="bg-movie h-80 w-44 m-5 p-2 rounded">
            <View>
                <Image style={{ height: 200, width: '100%', aspectRatio: .8 }} resizeMode="cover" className="rounded" source={{ uri: `${imageUrl}${images[2]}${series['poster_path']}` }} />
                <Text className="text-white p-2">{series['name']}</Text>
                <Text className="text-white p-2">{series['first_air_date']}</Text>
            </View>
        </View>
    )
}

export default TV;