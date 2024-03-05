import { atom } from "recoil";
import { ICurrency } from "../Types/Types";
import { Descriptions, Flags, Symbols } from "../Components/Dictionary";

export const currentSecondCurrencyAtom = atom<ICurrency>({
    key: 'currentSecondCurrencyAtom',
    default: null,
    dangerouslyAllowMutability: false,
});

export const currentFirstCurrencyAtom = atom<ICurrency>({
    key: 'currentFirstCurrencyAtom',
    default: {
        flag: Flags('USD'),
        title: 'USD',
        rate: 0,
        description: Descriptions('USD'),
        symbol: Symbols('USD'),
    },
    dangerouslyAllowMutability: false,
});