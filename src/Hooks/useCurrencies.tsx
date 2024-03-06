import axios from "axios";
import { useEffect, useState } from "react";
import { ICurrenciesData, ICurrency } from "../Types/Types";
import { currenciesAtom, currentFromCurrencyAtom, currentToCurrencyAtom } from "../Services/RecoilStorage";
import { useRecoilState } from "recoil";
import { Flags, Descriptions, Symbols } from "../Services/Dictionary";
import { Alert } from "react-native";

export interface ICurrenciesProvider {
    readonly currencies: ICurrency[];
    readonly currentFromCurrency: ICurrency;
    readonly currentToCurrency: ICurrency;
    readonly isLoading: boolean;
    readonly updateCurrencies: (baseCurrency: ICurrency) => Promise<void>;
    readonly setCurrentFromCurrency: (currentFromCurrency: ICurrency) => void;
    readonly setCurrentToCurrency: (currentToCurrency: ICurrency) => void;
}

export default function useCurrencies() {

    const [currenciesData, setCurrenciesData] = useState<ICurrenciesData>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [currentFromCurrency, setCurrentFromCurrency] = useRecoilState<ICurrency>(currentFromCurrencyAtom);
    const [currentToCurrency, setCurrentToCurrency] = useRecoilState<ICurrency>(currentToCurrencyAtom);
    const [currencies, setCurrencies] = useRecoilState<ICurrency[]>(currenciesAtom);

    const updateCurrencies = async (baseCurrency: ICurrency) => {
        const options = {
            "method": "GET",
            "url": `https://api.fxratesapi.com/latest?base=${baseCurrency.title}&currencies=EUR,GBP,JPY,USD&resolution=1m&amount=1&places=6&format=json`,
        };

        axios.request(options).then(function (response) {
            setCurrenciesData(response.data);
            console.log(response.data);
        }).catch((error) => {
            console.error(error);
            Alert.alert(error.message);
        });
    }

    useEffect(() => {
        if (currenciesData) {
            setCurrencies([])
            Object.keys(currenciesData.rates).map((item, index) => {
                setCurrencies(prevState => [...prevState, {
                    flag: Flags(item),
                    title: item,
                    rate: Object.values(currenciesData.rates)[index],
                    description: Descriptions(item),
                    symbol: Symbols(item)
                }])
            })
        }
    }, [currenciesData])

    return {
        currencies,
        currentFromCurrency,
        currentToCurrency,
        isLoading,
        updateCurrencies,
        setCurrentFromCurrency,
        setCurrentToCurrency
    } as ICurrenciesProvider;
}