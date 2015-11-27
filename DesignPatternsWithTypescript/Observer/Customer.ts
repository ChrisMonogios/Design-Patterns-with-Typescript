module observer {
    export class Customer {
        private name: string;
        private ownedStocks: [[Stock, number]];

        constructor(name: string) {
            this.name = name;
        }

        onPriceChange = (price: number): void => {
            for (var i = 0; i < this.ownedStocks.length; i++) {
                if (price > this.ownedStocks[i][1]) {
                    console.log(this.name + " sold his " + this.ownedStocks[i][0].Name + " stocks!");
                }
            }
        }

        buyStock = (stock: Stock, whenToSell: number): void => {
            if (typeof this.ownedStocks === "undefined") {
                this.ownedStocks = [[stock, whenToSell]];
            } else {
                this.ownedStocks.push([stock, whenToSell]);
            }
        }
    }
}