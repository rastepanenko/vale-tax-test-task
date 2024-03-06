import { RouteProp, useRoute } from "@react-navigation/native";
import { FlatList, StyleSheet, View } from "react-native";
import { ICurrency } from "../../Types/Types";
import { TextInput } from "react-native-paper";
import { useEffect, useState } from "react";
import CurrencyItem from "./CurrencyItem";

interface ICurrenciesProps {
    currencies: ICurrency[];
    isSetFirst: boolean;
    isSetSecond: boolean;
}

export default function Currencies() {
    const route: RouteProp<{ params: ICurrenciesProps }, 'params'> = useRoute();
    const [searchValue, setSearchValue] = useState('')
    const [currenciesList, setCurrenciesList] = useState([]);

    useEffect(() => {
        setCurrenciesList(route.params.currencies.filter((item) => 
            item.description.toLowerCase().includes(searchValue.toLowerCase()) 
            || item.title.toLowerCase().includes(searchValue.toLowerCase())
        ))
    }, [searchValue, route])

    return (
        <View style={styles.container}>
            <View style={styles.textInput}>
                <TextInput
                    style={styles.valueInput}
                    left={<TextInput.Icon icon={'magnify'} />}
                    underlineStyle={{ display: 'none' }}
                    onChangeText={(txt) => setSearchValue(txt)}
                />
            </View>
            <FlatList
                style={styles.list}
                data={currenciesList}
                renderItem={(item) => {
                    return (
                        <CurrencyItem currency={item.item} isSetFirst={route.params.isSetFirst} />
                    )
                }}
                keyExtractor={(item) => item.title}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F4F4',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 25,
        width: '100%'
    },
    valueInput: {
        width: '100%',
        borderWidth: 1,
        borderColor: 'black',
        marginTop: 10,
        backgroundColor: 'white',
        height: 43,
        borderRadius: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        paddingHorizontal: 10,
    },
    list: {
        marginTop: 20,
        width: '100%',
        backgroundColor: '#E7E7E7',
        borderRadius: 8,
    },
    textInput: {
        width: '100%',
        marginTop: 25
    }
});