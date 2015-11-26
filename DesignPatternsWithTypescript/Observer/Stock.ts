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
                this.peopleWhoOwnThisStock[i]();
            }
        }

        getPrice = (): number => {
            return this.price;
        }

    }
}