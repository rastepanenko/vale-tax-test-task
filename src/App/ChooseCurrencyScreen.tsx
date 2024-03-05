import { View, StyleSheet, Text, TouchableOpacity, Image, TextInput } from "react-native";
import DropDown from "../Components/DropDown";
import { useEffect, useState } from "react";
import { ICurrency } from "../Types/Types";
import useCurrencies from "../Hooks/useCurrencies";
import { Descriptions, Flags, Symbols } from "../Components/Dictionary";
import { useNavigation } from "@react-navigation/native";
import { useRecoilState } from "recoil";
import { currentFirstCurrencyAtom, currentSecondCurrencyAtom } from "../Services/RecoilService";

export default function ChooseCurrencyScreen() {

    const [currentFirstCurrency, setCurrentFirstCurrency] = useRecoilState<ICurrency>(currentFirstCurrencyAtom);
    const [currentSecondCurrency, setCurrentSecondCurrency] = useRecoilState<ICurrency>(currentSecondCurrencyAtom);
    const [currenciesList, setCurrenciesList] = useState<ICurrency[]>([]);
    const [exchangeAmount, setExchangeAmount] = useState(1);
    const {
        currenciesData,
        getCurrencies,
        isLoading,
    } = useCurrencies(currentFirstCurrency);
    const navigation = useNavigation()

    useEffect(() => {
        if (currenciesData) {
            setCurrenciesList([])
            Object.keys(currenciesData.rates).map((item, index) => {
                setCurrenciesList(prevState => [...prevState, {
                    flag: Flags(item),
                    title: item,
                    rate: Object.values(currenciesData.rates)[index],
                    description: Descriptions(item),
                    symbol: Symbols(item)
                }])
            })
        }
    }, [currenciesData])

    useEffect(() => {
        (async () => {
            await getCurrencies(currentFirstCurrency);
        })()
    }, [currentFirstCurrency])

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', }}>
                <View style={styles.rowElement}>
                    <Text>
                        From:
                    </Text>
                    <TouchableOpacity
                        style={styles.currencyContainer}
                        onPress={() =>
                            //@ts-ignore
                            navigation.navigate('CurrenciesList', { currenciesList: currenciesList, isSetFirst: true, isSetSecond: false })
                        }
                    >
                        <Image source={currentFirstCurrency.flag} style={{ width: 25, height: 20 }} />
                        <Text>
                            {currentFirstCurrency.title}
                        </Text>
                        <DropDown />
                    </TouchableOpacity>
                </View>
                <View style={styles.swapButton}>
                    <TouchableOpacity 
                        onPress={() => {
                            if(currentSecondCurrency) {
                                setCurrentFirstCurrency(currentSecondCurrency);
                                setCurrentSecondCurrency(currentFirstCurrency);
                            }
                        }}
                    >
                    <Image source={require('../../assets/exchange.png')} style={{ width: 20, height: 20 }} />
                    </TouchableOpacity>
                </View>
                <View style={styles.rowElement}>
                    <Text>
                        To:
                    </Text>
                    <TouchableOpacity
                        style={styles.currencyContainer}
                        onPress={() =>
                            //@ts-ignore
                            navigation.navigate('CurrenciesList', { currenciesList: currenciesList, isSetSecond: true, isSetFirst: false })
                        }
                    >
                        {currentSecondCurrency
                            ? <Image source={currentSecondCurrency.flag} style={{ width: 25, height: 20 }} />
                            : <View style={{ backgroundColor: 'transparent', width: 20, }} />
                        }
                        {currentSecondCurrency
                            ? <Text>
                                {currentSecondCurrency.title}
                            </Text>
                            : null
                        }
                        <DropDown />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ width: '100%', marginTop: 25 }}>
                <Text style={{ alignSelf: 'flex-start' }}>
                    Amount:
                </Text>
                <TextInput
                    style={styles.valueInput}
                    defaultValue="1"
                    onChangeText={(text) => setExchangeAmount(Number(text))}
                />
            </View>
            <View style={{ width: '100%', alignItems: 'flex-start', marginTop: 30, }}>
                <Text style={{ fontSize: 16 }}>
                    {`${exchangeAmount}${currentFirstCurrency.symbol} =`}
                </Text>
                {currentSecondCurrency
                    ? <Text style={{ fontSize: 42 }}>
                        {`${(exchangeAmount * currentSecondCurrency.rate).toFixed(4)} ${currentSecondCurrency.symbol}`}
                    </Text>
                    : null
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 25
    },
    currencyContainer: {
        width: 140,
        height: 44,
        backgroundColor: '#DEDEDE',
        borderRadius: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 12,
        marginTop: 5,
        flexDirection: 'row',
    },
    rowElement: {
        width: '40%',
        height: 80,
        flexDirection: 'column',
        justifyContent: 'flex-end'
    },
    valueInput: {
        width: '100%',
        borderWidth: 1,
        borderColor: 'black',
        marginTop: 10,
        height: 43,
        borderRadius: 10,
        paddingHorizontal: 10,
    },
    swapButton: {
        width: '20%', 
        height: 80, 
        flexDirection: 'column', 
        justifyContent: 'flex-end', 
        alignItems: 'center', 
        paddingBottom: 11
    }
});