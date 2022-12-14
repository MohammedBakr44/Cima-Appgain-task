import { Text, View } from 'react-native';
import TVDetails from '../components/TVDetails';

const TVScreen = ({ route }) => {
    const { id } = route.params;
    return (
        <View>
            <TVDetails id={JSON.stringify(id)} />
        </View>
    )
}

export default TVScreen;