export interface ICurrency {
    readonly flag: any;
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