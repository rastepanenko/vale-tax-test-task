import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Main() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.helloText}>Hello!</Text>
            <TouchableOpacity 
                style={styles.startButton} 
                onPress={() => 
                    //@ts-ignore
                    navigation.navigate('CurrencySelectorScreen')}
            >
                <Text>
                    Convert currency
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    helloText: {
      fontSize: 22,
      fontWeight: '500',
    },
    startButton: {
      width: '80%',
      marginTop: 10,
      alignItems: 'center',
      justifyContent: 'center',
      
      height: 45,
      borderRadius: 16,
      backgroundColor: '#3AB61E',
      borderWidth: 1,
      borderColor: 'black',
    }
  });