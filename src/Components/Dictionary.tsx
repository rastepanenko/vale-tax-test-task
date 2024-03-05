export const Flags = (key) => {
    switch (key) {
        case 'USD':
            return require(`../../assets/flags/USD.png`)
        case "AUD":
            return require(`../../assets/flags/AUD.png`);
        case 'CAD':
            return require(`../../assets/flags/CAD.png`);
        case "CHF":
            return require(`../../assets/flags/CHF.png`);
        case "CNY":
            return require(`../../assets/flags/CNY.png`);
        case "EUR":
            return require(`../../assets/flags/EUR.png`);
        case "GBP":
            return require(`../../assets/flags/GBP.png`);
        case "HKD":
            return require(`../../assets/flags/HKD.png`);
        case "JPY":
            return require(`../../assets/flags/JPY.png`);
        case "PLN":
            return require(`../../assets/flags/PLN.png`);
        case "SEK":
            return require(`../../assets/flags/SEK.png`);
        case "SGD":
            return require(`../../assets/flags/SGD.png`);
    }
}

export const Descriptions = (key) => {
    switch (key) {
        case 'USD':
            return 'US Dollar'
        case "AUD":
            return "Australian dollar";
        case 'CAD':
            return "Canadian dollar";
        case "CHF":
            return "Swiss franc";
        case "CNY":
            return "Chinese Yuan";
        case "EUR":
            return "Euro";
        case "GBP":
            return "British Pound Sterling";
        case "HKD":
            return "Hong Kong dollar";
        case "JPY":
            return "Japanese Yen";
        case "PLN":
            return "Polish Zloty";
        case "SEK":
            return "Swedish krona";
        case "SGD":
            return "Singapore dollar";
    }
}

export const Symbols = (key) => {
    switch (key) {
        case 'USD':
            return '$'
        case "AUD":
            return "$";
        case 'CAD':
            return "$";
        case "CHF":
            return "₣";
        case "CNY":
            return "¥";
        case "EUR":
            return "€";
        case "GBP":
            return "£";
        case "HKD":
            return "$";
        case "JPY":
            return "¥";
        case "PLN":
            return "zł";
        case "SEK":
            return "kr";
        case "SGD":
            return "S$";
    }
}