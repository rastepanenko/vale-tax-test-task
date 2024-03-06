import { atom } from "recoil";
import { ICurrency } from "../Types/Types";
import { Descriptions, Flags, Symbols } from "./Dictionary";

export const currentToCurrencyAtom = atom<ICurrency>({
    key: 'currentToCurrencyAtom',
    default: null,
    dangerouslyAllowMutability: false,
});

export const currentFromCurrencyAtom = atom<ICurrency>({
    key: 'currentFromCurrencyAtom',
    default: {
        flag: Flags('USD'),
        title: 'USD',
        rate: 0,
        description: Descriptions('USD'),
        symbol: Symbols('USD'),
    },
    dangerouslyAllowMutability: false,
});

export const currenciesAtom = atom<ICurrency[]>({
    key: 'currenciesAtom',
    default: [],
    dangerouslyAllowMutability: false,
});