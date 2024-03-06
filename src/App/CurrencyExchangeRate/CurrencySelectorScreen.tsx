import { View, StyleSheet, Text, TouchableOpacity, Image, TextInput } from "react-native";
import DropDown from "../../Components/DropDown";
import { useEffect, useState } from "react";
import useCurrencies from "../../Hooks/useCurrencies";
import { useNavigation } from "@react-navigation/native";

export default function CurrencySelectorScreen() {
    const [exchangeAmount, setExchangeAmount] = useState(1);
    const {
        currencies,
        currentFromCurrency,
        currentToCurrency,
        updateCurrencies,
        setCurrentFromCurrency,
        setCurrentToCurrency,
        isLoading,
    } = useCurrencies();
    const navigation = useNavigation()

    useEffect(() => {
        (async () => {
            await updateCurrencies(currentFromCurrency);
        })()
    }, [currentFromCurrency])

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
                            navigation.navigate('Currencies', { currencies: currencies, isSetFirst: true, })
                        }
                    >
                        <Image source={currentFromCurrency.flag} style={{ width: 25, height: 20 }} />
                        <Text>
                            {currentFromCurrency.title}
                        </Text>
                        <DropDown />
                    </TouchableOpacity>
                </View>
                <View style={styles.swapButton}>
                    <TouchableOpacity
                        onPress={() => {
                            if (currentToCurrency) {
                                setCurrentFromCurrency(currentToCurrency);
                                setCurrentToCurrency(currentFromCurrency);
                            }
                        }}
                    >
                        <Image source={require('../../../assets/exchange.png')} style={{ width: 20, height: 20 }} />
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
                            navigation.navigate('Currencies', { currencies: currencies, isSetFirst: false })
                        }
                    >
                        {currentToCurrency
                            ? <Image source={currentToCurrency.flag} style={{ width: 25, height: 20 }} />
                            : <View style={{ backgroundColor: 'transparent', width: 20, }} />
                        }
                        {currentToCurrency
                            ? <Text>
                                {currentToCurrency.title}
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
                    {`${exchangeAmount}${currentFromCurrency.symbol} =`}
                </Text>
                {currentToCurrency
                    ? <Text style={{ fontSize: 42 }}>
                        {`${(exchangeAmount * currentToCurrency.rate).toFixed(4)} ${currentToCurrency.symbol}`}
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