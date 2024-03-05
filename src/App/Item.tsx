import { Image, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";
import { ICurrency } from "../Types/Types";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { currentFirstCurrencyAtom, currentSecondCurrencyAtom } from "../Services/RecoilService";

interface IItemProps {
    readonly currency: ICurrency;
    readonly isSetFirst: boolean;
    readonly isSetSecond: boolean;
}

export default function Item(props: IItemProps) {
    const [isChecked, setIsChecked] = useState(false);
    const [currentFirstCurrency, setCurrentFirstCurrency] = useRecoilState<ICurrency>(currentFirstCurrencyAtom);
    const [currentSecondCurrency, setCurrentSecondCurrency] = useRecoilState<ICurrency>(currentSecondCurrencyAtom);

    useEffect(() => {
        if(props.isSetFirst) {
            if(currentFirstCurrency.title == props.currency.title) {
                setIsChecked(true);
            }
            else {
                setIsChecked(false);
            }
        }
        else {
            if(currentSecondCurrency && currentSecondCurrency.title == props.currency.title) {
                setIsChecked(true);
            }
            else {
                setIsChecked(false);
            }
        }
    }, [currentFirstCurrency, currentSecondCurrency])

    function onPress() {
        if(props.isSetFirst) {
            setCurrentFirstCurrency(props.currency)
        }
        else {
            setCurrentSecondCurrency(props.currency)
        }
    }
    
    return (
        <TouchableOpacity 
            style={[styles.container, { backgroundColor: isChecked ? '#DEDEDE' : "transparent" , }]} 
            onPress={onPress} >
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