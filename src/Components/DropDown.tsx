import { Image } from 'react-native';

export default function DropDown() {
    return (
        <Image source={require('../../assets/down-arrow.png')} style={{ width: 18, height: 18, alignSelf: 'flex-end' }}/>
    )
}