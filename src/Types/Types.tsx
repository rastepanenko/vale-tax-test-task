import { ImageSourcePropType } from "react-native";

export interface ICurrency {
    readonly flag: ImageSourcePropType;
    readonly title: string;
    readonly rate: number;
    readonly description: string;
    readonly symbol: string;
}

export interface ICurrenciesData {
    base: string;
    date: Date; 
    privacy: string;
    rates: {
        rate: number,
    };
    success: boolean;
    terms: string;
    timestamp: number;
}