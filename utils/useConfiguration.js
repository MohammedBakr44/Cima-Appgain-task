import React, { useState, useEffect } from 'react';
import { API_KEY } from "@env";
const useConfiguration = () => {
    const [images, setImages] = useState([]);
    const [imageUrl, setImageUrl] = useState('');
    const getConfiguration = async () => {
        const res = await fetch(`https://api.themoviedb.org/3/configuration?api_key=${API_KEY}`)
        const data = await res.json();
        return data.images;
    }
    useEffect(() => {
        let ignore = false;
        if (!ignore) {
            getConfiguration().then(img => {
                setImages(img['poster_sizes']);
                setImageUrl(img['base_url']);
            })
        }
        return () => ignore = true;
    }, []);


    return [imageUrl, images];
}

export default useConfiguration;