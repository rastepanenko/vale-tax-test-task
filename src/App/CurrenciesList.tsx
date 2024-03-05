import { RouteProp, useRoute } from "@react-navigation/native";
import { FlatList, StyleSheet, Text, View, Image } from "react-native";
import { ICurrency } from "../Types/Types";
import { TextInput } from "react-native-paper";
import Item from "./Item";
import { useEffect, useState } from "react";

interface IProps {
    currenciesList: ICurrency[];
    isSetFirst: boolean;
    isSetSecond: boolean;
}

export default function CurrenciesList() {
    const route: RouteProp<{params: IProps}, 'params'> = useRoute();
    const [searchValue, setSearchValue] = useState('')
    const [currenciesList, setCurrenciesList] = useState([]);

    useEffect(() => {
        setCurrenciesList(route.params.currenciesList.filter((item) => item.description.toLowerCase().includes(searchValue.toLowerCase()) || item.title.toLowerCase().includes(searchValue.toLowerCase())))
    }, [searchValue])
    
    return (
        <View style={styles.container}>
            <View style={{ width: '100%', marginTop: 25 }}>
                <TextInput
                    style={styles.valueInput}
                    left={<TextInput.Icon icon={'magnify'} />}
                    underlineStyle={{display: 'none'}}
                    onChangeText={(txt) => setSearchValue(txt)}
                />
            </View>
            <FlatList 
                style={styles.list}
                data={currenciesList}
                renderItem={(item) => {
                  return (
                    <Item currency={item.item} isSetFirst={route.params.isSetFirst} isSetSecond={route.params.isSetSecond} />
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
    }
});