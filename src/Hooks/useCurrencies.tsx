import axios from "axios";
import { useEffect, useState } from "react";
import { ICurrenciesData, ICurrency } from "../Types/Types";

export interface ICurrenciesProvider {
    readonly currenciesData: ICurrenciesData;
    readonly isLoading: boolean;
    readonly getCurrencies: (baseCurrency: ICurrency) => Promise<void>;
}

export default function useCurrencies(baseCurrency: ICurrency) {

    const [currenciesData, setCurrenciesData] = useState<ICurrenciesData>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const getCurrencies = async (baseCurrency) => {
        console.log(baseCurrency);
        const options = {
            "method": "GET",
            "url": `https://api.fxratesapi.com/latest?base=${baseCurrency.title}&currencies=EUR,GBP,JPY,USD&resolution=1m&amount=1&places=6&format=json`,
        };

        axios.request(options).then(function (response) {
            setCurrenciesData(response.data);
        }).catch(function (error) {
            console.error(error);
        });
    }

    useEffect(() => {
        (async () => {
            await getCurrencies(baseCurrency);
        })()
    }, [])

    return {
        currenciesData: currenciesData,
        isLoading,
        getCurrencies,
    } as ICurrenciesProvider;
}