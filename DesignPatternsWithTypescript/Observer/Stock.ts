module observer {
    export class Stock {
        private name: string;
        private peopleWhoOwnThisStock: any[];
        private price: number;

        constructor(name: string) {
            this.name = name;
            this.peopleWhoOwnThisStock = [];
        }

        subscribe = (callback: {}): void => {
            this.peopleWhoOwnThisStock.push(callback);
        }

        unsubscribe = (name: string): void => {
            var index = this.peopleWhoOwnThisStock.indexOf(name);
            this.peopleWhoOwnThisStock.splice(index);
        }

        setPrice = (price: number): void => {
            this.price = price;
            for (var i = 0; i < this.peopleWhoOwnThisStock.length; i++) {
                this.peopleWhoOwnThisStock[i].onPriceChange(price);
            }
        }

        getPrice = (): number => {
            return this.price;
        }

        get Name(): string {
            return this.name;
        }

        set Name(value: string) {
            this.name = value;
        }

    }
}