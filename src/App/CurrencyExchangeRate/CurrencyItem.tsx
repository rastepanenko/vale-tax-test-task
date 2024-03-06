import { Image, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";
import { ICurrency } from "../../Types/Types";
import { useEffect, useState } from "react";
import useCurrencies from "../../Hooks/useCurrencies";

interface ICurrencyItemProps {
    readonly currency: ICurrency;
    readonly isSetFirst: boolean;
}

export default function CurrencyItem(props: ICurrencyItemProps) {
    const [isChecked, setIsChecked] = useState(false);
    const {
        currencies,
        currentFromCurrency,
        currentToCurrency,
        updateCurrencies,
        setCurrentFromCurrency,
        setCurrentToCurrency,
        isLoading,
    } = useCurrencies();

    useEffect(() => {
        if (props.isSetFirst) {
            if (currentFromCurrency.title == props.currency.title) {
                setIsChecked(true);
            } else {
                setIsChecked(false);
            }
        } else {
            if (currentToCurrency && currentToCurrency.title == props.currency.title) {
                setIsChecked(true);
            } else {
                setIsChecked(false);
            }
        }
    }, [currentFromCurrency, currentToCurrency])

    function onPress() {
        if (props.isSetFirst) {
            setCurrentFromCurrency(props.currency)
        } else {
            setCurrentToCurrency(props.currency)
        }
    }

    return (
        <TouchableOpacity
            style={[styles.container, { backgroundColor: isChecked ? '#DEDEDE' : "transparent", }]}
            onPress={onPress} 
        >
            <Image source={props.currency.flag} style={styles.flagImage} />
            <Text style={styles.titleText}>
                {props.currency.title}
            </Text>
            <Text style={{ fontSize: 18 }}>
                {`-  ${props.currency.description}`}
            </Text>
            <View style={styles.radioButton}>
                {!isChecked
                    ? <IconButton icon={"radiobox-blank"} style={{ width: 25, marginRight: 0 }} />
                    : <IconButton icon={"radiobox-marked"} style={{ width: 25, marginRight: 0 }} />
                }
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        marginVertical: 3,
        height: 40,
        alignItems: 'center',
        paddingHorizontal: 5,
        borderRadius: 8,
    },
    flagImage: {
        width: 35,
        height: 25,
        borderWidth: 0.5,
        borderColor: 'black',
        borderRadius: 4,
    },
    radioButton: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        position: 'absolute',
        width: '100%',
    },
    titleText: {
        marginLeft: 10,
        width: 43,
        fontSize: 18
    }
});