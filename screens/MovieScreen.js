import { Text, View } from 'react-native';
import MovieDetails from '../components/MovieDetails';

const MovieScreen = ({ route }) => {
    const { name, id } = route.params;
    return (
        <View>
            <MovieDetails id={JSON.stringify(id)} />
        </View>
    )
}

export default MovieScreen;