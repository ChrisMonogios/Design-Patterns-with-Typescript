module observer {
    export class Customer {
        private name: string;
        private ownedStocks: [Stock];

        constructor(name: string) {
            this.name = name;
        }

        onPriceChange = (callback: IOnPriceChangeCallback, sell: boolean): void => {
            callback(sell);
        }

        buyStock = (stock: Stock): void => {
            this.ownedStocks.push(stock);
        }
    }
}